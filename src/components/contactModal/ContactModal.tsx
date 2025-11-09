import React, { useState, useEffect } from 'react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-gradient-to-br from-blue-50/90 to-purple-50/90 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white/80 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md relative shadow-2xl border border-white/20 transition-all duration-300 transform ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
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
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-5">
            <div className="relative">
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
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
            className="w-full mt-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 transform hover:-translate-y-0.5 shadow-lg hover:shadow-purple-200"
          >
            Recibir propuesta
          </button>
          
          <p className="text-xs text-center text-gray-400 mt-4">
            Tus datos están seguros con nosotros. No compartiremos tu información con terceros.
          </p>
        </form>
      </div>
    </div>
  );
};
