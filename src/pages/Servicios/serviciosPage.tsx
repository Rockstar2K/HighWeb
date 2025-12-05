import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, Check, Palette, Globe, Share2, Play, Layers, Zap, Monitor, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
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
              <span className="bg-gradient-to-r from-[#35F099] to-[#7741EA] bg-clip-text text-transparent">dominar tu mercado</span>.
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
          subtitle="Identidad que deja huella."
          description="No diseñamos solo 'logos bonitos'. Construimos sistemas de identidad visual estratégicos que comunican la esencia de tu negocio, diferencian tu oferta y aumentan el valor percibido de tu marca."
          features={['Estrategia de Marca', 'Diseño de Logotipo', 'Manual de Identidad', 'Papelería Corporativa']}
          link="/branding"
          icon={Palette}
          color="bg-[#7741EA]!"
          align="left"
          imageContainerClassName="h-auto min-h-[400px]"
          imageContent={
            <div className="relative w-full h-auto min-h-[400px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl p-8 flex items-center justify-center group">
              {/* Background - always visible but stronger on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#7741EA]/10 to-[#7741EA]/30 opacity-100 transition-all duration-500 group-hover:from-[#7741EA]/20 group-hover:to-[#7741EA]/40" />
              
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7741EA]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#35F099]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10 w-full max-w-sm">
                {/* Main Card */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 relative z-20 transform transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#7741EA] flex items-center justify-center text-white">
                      <Palette size={24} />
                    </div>
                    <div className="h-2 w-24 bg-gray-100 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-gray-50 rounded-full" />
                    <div className="h-2 w-5/6 bg-gray-50 rounded-full" />
                    <div className="h-2 w-4/6 bg-gray-50 rounded-full" />
                  </div>
                  {/* Color Swatches */}
                  <div className="flex gap-2 mt-6">
                    <div className="w-8 h-8 rounded-full bg-[#7741EA] transform transition-transform duration-300 group-hover:scale-110" />
                    <div className="w-8 h-8 rounded-full bg-[#35F099] transform transition-transform duration-300 delay-75 group-hover:scale-110" />
                    <div className="w-8 h-8 rounded-full bg-black transform transition-transform duration-300 delay-150 group-hover:scale-110" />
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 bg-white p-3 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-700 group-hover:translate-x-2 group-hover:-translate-y-2 z-30">
                  <span className="text-2xl font-serif font-bold text-[#1a1a1a]">Aa</span>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-700 group-hover:-translate-x-2 group-hover:translate-y-2 z-30">
                  <span className="font-bold text-xs tracking-widest">LOGO</span>
                </div>
                
                {/* Pen Tool */}
                 <div className="absolute top-1/2 -right-12 bg-white p-2 rounded-full shadow-md border border-gray-100 transform transition-all duration-500 group-hover:rotate-12 group-hover:translate-x-[-10px] z-10">
                  <Layers size={20} className="text-gray-400" />
                </div>
              </div>
            </div>
          }
        />

        {/* --- SITIOS WEB --- */}
        <ServiceSection 
          title="Sitios Web"
          subtitle="Tu mejor vendedor, 24/7."
          description="Diseñamos experiencias digitales que convierten visitantes en clientes. Sitios web ultrarrápidos, optimizados para SEO y con un diseño que refleja la calidad premium de tu negocio."
          features={['Diseño UI/UX', 'Desarrollo a Medida', 'E-commerce', 'Optimización SEO']}
          link="/sitios-web"
          icon={Globe}
          color="bg-blue-500"
          align="right"
          imageContent={
            <div className="relative w-full h-full min-h-[450px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl p-8 flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-blue-600/30 opacity-100 transition-all duration-500 group-hover:from-blue-500/20 group-hover:to-blue-600/40" />
              
              {/* Browser Window */}
              <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-blue-500/20">
                {/* Header */}
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="ml-4 flex-1 h-6 bg-white rounded-md border border-gray-200 shadow-sm" />
                </div>
                {/* Body */}
                <div className="p-6 grid grid-cols-12 gap-4">
                  {/* Sidebar */}
                  <div className="col-span-3 space-y-2">
                    <div className="h-2 w-full bg-gray-100 rounded-full" />
                    <div className="h-2 w-2/3 bg-gray-100 rounded-full" />
                    <div className="h-2 w-3/4 bg-gray-100 rounded-full" />
                  </div>
                  {/* Main */}
                  <div className="col-span-9 space-y-4">
                    <div className="h-32 bg-blue-50 rounded-lg border border-blue-100 relative overflow-hidden group-hover:bg-blue-100 transition-colors">
                       <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full shadow-sm" />
                       <div className="absolute bottom-4 right-4 px-3 py-1 bg-blue-500 text-white text-xs rounded-full">Button</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-gray-50 rounded-lg" />
                      <div className="h-20 bg-gray-50 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Code Snippet */}
              <div className="absolute bottom-10 right-10 bg-[#1e1e1e] p-4 rounded-lg shadow-xl transform transition-all duration-700 group-hover:translate-y-[-20px] group-hover:rotate-[-3deg] z-20">
                <div className="space-y-1.5">
                  <div className="flex gap-2"><span className="w-2 h-2 rounded-full bg-red-500" /><span className="text-[10px] text-blue-300">const</span> <span className="text-[10px] text-yellow-300">App</span> = () ={'>'} {'{'}</div>
                  <div className="pl-4 text-[10px] text-green-300">return (</div>
                  <div className="pl-8 text-[10px] text-white">{'<Hero />'}</div>
                  <div className="pl-4 text-[10px] text-green-300">)</div>
                  <div className="text-[10px] text-white">{'}'}</div>
                </div>
              </div>
            </div>
          }
        />

        {/* --- REDES SOCIALES --- */}
        <ServiceSection 
          title="Redes Sociales"
          subtitle="Domina la conversación."
          description="Deja de publicar por publicar. Creamos estrategias de contenido visualmente impactantes que detienen el scroll, generan comunidad y fidelizan a tu audiencia."
          features={['Gestión de Redes', 'Creación de Contenido', 'Diseño de Feed', 'Copywriting Estratégico']}
          link="/redes-sociales"
          icon={Share2}
          color="bg-pink-500"
          align="left"
          imageContent={
            <div className="relative w-full h-full min-h-[450px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl p-8 flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 to-purple-600/30 opacity-100 transition-all duration-500 group-hover:from-pink-500/20 group-hover:to-purple-600/40" />

              {/* Phone */}
              <div className="relative z-10 w-64 h-[400px] bg-white rounded-[2.5rem] border-8 border-gray-900 shadow-2xl overflow-hidden transform transition-all duration-500 group-hover:rotate-[-2deg]">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20" />
                
                {/* Screen Content */}
                <div className="w-full h-full bg-gray-50 pt-12 px-4 pb-4 flex flex-col gap-4">
                  {/* Post */}
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                     <div className="flex items-center gap-2 mb-2">
                       <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500" />
                       <div className="h-2 w-20 bg-gray-100 rounded-full" />
                     </div>
                     <div className="w-full aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 group-hover:scale-110 transition-transform duration-700" />
                     </div>
                     <div className="flex gap-2">
                       <div className="w-5 h-5 rounded-full bg-pink-50" />
                       <div className="w-5 h-5 rounded-full bg-gray-50" />
                       <div className="w-5 h-5 rounded-full bg-gray-50" />
                     </div>
                  </div>
                   {/* Post 2 */}
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 opacity-50">
                     <div className="flex items-center gap-2 mb-2">
                       <div className="w-8 h-8 rounded-full bg-gray-200" />
                       <div className="h-2 w-20 bg-gray-100 rounded-full" />
                     </div>
                     <div className="w-full h-20 bg-gray-100 rounded-lg" />
                  </div>
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
              
              <div className="absolute bottom-1/3 left-8 bg-white p-2 rounded-full shadow-lg border border-pink-100 transform transition-all duration-500 group-hover:-translate-x-2 group-hover:scale-110 z-20">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white">
                   <span className="font-bold text-xs">99+</span>
                 </div>
              </div>
            </div>
          }
        />

        {/* --- ANIMACIONES --- */}
        <ServiceSection 
          title="Animaciones"
          subtitle="Movimiento que hipnotiza."
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
                   
                   {/* Particles */}
                   <div className="absolute top-4 right-4 w-4 h-4 bg-[#F0B708] rounded-full animate-pulse" />
                   <div className="absolute bottom-8 left-8 w-6 h-6 bg-white/30 rounded-full" />
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-8 -right-8 bg-white p-3 rounded-xl shadow-lg transform transition-all duration-500 group-hover:translate-y-4 group-hover:-translate-x-4 z-0">
                   <Layers size={24} className="text-[#F18807]" />
                </div>
                <div className="absolute -bottom-4 -left-8 bg-white p-3 rounded-xl shadow-lg transform transition-all duration-500 group-hover:-translate-y-4 group-hover:translate-x-4 z-20">
                   <Zap size={24} className="text-[#F0B708]" />
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
