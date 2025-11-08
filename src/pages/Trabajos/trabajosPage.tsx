import React from 'react';

// Sample work images - replace these with your actual work images
const workImages = [
  { id: 1, src: '/assets/proyectos/loyers.svg', alt: 'Work 1' },
  { id: 2, src: '/assets/proyectos/kimal.svg', alt: 'Work 2' },
  { id: 3, src: '/assets/proyectos/florida.svg', alt: 'Work 3' },
  { id: 4, src: '/assets/proyectos/obliqua.svg', alt: 'Work 4' },
  { id: 5, src: '/assets/proyectos/loyers.svg', alt: 'Work 5' },
  { id: 6, src: '/assets/proyectos/loyers.svg', alt: 'Work 6' },
];


const TrabajosPage = () => {
  return (
    <div>
      <h1 className="text-center my-8">Nuestros Trabajos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 max-w-[1200px] mx-auto">
        {workImages.map((image) => (
          <div key={image.id} className="relative w-full pb-[100%] overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-102">
            <img 
              src={process.env.PUBLIC_URL + image.src} 
              alt={image.alt}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrabajosPage;