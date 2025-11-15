'use client';

import React from 'react';
import ayro from '@/assets/proyectos/ayro.svg';
import obliqua from '@/assets/proyectos/obliqua.svg';
import florida from '@/assets/proyectos/florida.svg';
import kimal from '@/assets/proyectos/kimal.svg';
import loyers from '@/assets/proyectos/loyers.svg';

const projects = [
  {
    id: 1,
    title: 'Loyers',
    description: 'Una agencia legal con la ambición de cambiarlo todo en el mundo de las leyes.',
    image: loyers,
  },
  {
    id: 2,
    title: 'Hoteles Kimal',
    description: 'Una cadena de hoteles en que busca un turismo ético y conectado con la naturaleza que la rodea.',
    image: kimal,
  },
  {
    id: 3,
    title: 'Florida y tú',
    description: 'Florida y tú ofrece la oportunidad de viajar o emprender en los Estados Unidos sin fricciones.',
    image: florida,
  },
  {
    id: 1,
    title: 'Ayro',
    description: 'Una start-up de robótica que ofrece limpieza automática de plantas de paneles solares.',
    image: ayro,
  },
  {
    id: 2,
    title: 'Obliqua',
    description: 'La decentralización y la IA revolucionarán el futuro. Obliqua ayuda a negocios a no quedarse atrás.',
    image: obliqua,
  },
 
];

const ProyectosSection = () => {
  return (
    <section className="relative py-8 sm:py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          Proyectos recientes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={`${project.id}-${project.title}`}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_35px_rgba(15,23,42,0.08)] border border-gray-100 flex flex-col"
            >
              <div className="h-48 sm:h-56 md:h-64 flex items-center justify-center bg-gray-50 p-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{project.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 flex-1">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProyectosSection;
