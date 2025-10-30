import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const services = [
  {
    title: 'Diseño Web',
    description: 'Creamos sitios web modernos y atractivos que se adaptan a todos los dispositivos.',
    icon: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png',
    buttonText: 'Saber más'
  },
  {
    title: 'Desarrollo a Medida',
    description: 'Soluciones personalizadas para satisfacer las necesidades específicas de tu negocio.',
    icon: 'https://cdn-icons-png.flaticon.com/512/3242/3242257.png',
    buttonText: 'Ver proyectos'
  },
  {
    title: 'Marketing Digital',
    description: 'Estrategias efectivas para aumentar tu presencia en línea y llegar a más clientes.',
    icon: 'https://cdn-icons-png.flaticon.com/512/1903/1903162.png',
    buttonText: 'Conocer más'
  },
  {
    title: 'Soporte Técnico',
    description: 'Asistencia profesional para resolver cualquier problema técnico de manera rápida.',
    icon: 'https://cdn-icons-png.flaticon.com/512/2933/2933245.png',
    buttonText: 'Contactar'
  }
];

const Servicios = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Soluciones profesionales para potenciar tu presencia digital</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6 flex flex-col items-center text-center">
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
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Button variant="outline" className="group mx-auto">
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