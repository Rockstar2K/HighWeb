'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick-theme.less';
import 'slick-carousel/slick/slick.less';

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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Proyectos recientes</h2>
        <Slider {...settings}>
          {projects.map((project) => (
            <div key={project.id} className="px-2">
              <div className="bg-white rounded-4xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 mb-4">
                <div className="h-80 w-full flex items-center justify-center overflow-hidden bg-gray-50">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="max-w-40 max-h-40 object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ProyectosSection;