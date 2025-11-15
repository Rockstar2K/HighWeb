import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import branding from '@/assets/servicios/branding.png';
import web from '@/assets/servicios/web.png';
import redes from '@/assets/servicios/redes.png';
import animaciones from '@/assets/servicios/animaciones.png';

const services = [
  {
    title: 'Branding',
    description: 'Diseñamos contigo la marca de tus sueños basados en un proceso de estrategia único en Chile.',
    icon: branding,
    buttonText: 'Saber más'
  },
  {
    title: 'Páginas Web',
    description: 'Diseño y desarrollo de páginas web modernas y atractivas que se adaptan a todos los dispositivos.',
    icon: web,
    buttonText: 'Saber más'
  },
  {
    title: 'Redes sociales',
    description: 'Diseño y desarrollo de páginas web modernas y atractivas que se adaptan a todos los dispositivos.',
    icon: redes,
    buttonText: 'Saber más'
  },
  {
    title: 'Animaciones',
    description: 'Animaciones para tus proyectos web y redes sociales.',
    icon: animaciones,
    buttonText: 'Saber más'
  }
];

const ServiciosSection = () => {
  return (
    <section className="py-16 z-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-4">Servicios</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Soluciones profesionales para potenciar tu presencia digital</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-4xl shadow-md overflow-hidden hover:shadow-[0_0_20px_rgba(119,65,234,0.2)] transition-shadow duration-300"
            >
              <div className="p-6 h-full flex flex-col items-center text-center">
                <div className="mb-4 flex justify-center w-full">
                  <img 
                    src={service.icon} 
                    alt={service.title}
                    className="h-16 w-16 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://via.placeholder.com/64';
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 w-full">{service.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                <Link to="/servicios">
                  <Button variant="green" className="group mx-auto mt-auto">
                    {service.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiciosSection;
