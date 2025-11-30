import React, { useState, useEffect } from 'react';
import { ArrowDown, Check, Star, BadgeCheck, ArrowRight, ChevronRight } from 'lucide-react';
import { SocialSection } from '@/components/socialSection/socialSection';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// --- Types ---

// --- Data ---
const CHART_DATA = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 55 },
  { name: 'Apr', value: 60 },
  { name: 'May', value: 80 },
  { name: 'Jun', value: 100 },
];


// --- Components ---

const BackgroundShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-white" />
      
      {/* Animated shapes */}
      <motion.div 
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#35F099] rounded-[100px] opacity-5"
      />
      
      <motion.div 
        animate={{
          y: [0, 30, 0],
          x: [0, 10, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-[#7741EA] rounded-full opacity-5"
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMwMDAwMDAiLz4KICA8L2c+Cjwvc3ZnPg==')]" />
    </div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ mins: 56, secs: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { mins: prev.mins - 1, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-white text-right">
      <p className="text-sm md:text-base font-light mb-1 opacity-90">Este descuento se acaba en:</p>
      <div className="text-2xl md:text-3xl font-bold font-mono">
        {timeLeft.mins} mins y {timeLeft.secs.toString().padStart(2, '0')} secs
      </div>
    </div>
  );
};

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

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans relative overflow-x-hidden mt-[15vh]">
      <BackgroundShapes />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-28 pb-40 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">

        <FadeInOnScroll>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
            Demuestra tu calidad <br className="hidden md:block" />
            con una marca que <span className="bg-gradient-to-r from-[#35F099] to-[#7741EA] bg-clip-text text-transparent">impacte</span>.
          </h1>
        </FadeInOnScroll>
        
        <FadeInOnScroll delay={0.2}>
          <p className="text-[#666] max-w-2xl mb-12 text-lg md:text-xl leading-relaxed">
            Transformamos marcas en experiencias memorables. No solo creamos logos, construimos identidades que cuentan historias y generan conexiones duraderas.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-24">
            <button className="group relative overflow-hidden bg-[#35F099] hover:bg-[#2ad187] text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <span className="relative z-10">Nuestros Servicios</span>
              <span className="absolute inset-0 bg-[#2ad187] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
            <button className="group flex items-center gap-2 bg-white border border-[#e0e0e0] hover:border-[#35F099] text-[#333] font-medium py-4 px-8 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
              <span>Ver Proyectos</span>
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.6}>
          <div className="w-14 h-14 border border-[#e0e0e0] rounded-full flex items-center justify-center animate-bounce cursor-pointer text-[#999] hover:text-[#35F099] transition-colors bg-white/80 backdrop-blur-sm hover:shadow-md">
            <ArrowDown size={20} className="animate-pulse" />
          </div>
        </FadeInOnScroll>
      </section>

      {/* --- RESULTS SECTION --- */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-left">
            <FadeInOnScroll>
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#35F099] text-white text-sm font-medium mb-6">
                <span>Nuestro Enfoque</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
                No solo diseño,<br />
                <span className="bg-gradient-to-r from-[#35F099] to-[#7741EA] bg-clip-text text-transparent">solución estratégica</span>
              </h2>

              <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                <span className="font-semibold text-[#1a1a1a]">Antes de crear el logo</span>, trabajaremos contigo para ayudarte a 
                mejorar tu conexión con tus clientes potenciales, tu visión, tu cultura 
                empresarial y sobre todo, la <span className="font-semibold text-[#1a1a1a]">estrategia de tu marca</span>.
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

        <div className="relative w-full max-w-4xl mx-auto">
          {/* Main Placeholder Image for the complex diagram */}
          <div className="w-full aspect-[4/3] bg-[#f8f8f8] rounded-xl overflow-hidden shadow-inner flex items-center justify-center relative border border-[#e0e0e0]">
            <img 
              src="https://picsum.photos/800/600" 
              alt="Included Items Diagram" 
              className="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-700" 
            />
            
            {/* Overlay Badges replicating the diagram feel */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 md:left-20 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-md text-xs font-bold text-[#35F099]">
                    Investigación de Clientes
                </div>
                <div className="absolute top-10 right-10 md:right-20 bg-[#35F099] px-4 py-2 rounded-full shadow-md text-xs font-bold text-white">
                    3 Opciones de Logotipo
                </div>
                <div className="absolute bottom-20 left-10 bg-[#7741EA] px-4 py-2 rounded-full shadow-md text-xs font-bold text-white">
                    Atributos de Marca
                </div>
                <div className="absolute bottom-40 right-20 bg-[#35F099] px-4 py-2 rounded-full shadow-md text-xs font-bold text-white">
                    Manual de Marca
                </div>
                 <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg border border-[#35F099] text-sm font-bold text-[#1a1a1a]">
                   Box of Creativity
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] mb-8">
          ¿Cuál es precio de todo esto?
        </h2>

        <div className="bg-gradient-to-r from-[#7741EA] to-[#5e2fbc] rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 transform hover:scale-[1.01] transition-transform">
          <div className="flex-1 text-center md:text-left">
             <div className="text-white text-8xl md:text-9xl font-black tracking-tighter leading-none drop-shadow-md">
               -25%
             </div>
          </div>
          
          <div className="flex-1 w-full md:w-auto border-t md:border-t-0 md:border-l border-purple-400 pt-6 md:pt-0 md:pl-12 flex flex-col justify-center items-center md:items-end">
             <CountdownTimer />
             <button className="mt-6 bg-white text-[#7741EA] font-bold py-3 px-8 rounded-full hover:bg-[#f5f5f5] transition-colors shadow-lg flex items-center gap-2">
                Reclamar Oferta <ArrowRight size={18} />
             </button>
          </div>
        </div>
      </section>

     
    </div>
  );
}