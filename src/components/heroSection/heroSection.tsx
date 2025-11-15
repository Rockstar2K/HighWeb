"use client"

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

type ShapeConfig = {
  position: number;
  type: 'circle' | 'square';
  borderRadius?: string;
};

type ShapeStyle = ShapeConfig & {
  background: string;
  boxShadow: string;
};

const SHAPE_CONFIGS: ShapeConfig[] = [
  { position: 10, type: 'circle' },
  { position: 24, type: 'circle' },
  { position: 15, type: 'square', borderRadius: '0%' },
  { position: 16, type: 'square', borderRadius: '0 0 65px 0' },
  { position: 19, type: 'square', borderRadius: '0 65px 0 0' },
  { position: 27, type: 'square', borderRadius: '0 65px 0 65px' },
  { position: 28, type: 'circle' },
  { position: 35, type: 'square', borderRadius: '65px 0 65px 0' },
  { position: 37, type: 'square', borderRadius: '65px 65px 0 65px' },
  { position: 42, type: 'square', borderRadius: '65px 65px 0 0' },
  { position: 45, type: 'square', borderRadius: '65px 65px 0 0' },
  { position: 48, type: 'square', borderRadius: '0%' },
  { position: 49, type: 'square', borderRadius: '0 0 65px 0' },
  { position: 50, type: 'square', borderRadius: '0 65px 0 65px' },
  { position: 51, type: 'square', borderRadius: '0 0 65px 0' },
  { position: 52, type: 'circle' },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const shapes = useMemo(() => {
    const getRandomShadow = () => {
      const offsetX = Math.floor(Math.random() * 5);
      const offsetY = Math.floor(Math.random() * 5);
      const blur = 16 + Math.floor(Math.random() * 24);
      const spread = 4 + Math.floor(Math.random() * 8);
      const opacity = 0.1 + (Math.random() * 0.15);
      return `${offsetX}px ${offsetY}px ${blur}px ${spread}px rgba(0, 0, 0, ${opacity.toFixed(2)})`;
    };

    const getRandomGradient = () => {
      const directions = [
        'to right',
        'to left',
        'to bottom',
        'to top',
        'to bottom right',
        'to top left',
        'to bottom left',
        'to top right'
      ];
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const minLightness = 245;
      const randomLightness = minLightness + Math.floor(Math.random() * (256 - minLightness));
      const randomColor = `rgb(${randomLightness}, ${randomLightness}, ${randomLightness})`;

      return `linear-gradient(${direction}, #FFFFFF, ${randomColor})`;
    };

    return SHAPE_CONFIGS.reduce<Map<number, ShapeStyle>>((acc, config) => {
      acc.set(config.position, {
        ...config,
        background: getRandomGradient(),
        boxShadow: getRandomShadow(),
      });
      return acc;
    }, new Map());
  }, []);

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

  const getScrollParallaxStyle = (strength: number) => {
    const effectiveProgress = Math.min(scrollProgress, 0.6);
    return {
      transform: `translate3d(0, ${effectiveProgress * strength}px, 0)`
    };
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-screen h-screen overflow-visible z-0"
    >
      <div 
        className="absolute inset-0 w-full h-full hidden lg:grid overflow-visible pointer-events-none -z-10"
        style={{
          gridTemplateColumns: 'repeat(9, 1fr)',
          gridTemplateRows: 'repeat(6, 1fr)',
          aspectRatio: '9/6',
        }}
      >
        {Array.from({ length: 6 * 9 }).map((_, i) => {
          const currentShape = shapes.get(i);
          const depth = 140 + (Math.floor(i / 9) * 28);
          
          return (
            <div 
              key={i} 
              className=" relative" // Grid cell border
            >
              {currentShape && (
                <div 
                  className="absolute inset-0 flex items-center justify-center p-0"
                  style={getScrollParallaxStyle(depth)}
                >
                  {currentShape.type === 'circle' ? (
                    <div className="relative flex items-center justify-center h-full" style={{ width: 'auto' }}>
                      <div 
                        className="relative h-full rounded-full "
                        style={{
                          aspectRatio: '1/1',
                          boxShadow: currentShape.boxShadow,
                          background: currentShape.background
                        }}
                      />
                    </div>
                  ) : (
                    <div 
                      className="w-full h-full "
                      style={{
                        boxShadow: currentShape.boxShadow,
                        background: currentShape.background,
                        borderRadius: currentShape.borderRadius
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

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
              Creación de marcas - Sitios Web - Redes sociales - Animación
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
