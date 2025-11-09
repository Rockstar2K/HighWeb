import React, { useState, useEffect } from 'react';
import { handleFormSubmit } from '../../lib/formUtils';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, title }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    organizacion: '',
    sitioWeb: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay to allow the modal to mount before animating
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (submitStatus === 'success') {
      setIsSuccess(true);
      // Auto-close after 10 seconds on success
      timer = setTimeout(() => {
        onClose();
        // Reset success state after closing
        setTimeout(() => setIsSuccess(false), 300); // Wait for animation to complete
      }, 10000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [submitStatus, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const form = e.target as HTMLFormElement;
    
    const { success, message } = await handleFormSubmit(form, {
      formName: 'contact',
      onSuccess: () => {
        setSubmitStatus('success');
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          organizacion: '',
          sitioWeb: ''
        });
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
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${
        isSuccess 
          ? 'bg-gradient-to-br from-green-50/90 to-emerald-50/90' 
          : 'bg-gradient-to-br from-blue-50/90 to-purple-50/90'
      }`}
      onClick={onClose}
    >
      <div 
        className={`backdrop-blur-lg rounded-2xl p-8 w-full max-w-md relative shadow-2xl border transition-all duration-300 transform ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } ${
          isSuccess 
            ? 'bg-green-50/90 border-green-200' 
            : 'bg-white/80 border-white/20'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <button 
          className="absolute -top-4 -right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-gray-800 text-gray-900 hover:bg-gray-100 hover:border-red-500 hover:text-red-600 transition-all shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 z-10"
          onClick={onClose}
          aria-label="Cerrar"
        >
          x
        </button>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-gray-500 text-sm mt-2">Completa el formulario y nos pondremos en contacto contigo</p>
        </div>
        
        <form 
          action="https://formspree.io/f/mldarzqp" 
          method="POST" 
          onSubmit={handleSubmit}
          className="space-y-5 relative"
          noValidate
        >
          {/* Honeypot field - hidden from users but visible to bots */}
          <div className="hidden">
            <label htmlFor="website">No llenar este campo</label>
            <input type="text" id="website" name="website" tabIndex={-1} />
          </div>
          {submitStatus && (
            <div 
              className={`p-4 rounded-xl mb-6 ${
                submitStatus === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {submitStatus === 'success' ? (
                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">
                    {submitMessage}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-5">
            <div className="relative">
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={100}
                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 placeholder-transparent peer"
                placeholder=" "
              />
              <label 
                htmlFor="nombre" 
                className="absolute left-3 -top-2.5 bg-white px-1.5 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-purple-600 peer-focus:text-sm"
              >
                Nombre
              </label>
            </div>
            
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={100}
                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 placeholder-transparent peer"
                placeholder=" "
              />
              <label 
                htmlFor="email" 
                className="absolute left-3 -top-2.5 bg-white px-1.5 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-purple-600 peer-focus:text-sm"
              >
                Email
              </label>
            </div>
            
            <div className="relative">
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                pattern="[0-9+\-\s()]{8,20}"
                title="Por favor ingresa un número de teléfono válido"
                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 placeholder-transparent peer"
                placeholder=" "
              />
              <label 
                htmlFor="telefono" 
                className="absolute left-3 -top-2.5 bg-white px-1.5 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-purple-600 peer-focus:text-sm"
              >
                Teléfono
              </label>
            </div>
            
            <div className="relative">
              <input
                type="text"
                id="organizacion"
                name="organizacion"
                value={formData.organizacion}
                onChange={handleChange}
                maxLength={100}
                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 placeholder-transparent peer"
                placeholder=" "
              />
              <label 
                htmlFor="organizacion" 
                className="absolute left-3 -top-2.5 bg-white px-1.5 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-purple-600 peer-focus:text-sm"
              >
                Organización (opcional)
              </label>
            </div>
            
            <div className="relative">
              <input
                type="url"
                id="sitioWeb"
                name="sitioWeb"
                value={formData.sitioWeb}
                onChange={handleChange}
                pattern="https?://.+"
                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 placeholder-transparent peer"
                placeholder=" "
              />
              <label 
                htmlFor="sitioWeb" 
                className="absolute left-3 -top-2.5 bg-white px-1.5 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-purple-600 peer-focus:text-sm"
              >
                Sitio Web (opcional)
              </label>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting || submitStatus === 'success'}
            className={`w-full mt-2 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transform ${
              isSubmitting || submitStatus === 'success' 
                ? 'opacity-70 cursor-not-allowed ' 
                : 'hover:-translate-y-0.5 hover:shadow-purple-200 hover:from-purple-600 hover:to-blue-600'
            } ${
              submitStatus === 'success'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-500 hover:to-emerald-500 focus:ring-green-300'
                : 'bg-gradient-to-r from-purple-500 to-blue-500 focus:ring-purple-300'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </div>
            ) : submitStatus === 'success' ? '¡Mensaje Enviado!' : 'Recibir propuesta'}
          </button>
          
          <p className="text-xs text-center text-gray-400 mt-4">
            Tus datos están seguros con nosotros. No compartiremos tu información con terceros.
          </p>
        </form>
      </div>
    </div>
  );
};
