"use client"

import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section 
      className="relative w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: 'url("/src/assets/hero/hero-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
    >
      <div className="absolute inset-0 bg-white/10" />
      <div className="h-full flex items-center justify-center">
        <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter text-black sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
              Desbloquea el poder de una marca poderosa
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Creación de marcas - Sitios Web - Redes sociales - Animación
            </p>
          </div>
          <div className="flex flex-col gap-4 min-[400px]:flex-row">
            <Button size="lg" className="bg-accent! text-white hover:bg-gray-100">
              Servicios
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-black border-black hover:bg-black/10 hover:text-black">
              Contacto
            </Button>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
