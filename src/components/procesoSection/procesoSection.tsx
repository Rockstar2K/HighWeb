'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import directions from "@/assets/proceso/directions.png"
import manual from "@/assets/proceso/manual.png"
import text from "@/assets/proceso/text.png"
import { Link } from 'react-router-dom';

interface TabItem {
  id: string;
  label: string;
  title: string;
  buttonText: string;
  items: Array<{
    image: string;
    alt: string;
    text: string;
  }>;
}

const TabContent = ({ title, items, buttonText }: { title: string; items: TabItem['items']; buttonText: string }) => (
  <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-md w-full max-w-5xl mx-auto">
    <h2 className="text-gray-500 text-base sm:text-lg font-semibold text-center mb-6 sm:mb-8">
      {title}
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center text-center w-full min-w-0 px-2">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-3 sm:mb-4 shrink-0">
            <img src={item.image} alt={item.alt} className="w-full h-full object-contain"/>
          </div>
          <p className="text-[#7741EA] text-sm sm:text-base font-semibold w-full break-words">{item.text}</p>
        </div>
      ))}
    </div>

    <div className="flex justify-center">
      <Link to="/servicios">
        <Button variant="white" className="text-sm sm:text-base font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-xl shadow-md">
          {buttonText}
        </Button>
      </Link>
    </div>
  </div>
);

const ProcesoSection = () => {
  const [activeTab, setActiveTab] = useState('branding');

  const tabs: TabItem[] = [
    {
      id: 'branding',
      label: 'Branding',
      title: 'Lo que recibirás',
      buttonText: 'Cotizar',
      items: [
        { image: directions, alt: 'Estrategia', text: '3 Direcciones de marca' },
        { image: manual, alt: 'Logotipo', text: '3 Opciones de logotipo' },
        { image: text, alt: 'Manual', text: 'Manual de marca' },
      ],
    },
    {
      id: 'paginas-web',
      label: 'Páginas Web',
      title: 'Lo que recibirás',
      buttonText: 'Cotizar',
      items: [
        { image: directions, alt: 'Investigación', text: 'Investigación de usuario y funnel de ventas' },
        { image: manual, alt: 'Interfaz', text: 'Diseño de interfaz y de experiencia de usuario' },
        { image: text, alt: 'SEO', text: 'Implementación y posicionamiento SEO' },
      ],
    },
    {
      id: 'redes-sociales',
      label: 'Redes Sociales',
      title: 'Lo que recibirás',
      buttonText: 'Cotizar',
      items: [
        { image: directions, alt: 'Estrategia', text: 'Diseño de Estrategia de contenidos' },
        { image: manual, alt: 'Contenido', text: 'Creación de contenido y comunidad' },
        { image: text, alt: 'Analisis', text: 'Analisis mensual de rendimiento' },
      ],
    },
    {
      id: 'animaciones',
      label: 'Animaciones',
      title: 'Lo que recibirás',
      buttonText: 'Cotizar',
      items: [
        { image: directions, alt: 'Estrategia', text: 'Diseño de Estrategia y guionización' },
        { image: manual, alt: 'Animación', text: 'Animación personalizada' },
        { image: text, alt: 'Producción', text: 'Producción musical profesional' },
      ],
    },
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col items-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6">Nuestro Proceso</h1>
        <p className="text-gray-600 text-sm sm:text-base text-center max-w-2xl">
          Descubre cómo trabajamos para llevar tu marca al siguiente nivel con nuestro proceso creativo y profesional.
        </p>
      </div>

      <div className="w-full mb-8 sm:mb-12">
      <div className="flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base whitespace-nowrap transition-colors flex-shrink-0 ${
              activeTab === tab.id
                ? 'bg-[#7741EA]! text-white!'
                : 'bg-gray-100! text-gray-700! hover:bg-gray-200!'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>

      <div className="mt-8">
        {activeTabData && (
          <TabContent 
            title={activeTabData.title}
            items={activeTabData.items}
            buttonText={activeTabData.buttonText}
          />
        )}
      </div>
    </div>
  );
};

export default ProcesoSection;