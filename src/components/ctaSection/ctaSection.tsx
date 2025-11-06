import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CTASection = () => {
  return (
    <section className="w-full py-28 md:py-24 lg:py-48 bg-black shadow-lg overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-24">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            ¿Todavía te quedan <span className="text-[#7741EA]">dudas?</span>
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Cuentanos sobre cualquier idea o consulta que tengas.
          </p>
        </div>
        
        <div className="grid gap-10 md:grid-cols-2">
          {/* Form Column */}
          <div className="space-y-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <label 
                  className="bg-white/10 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="first-name"
                >
                </label>
                <Input
                  id="first-name"
                  placeholder="Nombre completo"
                  className="w-full bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-white/40 focus:ring-0"
                />
              </div>
              <div className="space-y-2">
                <label 
                  className="bg-white/10 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                 
                </label>
                <Input id="email" placeholder="Correo electrónico" type="email" 
                className="bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-white/40 focus:ring-0"
                />
              </div>
              <div className="space-y-2">
                <label 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="message"
                >
                  
                </label>
                <Textarea 
                  className="min-h-[120px] bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-white/40 focus:ring-0" 
                  id="message" 
                  placeholder="Cuentanos sobre tu proyecto, tu color favorito y cómo tu negocio puede cambiar el mundo" 
                  
                />
              </div>
              <Button className="" style={{ backgroundColor: '#35F099' }} type="submit">
                Enviar
              </Button>
            </form>
          </div>
          
          {/* Content Column */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-white">Agenda una reunión <span className="text-[#35F099]">sin compromiso</span></h3>
              <p className="text-gray-500 dark:text-gray-400">
                Sin compromisos, sin obligaciónes. Solo una reunión de 15 minutos para concernos mejor y responder cualquier duda que tengas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;