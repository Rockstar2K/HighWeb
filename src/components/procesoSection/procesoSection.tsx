'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LottieAnimation } from '@/components/ui/lottie-animation';
import { lottiePath } from '@/lib/lottiePaths';
import { Clapperboard, PenSquare, Music2 } from 'lucide-react';

type TabIcon = React.ComponentType<{ className?: string }>;

interface TabItem {
  id: string;
  label: string;
  title: string;
  buttonText: string;
  path: string;
  items: Array<{
    lottie?: string;
    icon?: TabIcon;
    alt: string;
    text: string;
    size?: 'default' | 'large';
  }>;
}

const TabContent = ({ title, items, buttonText, path }: { title: string; items: TabItem['items']; buttonText: string; path: string }) => (
  <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-md w-full max-w-5xl mx-auto">
    <h2 className="text-gray-500 text-base sm:text-lg font-semibold text-center mb-6 sm:mb-8">
      {title}
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center text-center w-full min-w-0 px-2">
          <div className="h-32 flex items-end justify-center mb-3 sm:mb-4 shrink-0">
            {item.icon ? (
              <item.icon
                className={`text-[#7741EA] ${item.size === 'large' ? 'w-20 h-20' : 'w-14 h-14'}`}
                aria-hidden="true"
              />
            ) : (
              item.lottie && (
                <LottieAnimation
                  path={item.lottie}
                  className={item.size === 'large' ? 'w-40 h-40' : 'w-20 h-20'}
                  ariaLabel={item.alt}
                  autoplay={false}
                  scrollSync
                />
              )
            )}
          </div>
          <p className="text-[#7741EA] text-sm sm:text-base font-semibold w-full break-words min-h-[56px] flex items-center justify-center">
            {item.text}
          </p>
        </div>
      ))}
    </div>
    <div className="flex justify-center">
      <Link to={path}>
        <Button variant="white" className="text-sm sm:text-base font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-3xl! shadow-md">
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
      buttonText: 'Saber más',
      path: '/branding',
      items: [
        { lottie: lottiePath('3 direcciones de marca.json'), alt: 'Direcciones de marca', text: '3 Direcciones de marca' },
        { lottie: lottiePath('CreacionDeLogo.json'), alt: 'Opciones de logo', text: '3 Opciones de logotipo', size: 'large' },
        { lottie: lottiePath('Manual de Marca.json'), alt: 'Manual de marca', text: 'Manual de marca' },
      ],
    },
    {
      id: 'paginas-web',
      label: 'Páginas Web',
      title: 'Lo que recibirás',
      buttonText: 'Saber más',
      path: '/sitios-web',
      items: [
        { lottie: lottiePath('Investigacion de Usuario.json'), alt: 'Investigación de usuario', text: 'Investigación de usuario y funnel de ventas' },
        { lottie: lottiePath('UX.json'), alt: 'Diseño UX', text: 'Diseño de interfaz y experiencia de usuario', size: 'large' },
        { lottie: lottiePath('SEO.json'), alt: 'Posicionamiento SEO', text: 'Implementación y posicionamiento SEO' },
      ],
    },
    {
      id: 'redes-sociales',
      label: 'Redes Sociales',
      title: 'Lo que recibirás',
      buttonText: 'Saber más',
      path: '/redes-sociales',
      items: [
        { lottie: lottiePath('Target.json'), alt: 'Estrategia de contenidos', text: 'Diseño de estrategia de contenidos', size: 'large' },
        { lottie: lottiePath('Creacion de Comunidad.json'), alt: 'Comunidad', text: 'Creación de contenido y comunidad', size: 'large' },
        { lottie: lottiePath('ReporteMensual.json'), alt: 'Reporte mensual', text: 'Análisis mensual de rendimiento' },
      ],
    },
    {
      id: 'animaciones',
      label: 'Animaciones',
      title: 'Lo que recibirás',
      buttonText: 'Saber más',
      path: '/animaciones',
      items: [
        { icon: Clapperboard, alt: 'Estrategia', text: 'Diseño de estrategia y guionización', size: 'large' },
        { icon: PenSquare, alt: 'Animación personalizada', text: 'Animación personalizada' },
        { icon: Music2, alt: 'Producción musical', text: 'Producción musical profesional' },
      ],
    },
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-visible">
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
            path={activeTabData.path}
          />
        )}
      </div>

      <div className=" relative flex justify-end mr-50 ">
        <div className="bg-white rounded-3xl shadow-lg mt-30 px-6 py-5 max-w-2xl text-right text-gray-700 font-medium z-10">
          Todo lo que hacemos incluye una estrategia personalizada para tí y tus clientes.
          <br />
          Nada de logos genéricos de ChatGPT.
        </div>
        <div className="hidden md:block absolute left-40 md:left-84 top-1/2 -translate-y-1/2 w-52 h-52 pointer-events-none">
          <LottieAnimation 
          path={lottiePath('Linea3.json')} 
          className="w-80 h-50" 
          loop={false}
          autoplay={false}
          scrollSync
          />
        </div>
      </div>
    </div>
  );
};

export default ProcesoSection;
