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
  buttonText: string;
  items: Array<{
    image: string;
    alt: string;
    text: string;
  }>;
}

const TabContent = ({ title, items, buttonText }: { title: string; items: TabItem['items']; buttonText: string }) => (
  <div className="bg-white rounded-3xl p-8 shadow-md mx-auto w-[1000px]">
    <h2 className="text-gray-500 text-lg font-semibold text-center mb-8">
      {title}
    </h2>

    <div className="grid grid-cols-3 gap-8 mb-8">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center text-c enter w-full min-w-0">
          <div className="w-16 h-16 mb-4 shrink-0">
            <img src={item.image} alt={item.alt} className="w-full h-full object-contain"/>
          </div>
          <p className="text-[#7741EA] font-semibold w-full break-words">{item.text}</p>
        </div>
      ))}
    </div>

    <div className="flex justify-center">
      <Button variant="white" className="text-base font-semibold px-8 py-3 rounded-xl shadow-md">
        {buttonText}
      </Button>
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
                : 'bg-gray-100! text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
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