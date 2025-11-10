import React from 'react';

// Dynamically import all images from the trabajos folder
const imageModules = import.meta.glob('@/assets/trabajos/*.{png,jpg,jpeg,JPG}', { eager: true });

// Convert the modules object to an array of image data
const workImages = Object.entries(imageModules).map(([path, module], index) => {
  const fileName = path.split('/').pop()?.replace(/\.(png|jpg|jpeg|JPG)$/, '') || '';
  return {
    id: index + 1,
    src: (module as { default: string }).default,
    alt: fileName,
  };
});


const TrabajosPage = () => {
  return (
    <div className="w-screen overflow-x-hidden mt-[15vh]">
      <h1 className="text-center my-8">Nuestros Trabajos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
        {workImages.map((image) => (
          <div key={image.id} className="relative w-full aspect-square overflow-hidden cursor-pointer bg-gray-100 border-1 border-white group">
            <img 
              src={image.src} 
              alt={image.alt}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectFit: 'cover' }}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity duration-300 z-10"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrabajosPage;