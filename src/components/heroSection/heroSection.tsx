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
        className="absolute inset-0 w-full h-full hidden lg:grid"
        style={{
          gridTemplateColumns: 'repeat(9, 1fr)',
          gridTemplateRows: 'repeat(6, 1fr)',
          aspectRatio: '9/6',
        }}
      >
        {Array.from({ length: 6 * 9 }).map((_, i) => {
          // Function to generate random shadow within limits
          const getRandomShadow = () => {
            const offsetX = Math.floor(Math.random() * 5); // 0-4px
            const offsetY = Math.floor(Math.random() * 5); // 0-4px
            const blur = 10 + Math.floor(Math.random() * 16); // 10-25px
            const spread = 3 + Math.floor(Math.random() * 5); // 1-5px
            const opacity = 0.05 + (Math.random() * 0.1); // 0.05-0.15
            return `${offsetX}px ${offsetY}px ${blur}px ${spread}px rgba(0, 0, 0, ${opacity.toFixed(2)})`;
          };

          // Function to generate random gradient
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
            // Generate a random light gray (lighter than F3F3F3)
            const minLightness = 245; // Lighter than F3F3F3 (243)
            const randomLightness = minLightness + Math.floor(Math.random() * (256 - minLightness));
            const randomColor = `rgb(${randomLightness}, ${randomLightness}, ${randomLightness})`;
            
            return `linear-gradient(${direction}, #FFFFFF, ${randomColor})`;
          };
          
          // Shape configurations
          const shapes = [
            {
              position: 10, // 2x2 (2nd row, 2nd column)
              type: 'circle',
              color: 'red',
              borderWidth: '2px',
              shadow: getRandomShadow()
            },
            {
              position: 24, // 7x4 (4th row, 7th column)
              type: 'circle',
              color: 'red',
              borderWidth: '2px',
              shadow: getRandomShadow()
            },
            {
              position: 15, // Position 16 (0-based index 15)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '0%', // Start with 0% (square), can be increased to make it rounded
              shadow: getRandomShadow()
            },
            {
              position: 16, // Position 17 (0-based index 16)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '0 0 45px 0',
              shadow: getRandomShadow()
            },
             {
              position: 19, // Position 18 (0-based index 17)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '0 45px 0 0',
              shadow: getRandomShadow()
            },
             {
              position: 27, // Position 28 (0-based index 27)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '0 45px 0 45px',
              shadow: getRandomShadow()
            },
              {
              position: 28, // Position 28 (0-based index 27)
              type: 'circle',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '0%',
              shadow: getRandomShadow()
            },
              {
              position: 35, // Position 35 (0-based index 34)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '45px 0 45px 0',
              shadow: getRandomShadow()
            },
             
                 {
              position: 37, // Position 37 (0-based index 36)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '45px 45px 0 45px',
              shadow: getRandomShadow()
            },
                 {
              position: 42, // Position 37 (0-based index 36)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '45px 45px 0 0',
              shadow: getRandomShadow()
            },
             {
              position: 45, // Position 37 (0-based index 36)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '45px 45px 0 0',
              shadow: getRandomShadow()
            },
                  {
              position: 48, // Position 37 (0-based index 36)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '0%',
              shadow: getRandomShadow()
            },
                  {
              position: 49, // Position 37 (0-based index 36)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '0 0 45px 0',
              shadow: getRandomShadow()
            },
                   {
              position: 50, // Position 37 (0-based index 36)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '0 45px 0 45px',
              shadow: getRandomShadow()
            },
                      {
              position: 51, // Position 37 (0-based index 36)
              type: 'square',
              color: 'red',
              borderWidth: '2px',
              borderRadius: '0 0 45px 0 ',
              shadow: getRandomShadow()
            },
                                  {
              position: 52, // Position 37 (0-based index 36)
              type: 'circle',
              color: 'red',
              borderWidth: '0',
              borderRadius: '0%',
              shadow: getRandomShadow()
            },
              
          ];
          
          const currentShape = shapes.find(shape => shape.position === i);
          
          return (
            <div 
              key={i} 
              className=" relative" // Grid cell border
            >
              {currentShape && (
                <div className="absolute inset-0 flex items-center justify-center z-10 p-0">
                  {currentShape.type === 'circle' ? (
                    <div className="relative flex items-center justify-center h-full" style={{ width: 'auto' }}>
                      <div 
                        className="relative h-full rounded-full "
                        style={{
                          aspectRatio: '1/1',
                          boxShadow: currentShape.shadow,
                          background: getRandomGradient()
                        }}
                      />
                    </div>
                  ) : (
                    <div 
                      className="w-full h-full "
                      style={{
                        boxShadow: currentShape.shadow,
                        background: getRandomGradient(),
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
