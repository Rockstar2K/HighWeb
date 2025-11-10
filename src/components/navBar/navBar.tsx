import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import highLogo from '@/assets/highLogo.png';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="backdrop-blur-md bg-white/50 shadow w-full fixed top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center h-full ">
            <img src={highLogo} alt="Logo" className="h-full w-auto object-contain max-w-[100px] max-h-[60px]" /> 
          </Link>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/servicios" 
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Servicios
            </Link>
            <Link 
              to="/trabajos" 
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Trabajos
            </Link>
            <Link 
              to="/contacto"
              onClick={() => setIsOpen(false)}
            >
              <Button variant="purple">Contáctanos</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white! shadow-lg">
            <Link 
              to="/servicios" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Servicios
            </Link>
            <Link 
              to="/trabajos" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Trabajos
            </Link>
            <Link 
              to="/contacto" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white! hover:bg-blue-700 text-center"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;