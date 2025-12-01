import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { handleFormSubmit } from '@/lib/formUtils';
import { ShapeGridBackground } from '@/components/decorations/shapeGridBackground';

// Add Font Awesome CSS
const addFontAwesome = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
  link.integrity = 'sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==';
  link.crossOrigin = 'anonymous';
  link.referrerPolicy = 'no-referrer';
  document.head.appendChild(link);
  
  return () => {
    document.head.removeChild(link);
  };
};

const ContactoPage = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [submitMessage, setSubmitMessage] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const removeFontAwesome = addFontAwesome();
    return () => removeFontAwesome();
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
        cancelAnimationFrame(frame);
      }
      frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const form = e.target as HTMLFormElement;
    
    try {
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
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Hubo un error inesperado. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={sectionRef} className="relative z-0 min-h-screen w-full overflow-hidden mt-[15vh]">
      <ShapeGridBackground 
        scrollProgress={scrollProgress}
        className="opacity-100"
        hiddenColumns={[1]}
      />
      <div className="absolute inset-0 bg-white/5 pointer-events-none" aria-hidden />
      <div className="relative z-10 container mx-auto py-12 px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-10 items-start">
          <div className="space-y-10 lg:col-span-4">
            <div className="space-y-4 text-center lg:text-left">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Contacto</p>
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                Conversemos sobre tu próximo proyecto
              </h1>
              <p className="text-gray-600 max-w-md">
                Estamos listos para construir tu marca, diseñar tu sitio o llevar tus redes sociales al siguiente nivel.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start space-x-6">
              <a
                href="https://www.instagram.com/highdesign.cl"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-3xl"></i>
              </a>
              <a
                href="https://www.behance.net/natnortega"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Behance"
              >
                <i className="fab fa-behance text-3xl"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/high-design-cl/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-3xl"></i>
              </a>
            </div>

            <div className="space-y-6 text-left">
              <div className="flex items-start space-x-4">
                <i className="fas fa-map-marker-alt text-[#35F099] text-2xl mt-1"></i>
                <div>
                  <p className="text-sm uppercase tracking-wide text-gray-500">Ubicación</p>
                  <p className="text-gray-800">Buenos Aires, Argentina</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <i className="fas fa-phone text-[#35F099] text-2xl mt-1"></i>
                <div>
                  <p className="text-sm uppercase tracking-wide text-gray-500">Teléfono</p>
                  <p className="text-gray-800">+54 11 1234-5678</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <i className="fas fa-envelope text-[#35F099] text-2xl mt-1"></i>
                <div>
                  <p className="text-sm uppercase tracking-wide text-gray-500">Email</p>
                  <p className="text-gray-800">info@highdesign.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] border border-white/60">
              <h3 className="text-2xl font-semibold text-left mb-6 text-gray-900">Contáctanos por aquí</h3>
              <form action="https://formspree.io/f/xvgdpypj" method="POST" onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Honeypot field - hidden from users but visible to bots */}
            <div className="hidden">
              <label htmlFor="website-contact">No llenar este campo</label>
              <input type="text" id="website-contact" name="website" tabIndex={-1} />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tu nombre"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tu mensaje..."
              ></textarea>
            </div>
            
            {submitStatus && (
              <div className={`p-4 rounded-lg ${
                submitStatus === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submitMessage || (submitStatus === 'success' 
                  ? '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.' 
                  : 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.')}
              </div>
            )}
            
            <div className="text-left">
              <Button
                type="submit"
                variant="purple"
                disabled={isSubmitting}
                className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </Button>
            </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactoPage;
