import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Check, Star, BadgeCheck, ArrowRight, ChevronRight } from 'lucide-react';
import { SocialSection } from '@/components/socialSection/socialSection';
import { LottieAnimation } from '@/components/ui/lottie-animation';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { Button } from '@/components/ui/button';
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

const SitiosWebPage = () => {
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
    <div className="min-h-screen bg-white text-gray-900  relative overflow-x-hidden mt-[15vh]">

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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
            Creamos páginas web que<br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[#35F099] to-[#7741EA] bg-clip-text text-transparent"> venden</span>. Y ya está.
          </h1>
        </FadeInOnScroll>
        
        <FadeInOnScroll delay={0.2}>
          <p className="text-[#666] max-w-2xl mb-12 text-lg md:text-xl leading-relaxed">
            Creamos sitios web profesionales, rápidos y optimizados que se vuelven máquinas de ventas. No solo diseñamos páginas, construimos experiencias digitales que convierten visitantes en clientes.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-24">
            <button 
              onClick={() => {
                const element = document.getElementById('nuestro-enfoque');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative overflow-hidden bg-[#7741EA]! hover:bg-[#35F099]! text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            >
              <span className="relative z-10">Nuestro Enfoque</span>
            </button>

            <button 
              onClick={() => {
                const element = document.getElementById('nuestro-enfoque');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative overflow-hidden bg-white! hover:bg-[#7741EA]! text-[#7741EA] hover:text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="relative z-10">Ver proyectos</span>
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

      {/* --- RESULTS SECTION --- */}
      <section id="nuestro-enfoque" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-left">
            <FadeInOnScroll>
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#35F099] text-white text-sm font-medium mb-6">
                <span>Nuestro Enfoque</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
                No solo páginas web,<br />
                <span className="bg-gradient-to-r from-[#35F099] to-[#7741EA] bg-clip-text text-transparent">herramientas de crecimiento</span>
              </h2>

              <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                <span className="font-semibold text-[#1a1a1a]">Ver ejemplos</span>, analizamos tu negocio para crear 
                una web que no solo se vea bien, sino que también cumpla con tus objetivos 
                comerciales y ofrezca una <span className="font-semibold text-[#1a1a1a]">experiencia de usuario excepcional</span>.
              </p>

              <div className="">
                {[
                  {
                    icon: <Star className="text-[#35F099]" size={20} />,
                    title: "Mayor valor percibido",
                    description: "Posiciona tu marca en un nivel superior y justifica precios premium"
                  },
                  {
                    icon: <BadgeCheck className="text-[#7741EA]" size={20} />,
                    title: "Diferenciación real",
                    description: "Destaca en un mercado saturado con una identidad única y memorable"
                  },
                  {
                    icon: <ArrowRight className="text-[#35F099]" size={20} />,
                    title: "Crecimiento sostenible",
                    description: "Hemos ayudado a negocios a incrementar sus ventas hasta en un 258%"
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#f9f9f9] transition-colors"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-[#e0e0e0] flex items-center justify-center">
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1a1a1a]">{item.title}</h4>
                      <p className="text-[#666] text-sm mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeInOnScroll>
          </div>

          {/* Visual Content */}
          <div className="relative h-full min-h-[500px] w-full">
            <div className="absolute inset-0  rounded-3xl overflow-hidden">
              
            
             
              {/* Content */}
              <div className="relative h-full flex items-center justify-center p-12">
                <div className="relative w-full max-w-md">
                 
                  
                  {/* Floating card 2 */}
                  <motion.div 
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="absolute -bottom-10 -right-10 w-64 bg-white p-6 rounded-2xl shadow-lg border border-[#7741EA] z-10"
                  >
                    <div className="text-3xl font-bold text-[#35F099] mb-2">98%</div>
                    <p className="text-sm text-[#666]">Tasa de satisfacción de clientes</p>
                  </motion.div>
                  
                  {/* Main card */}
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-white p-8 rounded-3xl shadow-xl border border-[#35F099] overflow-hidden"
                  >
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Estrategia de Marca</h3>
                      <p className="text-[#666] mb-6">Desarrollamos una identidad que comunica tu valor único y resuena con tu audiencia ideal.</p>
                      <ul className="space-y-3">
                        {['Investigación de mercado', 'Estrategia de marca', 'Diseño de identidad', 'Guías de estilo'].map((item, i) => (
                          <li key={i} className="flex items-center text-[#333]">
                            <Check className="w-5 h-5 text-[#35F099] mr-2" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <SocialSection />
      </section>

      {/* --- INCLUDED SECTION --- */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a1a1a] mb-16">
          ¿Qué viene <span className="text-[#7741EA]">incluído</span>?
        </h2>
        
        <div className="max-w-5xl mx-auto">
          <LottieAnimation 
            path="/lottie/Caja de Pagina Web 2.json"
            className="w-full h-auto"
            loop={true}
            autoplay={true}
          />
        </div>
      </section>


      
      <CTASection />
    </div>
  );
};

export default SitiosWebPage;
