import React from 'react';
import loyers from '@/assets/proyectos/loyers.svg';
import kimal from '@/assets/proyectos/kimal.svg';
import florida from '@/assets/proyectos/florida.svg';
import obliqua from '@/assets/proyectos/obliqua.svg';
import ayro from '@/assets/proyectos/ayro.svg';

// Sample work images - replace these with your actual work images
const workImages = [
  { id: 1, src: loyers, alt: 'Work 1' },
  { id: 2, src: kimal, alt: 'Work 2' },
  { id: 3, src: florida, alt: 'Work 3' },
  { id: 4, src: obliqua, alt: 'Work 4' },
  { id: 5, src: ayro, alt: 'Work 5' },
];


const TrabajosPage = () => {
  return (
    <div className="w-screen overflow-x-hidden mt-[15vh]">
      <h1 className="text-center my-8">Nuestros Trabajos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
        {workImages.map((image) => (
          <div key={image.id} className="relative w-full aspect-square overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center border-1 border-white group">
            <img 
              src={image.src} 
              alt={image.alt}
              className="max-w-full max-h-full object-contain p-4"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity duration-300 z-10"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrabajosPage;