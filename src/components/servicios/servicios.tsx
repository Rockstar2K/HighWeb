import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const services = [
  {
    title: 'Branding',
    description: 'Diseñamos contigo la marca de tus sueños basados en un proceso de estrategia único en Chile.',
    icon: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png',
    buttonText: 'Saber más'
  },
  {
    title: 'Páginas Web',
    description: 'Diseño y desarrollo de páginas web modernas y atractivas que se adaptan a todos los dispositivos.',
    icon: 'https://cdn-icons-png.flaticon.com/512/3242/3242257.png',
    buttonText: 'Saber más'
  },
  {
    title: 'Redes sociales',
    description: 'Diseño y desarrollo de páginas web modernas y atractivas que se adaptan a todos los dispositivos.',
    icon: 'https://cdn-icons-png.flaticon.com/512/1903/1903162.png',
    buttonText: 'Saber más'
  },
  {
    title: 'Animaciones',
    description: 'Animaciones para tus proyectos web y redes sociales.',
    icon: 'https://cdn-icons-png.flaticon.com/512/2933/2933245.png',
    buttonText: 'Saber más'
  }
];

const Servicios = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-4">Servicios</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Soluciones profesionales para potenciar tu presencia digital</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-4xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
                <Button variant="outline" className="group mx-auto mt-auto">
                  {service.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Servicios;