import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import highLogo from '/highDesignLogo.svg';
import { Link } from 'react-router-dom';

type NavLink = {
  label: string;
  to: string;
  disabled?: boolean;
};

const NAV_LINKS: NavLink[] = [
  { label: 'Servicios', to: '/servicios' },
  { label: 'Trabajo Destacado', to: '/trabajos' },
];

const GRID_TEMPLATE = {
  gridTemplateColumns: 'repeat(9, 1fr)',
  gridTemplateRows: '1fr',
} as React.CSSProperties;

const MID_LINK_ALIGNMENT = ['text-center', 'text-center', 'text-center'] as const;

const SHAPE_SIZE = 150;

const NAV_SHAPES = [
  { id: 'servicios-shape', column: '4 / span 2', borderRadius: '0 65px 0 65px', justify: 'center' as const },
  { id: 'whatsapp-shape', column: '8 / span 1', borderRadius: '65px 0 65px 0', justify: 'center' as const },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/70 backdrop-blur-2xl border-b border-white/60 ' : 'bg-transparent'
      }`}
      style={{ color: '#000' }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-1">
        <div className="w-full">
          <div className="flex items-center justify-between h-16 lg:hidden">
            <Link to="/" className="flex items-center h-full">
              <img
                src={highLogo}
                alt="High Design"
                className="h-full w-auto object-contain max-w-[100px]"
              />
            </Link>
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-black focus:outline-none bg-grey-500!"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div
            className={`relative hidden lg:block transition-all duration-500 ${
              isScrolled ? 'h-[110px]' : 'h-[150px]'
            }`}
          >
            {!isScrolled && (
              <div
                className="absolute inset-0 hidden lg:grid pointer-events-none z-0"
                style={{ ...GRID_TEMPLATE }}
              >
                {NAV_SHAPES.map((shape) => (
                  <div
                    key={shape.id}
                    className={`relative flex items-center ${
                      shape.justify === 'end' ? 'justify-end' : 'justify-start'
                    }`}
                    style={{ gridColumn: shape.column }}
                  >
                    <div
                      className="h-full w-full max-w-[180px] max-h-[150px] aspect-square"
                      style={{
                        width: `${SHAPE_SIZE}px`,
                        borderRadius: shape.borderRadius,
                        boxShadow: '0 45px 60px rgba(15, 23, 42, 0.12)',
                        background:
                          'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(240,240,240,0.9))',
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            <div
              className={`relative z-10 grid h-full grid-cols-9 items-center justify-items-center text-sm text-black transition-all duration-300 ${
                isScrolled ? 'rounded-3xl bg-white/80 backdrop-blur-xl border border-white/70 shadow-xl px-4' : ''
              }`}
              style={{ ...GRID_TEMPLATE, color: '#000' }}
            >
              <Link
                to="/"
                className="col-start-2 col-span-1 flex items-center justify-center h-full"
                style={{ color: '#000' }}
              >
                <div className="transform transition-transform duration-300 hover:scale-105">
                  <img
                    src={highLogo}
                    alt="High Design"
                    className="h-[80px] w-auto object-contain"
                  />
                </div>
              </Link>

              <Link
                to="/servicios"
                className="col-start-4 flex items-center justify-center text-base font-medium text-black group relative"
                style={{ color: '#000' }}
              >
                <span className="relative group-hover:text-[#7741EA]">
                  Servicios
                  <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-[#7741EA] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>

              <Link
                to="/trabajos"
                className="col-start-5 flex items-center justify-center text-base font-medium text-black group relative"
                style={{ color: '#000' }}
              >
                <span className="relative group-hover:text-[#7741EA]">
                  Trabajo Destacado
                  <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-[#7741EA] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>

              <Link
                to="/contacto"
                className="col-start-6 flex items-center justify-center text-base font-semibold text-black py-2 group relative"
                style={{ color: '#000' }}
              >
                <span className="relative group-hover:text-[#7741EA] inline-flex flex-col items-center">
                  Contáctanos
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7741EA] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>

              <a
                href="https://wa.me/56985967414"
                target="_blank"
                rel="noopener noreferrer"
                className="col-start-8 inline-flex h-12 w-12 items-center justify-center rounded-full hover:shadow-md transition-all duration-300 hover:bg-green-50"
                style={{ color: '#35F099' }}
                aria-label="Enviar mensaje por WhatsApp"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white! shadow-lg">
          <div className="px-4 py-4 space-y-2">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-slate-100"
              style={{ color: '#000' }}
            >
              Home
            </Link>
            {NAV_LINKS.map((link) =>
              link.disabled ? (
                <span
                  key={link.label}
                  className="block px-3 py-2 rounded-md text-base font-medium text-black"
                  style={{ color: '#000' }}
                >
                  {link.label}
                </span>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-slate-100"
                  style={{ color: '#000' }}
                >
                  {link.label}
                </Link>
              ),
            )}
            <Link
              to="/contacto"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-semibold text-center text-white! bg-purple-500 hover:bg-emerald-600"
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
