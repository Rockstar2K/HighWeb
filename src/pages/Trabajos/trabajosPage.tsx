import React from 'react';

// Sample work images - replace these with your actual work images
const workImages = [
  { id: 1, src: 'src/assets/proyectos/loyers.svg', alt: 'Work 1' },
  { id: 2, src: 'src/assets/proyectos/kimal.svg', alt: 'Work 2' },
  { id: 3, src: 'src/assets/proyectos/florida.svg', alt: 'Work 3' },
  { id: 4, src: 'src/assets/proyectos/obliqua.svg', alt: 'Work 4' },
  { id: 5, src: 'src/assets/proyectos/ayro.svg', alt: 'Work 5' },
];


const TrabajosPage = () => {
  return (
    <div className="w-screen overflow-x-hidden mt-[15vh]">
      <h1 className="text-center my-8">Nuestros Trabajos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
        {workImages.map((image) => (
          <div key={image.id} className="relative w-full aspect-square overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center border-1 border-white">
            <img 
              src={image.src} 
              alt={image.alt}
              className="max-w-full max-h-full object-contain p-4 opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrabajosPage;