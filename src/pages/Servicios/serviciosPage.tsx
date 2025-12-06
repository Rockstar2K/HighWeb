import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, Check, Palette, Globe, Share2, Play, Layers, Zap, Monitor, Smartphone, Music, Heart } from 'lucide-react';
import { motion, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ShapeGridBackground } from "@/components/decorations/shapeGridBackground";
import CTASection from '@/components/ctaSection/ctaSection';
import { SocialMediaIllustration } from './illustrations/SocialMediaIllustration';
import { BrandingIllustration } from './illustrations/BrandingIllustration';
import { AnimationsIllustration } from './illustrations/AnimationsIllustration';
import { WebDevIllustration } from './illustrations/WebDevIllustration';

const FadeInOnScroll = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => { 
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const ServiceSection = ({ 
  title, 
  subtitle, 
  description, 
  features, 
  link, 
  icon: Icon, 
  color, 
  align = 'left',
  imageContent,
  imageContainerClassName,
  hoverColor
}: { 
  title: string, 
  subtitle: string, 
  description: string, 
  features: string[], 
  link: string, 
  icon: any, 
  color: string, 
  align?: 'left' | 'right',
  imageContent: React.ReactNode,
  imageContainerClassName?: string,
  hoverColor: string
}) => {
  return (
    <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${align === 'right' ? 'lg:grid-flow-dense' : ''}`}>
        
        {/* Text Content */}
        <div className={`text-left ${align === 'right' ? 'lg:col-start-2' : ''}`}>
          <FadeInOnScroll>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${color} text-white text-sm font-bold mb-8`}>
              <Icon size={16} className="text-white" />
              <span className="text-white">{title.toUpperCase()}</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#1a1a1a] mb-6">
              {subtitle}
            </h2>

            <p className="text-gray-600 text-lg md:text-xl mb-12 leading-relaxed">
              {description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                  <span className="text-gray-800 font-semibold text-base">{feature}</span>
                </div>
              ))}
            </div>

            <Link to={link}>
              <button className={`group flex items-center gap-3 font-bold text-lg ${color.replace('bg-', 'text-').replace('!', '')} hover:!text-white transition-all duration-300 !bg-white ${hoverColor} px-4 py-2 rounded-lg shadow-sm border-2 border-current border-solid`}>
                <span>Explorar servicio</span>
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </Link>
          </FadeInOnScroll>
        </div>

        {/* Visual Content */}
        <div className={`relative w-full ${imageContainerClassName || 'h-full min-h-[450px]'} ${align === 'right' ? 'lg:col-start-1' : ''}`}>
          <FadeInOnScroll delay={0.2}>
            {imageContent}
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
};





const ServiciosPage = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frame: number | null = null;

    const updateProgress = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const sectionHeight = rect.height || 1;
      const offset = Math.min(Math.max(-rect.top, 0), sectionHeight);
      setScrollProgress(offset / sectionHeight);
    };

    const handleScroll = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-x-hidden mt-[15vh]">

      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative w-screen pt-28 pb-40 overflow-hidden">
        <ShapeGridBackground
          scrollProgress={scrollProgress}
          style={{ aspectRatio: "9/6" }}
          className="opacity-80 left-1/2 -translate-x-1/2 w-[140vw] max-w-none"
        />
        <div className="absolute inset-0 bg-white/5 pointer-events-none z-0" />

        <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
          <FadeInOnScroll>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-5xl leading-tight">
              Todo lo que necesitas para <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-[#35F099] to-[#7741EA] bg-clip-text text-transparent">dominar tu mercado</span>
            </h1>
          </FadeInOnScroll>
          
          <FadeInOnScroll delay={0.2}>
            <p className="text-[#666] max-w-2xl mb-12 text-lg md:text-xl leading-relaxed">
              Un ecosistema completo de servicios de diseño de alto impacto. Desde la identidad de tu marca hasta su expresión digital, creamos soluciones que venden.
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-32">
              <button 
                onClick={() => {
                  const element = document.getElementById('servicios-list');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative overflow-hidden bg-[#7741EA]! hover:bg-[#35F099]! text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                <span className="relative z-10">Explorar Servicios</span>
              </button>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.6}>
            <div className="w-14 h-14 border border-[#e0e0e0] rounded-full flex items-center justify-center animate-bounce cursor-pointer text-[#999] hover:text-[#35F099] transition-colors bg-white/80 backdrop-blur-sm hover:shadow-md">
              <ArrowDown size={20} className="animate-pulse" />
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      <div id="servicios-list" className="flex flex-col gap-0">
        
        {/* --- BRANDING --- */}
        <ServiceSection 
          title="Branding"
          subtitle="Identidad que deja huella"
          description="No diseñamos solo 'logos bonitos'. Construimos sistemas de identidad visual estratégicos que comunican la esencia de tu negocio, diferencian tu oferta y aumentan el valor percibido de tu marca."
          features={['Estrategia de Marca', 'Diseño de Logotipo', 'Manual de Identidad', 'Papelería Corporativa']}
          link="/branding"
          icon={Palette}
          color="bg-[#7741EA]!"
          align="left"
          imageContent={<BrandingIllustration />}
          hoverColor="hover:!bg-[#7741EA]"
        />


        {/* --- SITIOS WEB --- */}
        <ServiceSection 
          title="Sitios Web"
          subtitle="Tu mejor vendedor, 24/7"
          description="Diseñamos experiencias digitales que convierten visitantes en clientes. Sitios web ultrarrápidos, optimizados para SEO y con un diseño que refleja la calidad premium de tu negocio."
          features={['Diseño UI/UX', 'Desarrollo a Medida', 'E-commerce', 'Optimización SEO']}
          link="/sitios-web"
          icon={Globe}
          color="bg-blue-500"
          align="right"
          imageContent={<WebDevIllustration />}
          hoverColor="hover:!bg-blue-500"
        />

        {/* --- REDES SOCIALES --- */}
        <ServiceSection 
          title="Redes Sociales"
          subtitle="Domina la conversación"
          description="Deja de publicar por publicar. Creamos estrategias de contenido visualmente impactantes que detienen el scroll, generan comunidad y fidelizan a tu audiencia."
          features={['Gestión de Redes', 'Creación de Contenido', 'Diseño de Feed', 'Copywriting Estratégico']}
          link="/redes-sociales"
          icon={Share2}
          color="bg-pink-500"
          align="left"
          imageContent={<SocialMediaIllustration />}
          hoverColor="hover:!bg-pink-500"
        />

        {/* --- ANIMACIONES --- */}
        <ServiceSection 
          title="Animaciones"
          subtitle="Movimiento que hipnotiza"
          description="El ojo humano se siente atraído por el movimiento. Utilizamos Motion Graphics y animación 3D para explicar conceptos complejos, contar historias y elevar la percepción de calidad de tu marca."
          features={['Motion Graphics', 'Videos Explicativos', 'Animación de Logo', 'Contenido 3D']}
          link="/animaciones"
          icon={Play}
          color="bg-high-orange"
          align="right"
          imageContent={<AnimationsIllustration />}
          hoverColor="hover:!bg-high-orange"
        />

      </div>

      <CTASection />
    </div>
  );
};

export default ServiciosPage;
