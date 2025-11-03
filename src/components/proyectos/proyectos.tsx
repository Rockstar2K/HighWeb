'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick-theme.less';
import 'slick-carousel/slick/slick.less';

const projects = [
  {
    id: 1,
    title: 'Loyers',
    description: 'Descripción del proyecto 1 con detalles sobre el trabajo realizado y tecnologías utilizadas.',
    image: '/images/projects/project1.jpg',
  },
  {
    id: 2,
    title: 'Hoteles Kimal',
    description: 'Descripción del proyecto 2 con detalles sobre el trabajo realizado y tecnologías utilizadas.',
    image: '/images/projects/project2.jpg',
  },
  {
    id: 3,
    title: 'Florida y tú',
    description: 'Descripción del proyecto 3 con detalles sobre el trabajo realizado y tecnologías utilizadas.',
    image: '/images/projects/project3.jpg',
  },
  {
    id: 1,
    title: 'Ayro',
    description: 'Descripción del proyecto 1 con detalles sobre el trabajo realizado y tecnologías utilizadas.',
    image: '/images/projects/project1.jpg',
  },
  {
    id: 2,
    title: 'Obliqua',
    description: 'Descripción del proyecto 2 con detalles sobre el trabajo realizado y tecnologías utilizadas.',
    image: '/images/projects/project2.jpg',
  },
 
];

const Proyectos = () => {
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
        <h2 className="text-3xl font-bold text-center mb-12">Proyectos recientes</h2>
        <Slider {...settings}>
          {projects.map((project) => (
            <div key={project.id} className="px-2">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
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

export default Proyectos;