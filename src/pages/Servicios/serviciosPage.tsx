import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, Check, Palette, Globe, Share2, Play, Layers, Zap, Monitor, Smartphone, Music, Heart } from 'lucide-react';
import { motion, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ShapeGridBackground } from "@/components/decorations/shapeGridBackground";
import CTASection from '@/components/ctaSection/ctaSection';

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
  imageContainerClassName
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
  imageContainerClassName?: string
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
              <button className={`group flex items-center gap-3 font-bold text-lg ${color.replace('bg-', 'text-')} hover:opacity-70 transition-all duration-300`}>
                <span className="border-b-2 border-current pb-0.5">Explorar servicio</span>
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



const SocialMediaIllustration = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-full min-h-[450px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl p-8 flex items-center justify-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 to-purple-600/30 opacity-100 transition-all duration-500 group-hover:from-pink-500/20 group-hover:to-purple-600/40" />

      {/* Phone */}
      <div className="relative z-10 w-64 h-[400px] bg-white rounded-[2.5rem] border-8 border-gray-900 shadow-2xl overflow-hidden transform transition-all duration-500 group-hover:rotate-[-2deg]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20" />
        
        {/* Screen Content */}
        <div className="w-full h-full bg-gray-50 pt-12 relative overflow-hidden">
          {/* Scrolling Container */}
          <div className="flex flex-col">
            {[0, 1].map((i) => (
              <div 
                key={i} 
                className="flex flex-col gap-4 p-4 animate-marquee-vertical [animation-play-state:paused] group-hover:[animation-play-state:running]"
                style={{ "--duration": "15s", "--gap": "1rem" } as React.CSSProperties}
              >
                {/* Post 1 */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500" />
                    <div className="h-2 w-20 bg-gray-100 rounded-full" />
                  </div>
                  <div className="w-full aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-5 h-5 rounded-full bg-pink-50" />
                    <div className="w-5 h-5 rounded-full bg-gray-50" />
                    <div className="w-5 h-5 rounded-full bg-gray-50" />
                  </div>
                </div>

                {/* Post 2 */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500" />
                    <div className="h-2 w-24 bg-gray-100 rounded-full" />
                  </div>
                  <div className="w-full h-24 bg-gray-100 rounded-lg mb-2 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-cyan-100" />
                  </div>
                  <div className="space-y-1">
                      <div className="h-2 w-full bg-gray-50 rounded-full" />
                      <div className="h-2 w-2/3 bg-gray-50 rounded-full" />
                  </div>
                </div>

                {/* Post 3 */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-500" />
                    <div className="h-2 w-16 bg-gray-100 rounded-full" />
                  </div>
                  <div className="w-full aspect-video bg-gray-100 rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-bl from-green-100 to-emerald-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient Overlays for smooth fade */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent z-10" />
        </div>
      </div>

      {/* Floating Notifications */}
      <div className="absolute top-1/4 right-10 bg-white p-3 rounded-2xl shadow-lg border border-pink-100 flex items-center gap-3 transform transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-4 z-20">
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white">
            <Share2 size={16} />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-16 bg-gray-200 rounded-full" />
            <div className="h-1.5 w-10 bg-gray-100 rounded-full" />
          </div>
      </div>
      
      <div className="absolute bottom-1/3 left-8 bg-white p-3 rounded-2xl shadow-lg border border-pink-100 transform transition-all duration-500 group-hover:-translate-x-2 group-hover:scale-110 z-20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <Heart size={20} className="text-red-500 fill-red-500" />
          </div>
          <div className="flex flex-col pr-2">
            <Counter from={4.2} to={8.5} isHovered={isHovered} />
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Likes</span>
          </div>
      </div>
    </div>
  );
};

const Counter = ({ from, to, isHovered }: { from: number, to: number, isHovered: boolean }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, isHovered ? to : from, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = value.toFixed(1) + 'k';
      }
    });

    return () => controls.stop();
  }, [from, to, isHovered]);

  return <span ref={nodeRef} className="text-sm font-bold text-gray-800">{from.toFixed(1)}k</span>;
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
          imageContent={
            <div className="relative w-full h-full min-h-[450px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl p-8 flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-100" />
              
              {/* Branding Visual */}
              <div className="relative z-10 grid grid-cols-2 gap-6 w-full max-w-sm">
                
                {/* Palette Card */}
                <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-500 group-hover:-rotate-3 group-hover:-translate-y-2">
                  <div className="flex gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#7741EA]" />
                    <div className="w-8 h-8 rounded-full bg-[#35F099]" />
                    <div className="w-8 h-8 rounded-full bg-gray-900" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-gray-100 rounded-full" />
                    <div className="h-2 w-2/3 bg-gray-50 rounded-full" />
                  </div>
                </div>

                {/* Logo Grid Card */}
                <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-500 group-hover:rotate-3 group-hover:translate-x-2 mt-8">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                     <div className="w-full aspect-square border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-900 rounded-sm transform rotate-45" />
                     </div>
                     <div className="w-full aspect-square bg-gray-50 rounded-lg" />
                  </div>
                  <div className="h-2 w-12 bg-gray-200 rounded-full mx-auto" />
                </div>

              </div>
              
              {/* Floating Element */}
              <div className="absolute bottom-1/4 right-1/4 bg-white p-3 rounded-full shadow-xl border border-gray-100 transform transition-all duration-700 group-hover:scale-110 z-20">
                 <Palette size={24} className="text-[#7741EA]" />
              </div>

            </div>
          }
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
          imageContent={
            <div className="relative w-full h-full min-h-[450px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl p-8 flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-tl from-[#F18807]/15 to-[#F0B708]/30 opacity-100 transition-all duration-500 group-hover:from-[#F18807]/25 group-hover:to-[#F0B708]/40" />
              
              {/* Main 3D Shape / Screen */}
              <div className="relative z-10 w-64 h-64">
                {/* Timeline Track */}
                <div className="absolute -bottom-12 -left-12 -right-12 h-16 bg-white/80 backdrop-blur-md rounded-xl border border-white/50 shadow-lg flex items-center px-4 gap-2 transform transition-all duration-500 group-hover:translate-y-[-10px]">
                   <div className="w-8 h-8 rounded-full bg-[#F18807] flex items-center justify-center text-white">
                     <Play size={14} fill="currentColor" />
                   </div>
                   <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                     <div className="h-full w-1/3 bg-gradient-to-r from-[#F18807] to-[#F0B708] group-hover:w-2/3 transition-all duration-1000 ease-in-out" />
                   </div>
                   <div className="text-xs font-mono text-gray-500">00:12</div>
                </div>

                {/* Central Element */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F18807] to-[#F0B708] rounded-3xl shadow-2xl transform transition-all duration-700 group-hover:rotate-[10deg] group-hover:scale-110 flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                   <Play size={64} className="text-white fill-white opacity-90 transform group-hover:scale-125 transition-transform duration-500" />
                   

                </div>

                {/* Floating Elements */}
                <div className="absolute -top-8 -right-8 bg-white p-3 rounded-xl shadow-lg transform transition-all duration-500 group-hover:translate-y-4 group-hover:-translate-x-4 z-0">
                   <Music size={24} className="text-[#F18807]" />
                </div>

              </div>
            </div>
          }
        />

      </div>

      <CTASection />
    </div>
  );
};

export default ServiciosPage;
