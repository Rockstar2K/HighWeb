import { useRef, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShapeGridBackground } from '@/components/decorations/shapeGridBackground';

const SERVICE_LABELS: Record<string, string> = {
  branding: 'Branding',
  web: 'Sitios Web',
  redes: 'Redes Sociales',
  animaciones: 'Animaciones',
};

const EASE_HERO = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Recibimos tu consulta',
    done: true,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    label: 'Analizamos tu proyecto en detalle',
    done: false,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    label: 'Te enviamos una propuesta personalizada',
    done: false,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    label: '¡Arrancamos y creamos algo increíble!',
    done: false,
  },
];

function FloatingOrb({
  size,
  color,
  x,
  y,
  delay,
}: {
  size: number;
  color: string;
  x: string;
  y: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: color,
        filter: 'blur(60px)',
      }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.15, 0.3, 0.15],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function GraciasPage() {
  const [searchParams] = useSearchParams();
  const nombre = searchParams.get('nombre') || '';
  const serviciosParam = searchParams.get('servicios') || '';
  const servicios = serviciosParam ? serviciosParam.split(',').filter(Boolean) : [];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frame: number | null = null;
    const update = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const h = rect.height || 1;
      setScrollProgress(Math.min(Math.max(-rect.top, 0), h) / h);
    };
    const onScroll = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const headline = nombre ? `¡Lo tenemos, ${nombre}!` : '¡Lo tenemos!';

  const serviceText =
    servicios.length > 0
      ? servicios
          .map((s) => SERVICE_LABELS[s.trim()] || s.trim())
          .join(' y ')
      : null;

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black mt-[10vh]"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0015] via-black to-[#000a1a]" />
      <ShapeGridBackground scrollProgress={scrollProgress} className="opacity-15" />

      {/* Floating ambient orbs */}
      <FloatingOrb size={500} color="rgba(119,65,234,0.4)" x="60%" y="-10%" delay={0} />
      <FloatingOrb size={350} color="rgba(53,240,153,0.3)" x="-5%" y="50%" delay={2} />
      <FloatingOrb size={280} color="rgba(119,65,234,0.25)" x="80%" y="70%" delay={4} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-24 w-full max-w-2xl mx-auto">

        {/* Animated check circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.1 }}
          className="relative mb-10"
        >
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: 'rgba(53,240,153,0.2)', boxShadow: '0 0 0 0 rgba(53,240,153,0.4)' }}
            animate={{ boxShadow: ['0 0 0 0 rgba(53,240,153,0.4)', '0 0 0 24px rgba(53,240,153,0)'] }}
            transition={{ duration: 1.8, delay: 0.8, repeat: Infinity }}
          />
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #35F099, #7741EA)',
              boxShadow: '0 0 60px rgba(53,240,153,0.35), 0 0 120px rgba(119,65,234,0.2)',
            }}
          >
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.35, duration: 0.9, ease: EASE_HERO }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4"
        >
          {headline}
        </motion.h1>

        {/* Service tags */}
        {servicios.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: EASE_HERO }}
            className="flex flex-wrap gap-2 justify-center mb-6"
          >
            {servicios.map((s) => (
              <span
                key={s}
                className="px-4 py-1.5 rounded-full text-sm font-semibold"
                style={{
                  background: 'rgba(119,65,234,0.18)',
                  border: '1px solid rgba(119,65,234,0.5)',
                  color: '#b794f4',
                }}
              >
                {SERVICE_LABELS[s.trim()] || s.trim()}
              </span>
            ))}
          </motion.div>
        )}

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.65, duration: 0.7, ease: EASE_HERO }}
          className="text-gray-400 text-lg sm:text-xl mb-2 max-w-md leading-relaxed"
        >
          {serviceText
            ? `Tu consulta sobre ${serviceText} ya está en nuestras manos.`
            : 'Tu consulta ya está en nuestras manos.'}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.6 }}
          className="text-gray-500 text-base mb-12 max-w-sm"
        >
          Te vamos a contactar pronto con una propuesta hecha a medida para vos.
        </motion.p>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="w-full max-w-md space-y-3 mb-14 text-left"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4 text-center"
            style={{ color: '#7741EA' }}
          >
            Qué pasa ahora
          </p>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.95 + i * 0.1, duration: 0.45, ease: EASE_HERO }}
              className="flex items-center gap-3 p-4 rounded-2xl transition-colors"
              style={{
                background: step.done
                  ? 'rgba(53,240,153,0.08)'
                  : 'rgba(255,255,255,0.04)',
                border: step.done
                  ? '1px solid rgba(53,240,153,0.3)'
                  : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: step.done
                    ? 'rgba(53,240,153,0.2)'
                    : 'rgba(119,65,234,0.15)',
                  color: step.done ? '#35F099' : '#9f75ff',
                }}
              >
                {step.done ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step.icon
                )}
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: step.done ? '#34d399' : '#9ca3af' }}
              >
                {step.label}
              </span>
              {step.done && (
                <span
                  className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(53,240,153,0.15)', color: '#35F099' }}
                >
                  Listo
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.38, duration: 0.6, ease: EASE_HERO }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            to="/"
            className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #7741EA, #5E48F2)',
              boxShadow: '0 8px 32px rgba(119,65,234,0.35)',
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Volver al inicio
          </Link>

          <a
            href="https://www.instagram.com/highdesign.cl"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#d1d5db',
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Ver nuestro trabajo
          </a>
        </motion.div>

        {/* Tiny note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-10 text-xs text-gray-600"
        >
          ¿Urgente? Escribinos directo a{' '}
          <a
            href="mailto:info@highdesign.cl"
            className="underline hover:text-gray-400 transition-colors"
          >
            info@highdesign.cl
          </a>
        </motion.p>
      </div>
    </div>
  );
}
