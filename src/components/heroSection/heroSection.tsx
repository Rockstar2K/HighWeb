"use client"

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';
import { ShapeGridBackground } from "@/components/decorations/shapeGridBackground";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const services = [
    { label: "Creación de marcas", to: "/branding" },
    { label: "Sitios Web", to: "/sitios-web" },
    { label: "Redes sociales", to: "/redes-sociales" },
    { label: "Animación", to: "/animaciones" },
  ];

  useEffect(() => {
    let frame: number | null = null;

    const updateProgress = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height || 1;
      const offset = Math.min(Math.max(-rect.top, 0), sectionHeight);
      const progress = offset / sectionHeight;
      setScrollProgress(progress);
    };

    const handleScroll = () => {
      if (frame) {
-        cancelAnimationFrame(frame);
+        cancelAnimationFrame(frame);
      }
      frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-screen h-screen overflow-visible z-0"
    >
      <ShapeGridBackground 
        scrollProgress={scrollProgress}
        style={{ aspectRatio: '9/6' }}
      />

      <div className="absolute inset-0 bg-white/5 z-0 pointer-events-none" />
      <div className="h-full flex items-center justify-center relative z-10">
        <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 
              className="text-4xl font-bold tracking-tighter text-black sm:text-5xl md:text-6xl lg:text-7xl "
            >
              Desbloquea el poder <br></br><span className="text-[#35F099]">de una marca poderosa</span>
            </h1>
            <p 
              className="mx-auto max-w-[700px] text-gray-500 md:text-xl"
            >
              {services.map((service, index) => (
                <span key={service.to}>
                  {index > 0 && " - "}
                  <Link
                    to={service.to}
                    className="no-underline !text-gray-500 visited:!text-gray-500 transition-colors hover:!text-[#35F099]"
                  >
                    {service.label}
                  </Link>
                </span>
              ))}
            </p>
          </div>
          <div 
            className="flex flex-col gap-4 min-[400px]:flex-row"
          >
            <Button 
              size="lg"
              className="hover:brightness-105 transition-all"
              variant="green"
            >
             <Link className="text-white!" to="/servicios">Servicios</Link>
            </Button>
            <Button size="lg" variant="white" className="bg-transparent ">
             <Link className="text-[#7741EA]! hover:text-white!" to="/contacto">Contacto</Link>
            </Button>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
