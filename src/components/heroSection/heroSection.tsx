"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section 
      className="relative w-screen h-screen overflow-hidden" 
    >
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 1fr)',
          gridTemplateRows: 'repeat(6, 1fr)',
          aspectRatio: '9/6'
        }}
      >
        {Array.from({ length: 6 * 9 }).map((_, i) => {
          // Common styles
          const commonShadow = '0 0 25px 5px rgba(0, 0, 0, 0.15)';
          
          // Shape configurations
          const shapes = [
            {
              position: 10, // 2x2 (2nd row, 2nd column)
              type: 'circle',
              color: 'red',
              borderWidth: '2px',
              shadow: commonShadow
            },
            {
              position: 24, // 7x4 (4th row, 7th column)
              type: 'circle',
              color: 'red',
              borderWidth: '2px',
              shadow: commonShadow
            },
            {
              position: 15, // Position 16 (0-based index 15)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '0%', // Start with 0% (square), can be increased to make it rounded
              shadow: commonShadow
            },
            {
              position: 16, // Position 17 (0-based index 16)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '0 0 45px 0',
              shadow: commonShadow
            },
             {
              position: 18, // Position 18 (0-based index 17)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '0 45px 0 0',
              shadow: commonShadow
            },
             {
              position: 28, // Position 28 (0-based index 27)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '0 45px 0 45px',
              shadow: commonShadow
            },
              {
              position: 35, // Position 35 (0-based index 34)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '45px 0 45px 0',
              shadow: commonShadow
            },
               {
              position: 36, // Position 36 (0-based index 35)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '0 0 45px 0',
              shadow: commonShadow
            },
                 {
              position: 37, // Position 37 (0-based index 36)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '45px 45px 0 45px',
              shadow: commonShadow
            },
                 {
              position: 42, // Position 37 (0-based index 36)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '45px 45px 0 0',
              shadow: commonShadow
            },
                  {
              position: 48, // Position 37 (0-based index 36)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '0%',
              shadow: commonShadow
            },
                  {
              position: 49, // Position 37 (0-based index 36)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '0 0 45px 0',
              shadow: commonShadow
            },
                   {
              position: 50, // Position 37 (0-based index 36)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '0 45px 0 45px',
              shadow: commonShadow
            },
                      {
              position: 51, // Position 37 (0-based index 36)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '0 0 45px 0 ',
              shadow: commonShadow
            },
                                  {
              position: 52, // Position 37 (0-based index 36)
              type: 'circle',
              color: 'red',
              borderWidth: '0',
              borderRadius: '0%',
              shadow: commonShadow
            },
              
          ];
          
          const currentShape = shapes.find(shape => shape.position === i);
          
          return (
            <div 
              key={i} 
              className=" relative" // Grid cell border
            >
              {currentShape && (
                <div className="absolute inset-0 flex items-center justify-center z-10 p-2">
                  {currentShape.type === 'circle' ? (
                    <div className="relative flex items-center justify-center h-full" style={{ width: 'auto' }}>
                      <div 
                        className="relative h-full rounded-full "
                        style={{
                          aspectRatio: '1/1',
                          boxShadow: currentShape.shadow,
                        }}
                      />
                    </div>
                  ) : (
                    <div 
                      className="w-full h-full "
                      style={{
                        boxShadow: currentShape.shadow,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
      <div className="absolute inset-0 bg-white/5" />
      <div className="h-full flex items-center justify-center">
        <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter text-black sm:text-5xl md:text-6xl lg:text-7xl ">
              Desbloquea el poder <br></br><span className="text-[#35F099]">de una marca poderosa</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Creación de marcas - Sitios Web - Redes sociales - Animación
            </p>
          </div>
          <div className="flex flex-col gap-4 min-[400px]:flex-row">
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
