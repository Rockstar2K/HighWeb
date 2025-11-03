'use client';

import React, { useState } from 'react';

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
          <div className="p-6 bg-white rounded-lg shadow min-h-[50vh] content-center">
            <h3 className="text-xl font-semibold mb-4">Branding</h3>
            <p>Contenido sobre nuestros servicios de branding...</p>
          </div>
        );
      case 'paginas-web':
        return (
          <div className="p-6 bg-white rounded-lg shadow min-h-[50vh] content-center">
            <h3 className="text-xl font-semibold mb-4">Páginas Web</h3>
            <p>Contenido sobre desarrollo de páginas web...</p>
          </div>
        );
      case 'redes-sociales':
        return (
          <div className="p-6 bg-white rounded-lg shadow min-h-[50vh] content-center">
            <h3 className="text-xl font-semibold mb-4">Redes Sociales</h3>
            <p>Contenido sobre gestión de redes sociales...</p>
          </div>
        );
      case 'animaciones':
        return (
          <div className="p-6 bg-white rounded-lg shadow min-h-[50vh] content-center">
            <h3 className="text-xl font-semibold mb-4">Animaciones</h3>
            <p>Contenido sobre creación de animaciones...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-[10%] mb-[10%]">
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