'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick-theme.less';
import 'slick-carousel/slick/slick.less';
import './proyectosSection.css';

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
    autoplaySpeed: 4000,
    dotsClass: 'slick-dots',
    arrows: false,
    centerMode: false,
    centerPadding: '0',
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '20px',
        }
      }
    ]
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">Proyectos recientes</h2>
        <div className="mx-[-8px]">
          <Slider {...settings}>
            {projects.map((project) => (
              <div key={`${project.id}-${project.title}`} className="px-2">
                <div className="project-card">
                  <div className="h-48 sm:h-64 md:h-80 w-full flex items-center justify-center overflow-hidden bg-gray-50 p-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="max-w-[80%] max-h-[80%] sm:max-w-40 sm:max-h-40 object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">{project.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 flex-1">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ProyectosSection;