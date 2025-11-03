'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import directions from "@/assets/proceso/directions.png"
import manual from "@/assets/proceso/manual.png"
import text from "@/assets/proceso/text.png"

const Proceso = () => {
  const [activeTab, setActiveTab] = useState('branding');

  const tabs = [
    { id: 'branding', label: 'Branding' },
    { id: 'paginas-web', label: 'Páginas Web' },
    { id: 'redes-sociales', label: 'Redes Sociales' },
    { id: 'animaciones', label: 'Animaciones' },
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case 'branding':
        return (
          <div className="bg-white rounded-3xl p-8 shadow-md  mx-auto w-full">
        <h2 className="text-gray-500 text-lg font-semibold text-center mb-8">
          Lo que recibirás
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center text-center">
            <img src={directions} alt="Estrategia" className="w-16 h-16 mb-4"/>
            <p className="text-purple-600 font-semibold">3 direcciones de marca</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img src={manual} alt="Animación" className="w-16 h-16 mb-4"/>
            <p className="text-purple-600 font-semibold">3 opciones de logotipo</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img src={text} alt="Producción musical" className="w-16 h-16 mb-4"/>
            <p className="text-purple-600 font-semibold">Manual de marca</p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="accent" className="text-base font-semibold px-8 py-3 rounded-xl shadow-md">
            Cotizar
          </Button>
        </div>
      </div>
        );
      case 'paginas-web':
        return (
        <div className="bg-white rounded-3xl p-8 shadow-md  mx-auto w-full">
        <h2 className="text-gray-500 text-lg font-semibold text-center mb-8">
          Lo que recibirás
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center text-center">
            <img src={directions} alt="Estrategia" className="w-16 h-16 mb-4"/>
            <p className="text-purple-600 font-semibold">Diseño de Estrategia y guionización</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img src={manual} alt="Animación" className="w-16 h-16 mb-4"/>
            <p className="text-purple-600 font-semibold">Animación personalizada</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img src={text} alt="Producción musical" className="w-16 h-16 mb-4"/>
            <p className="text-purple-600 font-semibold">Producción musical profesional</p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="accent" className="text-base font-semibold px-8 py-3 rounded-xl shadow-md">
            Cotizar
          </Button>
        </div>
      </div>

        );
      case 'redes-sociales':
        return (
         <div className="bg-white rounded-3xl p-8 shadow-md  mx-auto w-full">
        <h2 className="text-gray-500 text-lg font-semibold text-center mb-8">
          Lo que recibirás
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center text-center">
            <img src={directions} alt="Estrategia" className="w-16 h-16 mb-4"/>
            <p className="text-purple-600 font-semibold">Diseño de Estrategia y guionización</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img src={manual} alt="Animación" className="w-16 h-16 mb-4"/>
            <p className="text-purple-600 font-semibold">Animación personalizada</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img src={text} alt="Producción musical" className="w-16 h-16 mb-4"/>
            <p className="text-purple-600 font-semibold">Producción musical profesional</p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="accent" className="text-base font-semibold px-8 py-3 rounded-xl shadow-md">
            Cotizar
          </Button>
        </div>
      </div>
        );
      case 'animaciones':
        return (
         <div className="bg-white rounded-3xl p-8 shadow-md  mx-auto w-full">
        <h2 className="text-gray-500 text-lg font-semibold text-center mb-8">
          Lo que recibirás
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center text-center">
            <img src={directions} alt="Estrategia" className="w-16 h-16 mb-4"/>
            <p className="text-purple-600 font-semibold">Diseño de Estrategia y guionización</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img src={manual} alt="Animación" className="w-16 h-16 mb-4"/>
            <p className="text-purple-600 font-semibold">Animación personalizada</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img src={text} alt="Producción musical" className="w-16 h-16 mb-4"/>
            <p className="text-purple-600 font-semibold">Producción musical profesional</p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="accent" className="text-base font-semibold px-8 py-3 rounded-xl shadow-md">
            Cotizar
          </Button>
        </div>
      </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-24 py-8">
      <h2 className="text-4xl font-bold text-center mb-8">
        Nuestro proceso
      </h2>
      <div className="flex flex-wrap border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="min-h-[200px]">
        {getTabContent()}
      </div>
    </div>
  );
};

export default Proceso;