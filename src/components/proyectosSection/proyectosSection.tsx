'use client';

import React from 'react';
import ayro from '@/assets/proyectos/ayro.svg';
import obliqua from '@/assets/proyectos/obliqua.svg';
import florida from '@/assets/proyectos/florida.svg';
import kimal from '@/assets/proyectos/kimal.svg';
import loyers from '@/assets/proyectos/loyers.svg';
import { Link } from 'react-router-dom';

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
  {
    id: 6,
    type: 'cta' as const,
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
          {projects.map((project) => {
            if (project.type === 'cta') {
              return (
                <div
                  key="cta-ver-todos"
                  className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-[#35F099]/15 via-white to-[#7741EA]/12 shadow-[0_10px_35px_rgba(15,23,42,0.08)] flex items-center justify-center p-8 sm:p-10"
                >
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
                  <div className="relative text-center space-y-4">
                    <p className="text-sm uppercase tracking-[0.18em] text-gray-500">Portafolio</p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Ver todos los proyectos</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Explora más casos, resultados y el impacto que hemos creado junto a nuestros clientes.
                    </p>
                    <Link
                      to="/trabajos"
                      className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#7741EA] text-white! font-semibold shadow-[0_10px_30px_rgba(119,65,234,0.25)] hover:bg-[#6434c7] transition-all duration-300"
                    >
                      Ver portafolio completo
                    </Link>
                  </div>
                </div>
              );
            }

            const isObliqua = project.title === 'Obliqua';

            return (
              <div
                key={`${project.id}-${project.title}`}
                className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_35px_rgba(15,23,42,0.08)] border border-gray-100 flex flex-col"
              >
                <div className="h-48 sm:h-56 md:h-64 flex items-center justify-center bg-gray-50 p-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105 ${
                      isObliqua ? 'max-h-20 sm:max-h-24 md:max-h-28' : ''
                    }`}
                  />
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{project.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 flex-1">{project.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProyectosSection;
