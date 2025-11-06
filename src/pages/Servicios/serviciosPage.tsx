'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import directions from "@/assets/proceso/directions.png"
import manual from "@/assets/proceso/manual.png"
import text from "@/assets/proceso/text.png"

interface TabItem {
  id: string;
  label: string;
  title: string;
  description: string;
  price: string;
  buttonText: string;
  items: Array<{
    image: string;
    alt: string;
    text: string;
  }>;
  checkpoints: string[];
}

const TabContent = ({ title, description, price, items, buttonText, checkpoints }: TabItem) => (
  <div className="bg-white rounded-3xl p-8 shadow-md mx-auto w-[1000px]">
    <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
      {title}
    </h2>
    
    <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
      {description}
    </p>
    
    <div className="text-center mb-8">
      <span className="text-4xl font-bold text-[#7741EA]">{price}</span>
      <span className="text-gray-500 ml-2">/proyecto</span>
    </div>

    <div className="grid grid-cols-3 gap-8 mb-8">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center text-center w-full min-w-0">
          <div className="w-16 h-16 mb-4 shrink-0">
            <img src={item.image} alt={item.alt} className="w-full h-full object-contain"/>
          </div>
          <p className="text-[#7741EA] font-semibold w-full break-words">{item.text}</p>
        </div>
      ))}
    </div>

    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Qué incluye:</h3>
      <ul className="space-y-3">
        {checkpoints.map((checkpoint, index) => (
          <li key={index} className="flex items-start">
            <svg className="h-6 w-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">{checkpoint}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="flex justify-center">
      <Button className="bg-[#7741EA] hover:bg-[#6a3ac8] text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-colors">
        {buttonText}
      </Button>
    </div>
  </div>
);

const ServiciosPage = () => {
  const [activeTab, setActiveTab] = useState('branding');

  const tabs: TabItem[] = [
    {
      id: 'branding',
      label: 'Branding',
      title: 'Creación de Marca',
      description: 'Diseño de identidad de marca profesional que comunique la esencia de tu negocio',
      price: '$1,500',
      buttonText: 'Cotizar Ahora',
      items: [
        { image: directions, alt: 'Estrategia', text: '3 Direcciones de marca' },
        { image: manual, alt: 'Logotipo', text: '3 Opciones de logotipo' },
        { image: text, alt: 'Manual', text: 'Manual de marca' },
      ],
      checkpoints: [
        'Entrevista inicial y brief creativo',
        'Desarrollo de 3 propuestas de identidad',
        'Revisión y ajustes de la propuesta seleccionada',
        'Entrega de archivos en formatos digitales e impresos',
        'Soporte post-entrega por 30 días'
      ]
    },
    {
      id: 'paginas-web',
      label: 'Páginas Web',
      title: 'Desarrollo Web Profesional',
      description: 'Sitios web a medida, rápidos y optimizados para conversiones',
      price: '$2,500',
      buttonText: 'Cotizar Ahora',
      items: [
        { image: directions, alt: 'Investigación', text: 'Investigación de usuario' },
        { image: manual, alt: 'Interfaz', text: 'Diseño UI/UX' },
        { image: text, alt: 'SEO', text: 'Optimización SEO' },
      ],
      checkpoints: [
        'Análisis de competencia y objetivos',
        'Diseño de wireframes y prototipos',
        'Desarrollo responsive y multiplataforma',
        'Integración con herramientas de análisis',
        'Capacitación y documentación'
      ]
    },
    {
      id: 'redes-sociales',
      label: 'Redes Sociales',
      title: 'Gestión de Redes Sociales',
      description: 'Estrategias de contenido que generan engagement y crecimiento orgánico',
      price: '$800',
      buttonText: 'Cotizar Ahora',
      buttonVariant: 'white',
      items: [
        { image: directions, alt: 'Estrategia', text: 'Estrategia de contenidos' },
        { image: manual, alt: 'Contenido', text: 'Creación de contenido' },
        { image: text, alt: 'Analisis', text: 'Reportes mensuales' },
      ],
      checkpoints: [
        'Auditoría inicial de redes sociales',
        'Plan de contenido mensual',
        'Diseño de piezas gráficas',
        'Programación de publicaciones',
        'Informe de resultados mensual'
      ]
    },
    {
      id: 'animaciones',
      label: 'Animaciones',
      title: 'Animaciones Creativas',
      description: 'Contenido animado que cuenta la historia de tu marca',
      price: '$1,200',
      buttonText: 'Cotizar Ahora',
      items: [
        { image: directions, alt: 'Estrategia', text: 'Guion y storyboard' },
        { image: manual, alt: 'Animación', text: 'Animación 2D/3D' },
        { image: text, alt: 'Producción', text: 'Edición y sonido' },
      ],
      checkpoints: [
        'Desarrollo de concepto creativo',
        'Creación de guión y storyboard',
        'Diseño de personajes y escenarios',
        'Animación y efectos visuales',
        'Edición final y entrega en formatos solicitados'
      ]
    },
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  if (!activeTabData) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-center mb-6">Nuestro Proceso</h1>
        <p className="text-gray-600 text-center max-w-2xl">
          Descubre cómo trabajamos para llevar tu marca al siguiente nivel con nuestro proceso creativo y profesional.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-[#7741EA]! text-white!'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <TabContent {...activeTabData} />
      </div>
    </div>
  );
};

export default ServiciosPage;