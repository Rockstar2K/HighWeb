import React, { useEffect, useState } from 'react';
import { Menu, X, PhoneCall, Globe } from 'lucide-react';
import highLogo from '@/assets/highLogo.png';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Servicios', to: '/servicios' },
  { label: 'Trabajo Destacado', to: '/trabajos' },
];

const GRID_TEMPLATE = {
  gridTemplateColumns: 'repeat(9, 1fr)',
  gridTemplateRows: '1fr',
} as React.CSSProperties;

const MID_LINK_ALIGNMENT = ['text-left', 'text-center', 'text-right'] as const;

const SHAPE_HEIGHT = 168;

const NAV_SHAPES = [
  { id: 'home', column: '4 / span 3', borderRadius: '180px 0 0 180px', justify: 'start' as const },
  { id: 'contact', column: '7 / span 2', borderRadius: '0 180px 180px 0', justify: 'end' as const },
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
        isScrolled ? 'bg-white/70 backdrop-blur-2xl border-b border-white/60 shadow-lg' : 'bg-transparent'
      }`}
      style={{ color: '#000' }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-0">
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
              className="text-gray-700 hover:text-black focus:outline-none"
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
                className="absolute inset-0 hidden lg:grid pointer-events-none -z-10"
                style={{ ...GRID_TEMPLATE }}
              >
                {NAV_SHAPES.map((shape) => (
                  <div
                    key={shape.id}
                    className={`relative flex items-center -ml-20 ${
                      shape.justify === 'end' ? 'justify-end' : 'justify-start'
                    }`}
                    style={{ gridColumn: shape.column }}
                  >
                    <div
                      className="h-[140px]"
                      style={{
                        width: `${SHAPE_HEIGHT}px`,
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
              className={`relative z-10 grid h-full grid-cols-9 items-center text-sm text-black transition-all duration-300 ${
                isScrolled ? 'rounded-3xl bg-white/80 backdrop-blur-xl border border-white/70 shadow-xl px-4' : ''
              }`}
              style={{ ...GRID_TEMPLATE, color: '#000' }}
            >
              <Link
                to="/"
                className="col-span-2 flex items-center h-full px-6"
                style={{ color: '#000' }}
              >
                <img
                  src={highLogo}
                  alt="High Design"
                  className="h-[100px] w-auto object-contain mx-20"
                />
              </Link>

              <Link
                to="/"
                className="col-span-2 relative z-10 flex items-center justify-center px-6 py-6 text-lg font-semibold tracking-wide text-black"
                style={{ color: '#000' }}
              >
                Home
              </Link>

              <div className="col-span-3 relative z-10 h-full pl-0 pr-10">
                <div
                  className="flex h-full w-full items-center justify-between text-base font-medium text-black"
                  style={{ color: '#000' }}
                >
                  {NAV_LINKS.map((link, index) => {
                    const alignment = MID_LINK_ALIGNMENT[index] || 'text-center';
                    const sharedClasses = `flex-1 ${alignment}`;

                    return link.disabled ? (
                      <span
                        key={link.label}
                        className={`${sharedClasses} cursor-default`}
                        style={{ color: '#000' }}
                        aria-disabled
                      >
                        {link.label}
                      </span>
                    ) : (
                      <Link
                        key={link.label}
                        to={link.to}
                        className={`${sharedClasses} text-black transition-colors`}
                        style={{ color: '#000' }}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="col-span-2 relative z-10 flex items-center justify-end gap-4 pr-6">
                <Link
                  to="/contacto"
                  className="flex-1 min-w-[180px] text-center text-base font-semibold text-black py-5"
                  style={{ color: '#000' }}
                >
                  Contáctanos
                </Link>
                <button
                  type="button"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-green-600 shadow-sm bg-white hover:shadow-md transition-shadow"
                  aria-label="Llámanos"
                >
                  <PhoneCall size={18} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-slate-700 shadow-sm bg-white hover:shadow-md transition-shadow"
                  aria-label="Seleccionar idioma"
                >
                  <Globe size={18} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-lg">
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
