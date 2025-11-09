import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { handleFormSubmit } from '@/lib/formUtils';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const removeFontAwesome = addFontAwesome();
    return () => removeFontAwesome();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const form = e.target as HTMLFormElement;
    
    try {
      const { success, message } = await handleFormSubmit(form, {
        formName: 'contacto',
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

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 mt-[15vh]">
      <div className="max-w-4xl mx-auto">
        {/* Contact Title */}
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Contacto</h1>
        
        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-12">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <i className="fab fa-instagram text-3xl"></i>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <i className="fab fa-facebook text-3xl"></i>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <i className="fab fa-twitter text-3xl"></i>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <i className="fab fa-linkedin text-3xl"></i>
          </a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-12 mb-16">
          <div className="flex flex-col items-center space-y-2">
            <i className="fas fa-map-marker-alt text-[#35F099] text-3xl"></i>
            <span className="text-gray-700 text-center">Buenos Aires, Argentina</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <i className="fas fa-phone text-[#35F099] text-3xl"></i>
            <span className="text-gray-700">+54 11 1234-5678</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <i className="fas fa-envelope text-[#35F099] text-3xl"></i>
            <span className="text-gray-700">info@highdesign.com</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">Contáctanos por aquí</h3>
          <form action="https://formspree.io/f/xvgdpypj" method="POST" onSubmit={handleSubmit} className="space-y-6">
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
            
            <div className="text-center">
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
  );
};

export default ContactoPage;