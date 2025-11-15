import React, { useState } from 'react';
import { Menu, X, PhoneCall, Globe } from 'lucide-react';
import highLogo from '@/assets/highLogo.png';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Servicios', to: '/servicios' },
  { label: 'Trabajo Destacado', to: '/trabajos' },
  { label: 'Blog', to: '/blog', disabled: true },
];

const GRID_TEMPLATE = {
  gridTemplateColumns: 'repeat(9, 1fr)',
  gridTemplateRows: '1fr',
} as React.CSSProperties;

const SHAPE_HEIGHT = 110;

const NAV_SHAPES = [
  { id: 'home', column: '3 / span 2', borderRadius: '180px 0 0 180px', justify: 'start' as const },
  { id: 'contact', column: '8 / span 2', borderRadius: '0 180px 180px 0', justify: 'end' as const },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
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

          <div className="relative hidden lg:block h-[150px]">
            <div
              className="absolute inset-0 hidden lg:grid pointer-events-none -z-10"
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
                    className="h-[110px]"
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

            <div
              className="relative z-10 grid h-full grid-cols-9 items-center text-sm text-slate-600"
              style={{ ...GRID_TEMPLATE }}
            >
              <Link to="/" className="col-span-2 flex items-center h-full px-6">
                <img
                  src={highLogo}
                  alt="High Design"
                  className="h-[100px] w-auto object-contain mx-20"
                />
              </Link>

              <Link
                to="/"
                className="col-span-2 relative z-10 flex items-center justify-center px-6 py-6 text-lg font-semibold tracking-wide text-slate-600 hover:text-black transition-colors"
              >
                Home
              </Link>

              <div className="col-span-3 relative z-10 flex items-center justify-center gap-10 px-4 text-base font-medium">
                {NAV_LINKS.map((link) =>
                  link.disabled ? (
                    <span
                      key={link.label}
                      className="text-slate-500/70 cursor-default"
                      aria-disabled
                    >
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="hover:text-black transition-colors"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </div>

              <div className="col-span-2 relative z-10 flex items-center justify-end gap-4 pr-6">
                <Link
                  to="/contacto"
                  className="flex-1 min-w-[180px] text-center text-sm font-semibold text-slate-500 tracking-wide uppercase py-5"
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
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              Home
            </Link>
            {NAV_LINKS.map((link) =>
              link.disabled ? (
                <span
                  key={link.label}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-500/70"
                >
                  {link.label}
                </span>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
                >
                  {link.label}
                </Link>
              ),
            )}
            <Link
              to="/contacto"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-semibold text-center text-white bg-emerald-500 hover:bg-emerald-600"
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
