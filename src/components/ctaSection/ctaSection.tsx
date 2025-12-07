import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { handleFormSubmit } from '../../lib/formUtils';
import { LottieAnimation } from '@/components/ui/lottie-animation';
import { lottiePath } from '@/lib/lottiePaths';

const CTASection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [submitMessage, setSubmitMessage] = useState('');
  return (
    <section className="w-full py-28 md:py-24 lg:py-48 bg-black overflow-x-hidden relative shadow-[0_0_100px_rgba(119,65,234,1)]">
      <div className="pointer-events-none absolute hidden lg:block top-6 left-10 w-48 h-48 opacity-80">

      </div>
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
            <form 
              action="https://formspree.io/f/movyabay" 
              method="POST"
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setSubmitStatus(null);
                
                const form = e.target as HTMLFormElement;
                const { success, message } = await handleFormSubmit(form, {
                  formName: 'global_submissions',
                  onSuccess: () => {
                    setSubmitStatus('success');
                    form.reset();
                  },
                  onError: () => {
                    setSubmitStatus('error');
                  }
                });
                
                if (message) {
                  setSubmitMessage(message);
                }
                
                if (!success) {
                  setSubmitStatus('error');
                }
                
                setIsSubmitting(false);
              }}
            >
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
                  name="nombre"
                  required
                />
              </div>
              <div className="space-y-2">
                <label 
                  className="bg-white/10 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                 
                </label>
                <Input 
                  id="email" 
                  name="email"
                  placeholder="Correo electrónico" 
                  type="email" 
                  required
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
                  name="mensaje"
                  required
                  placeholder="Cuentanos sobre tu proyecto, tu color favorito y cómo tu negocio puede cambiar el mundo" 
                />
                {/* Honeypot field - hidden from users but visible to bots */}
                <div className="hidden">
                  <label htmlFor="website-cta">No llenar este campo</label>
                  <input type="text" id="website-cta" name="website" tabIndex={-1} />
                </div>
              </div>
              {submitStatus && (
                <div className={`p-3 rounded-lg text-sm ${
                  submitStatus === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitMessage || (submitStatus === 'success' 
                    ? '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.' 
                    : 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.')}
                </div>
              )}
              <Button 
                className="w-full bg-[#5E48F2]! text-white font-bold hover:bg-gradient-to-r hover:from-[#5E48F2] hover:to-[#35F099] transition-all duration-300" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
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
