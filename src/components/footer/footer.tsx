import React from 'react';
import { Mail, MapPin, Phone, Clock, Instagram, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Footer = () => {
  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Proyectos', href: '/proyectos' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Contacto', href: '/contacto' },
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com' },
    { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com' },
    { icon: <Youtube className="w-5 h-5" />, href: 'https://youtube.com' },
  ];

  const contactInfo = [
    { icon: <MapPin className="w-4 h-4" />, text: 'Av. Siempreviva 123, CABA' },
    { icon: <Phone className="w-4 h-4" />, text: '+54 11 1234-5678' },
    { icon: <Mail className="w-4 h-4" />, text: 'info@highdesign.com' },
    { icon: <Clock className="w-4 h-4" />, text: 'Lun-Vie: 9:00 - 18:00' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Navigation Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">High Design</h3>
            <p className="text-sm max-w-md">
              Transformamos espacios con diseño innovador y funcional. Creamos ambientes que inspiran y perduran.
            </p>
            
            <div className="space-y-2">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-primary-400">{item.icon}</span>
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Suscríbete a nuestro newsletter</h3>
              <p className="text-sm text-gray-400">
                Recibe las últimas noticias, ofertas y consejos de diseño directamente en tu bandeja de entrada.
              </p>
            </div>
            
            <form className="space-y-4">
              <div>
                <Input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <Button type="submit" className="w-full md:w-auto bg-primary-600 hover:bg-primary-700">
                Suscribirse
              </Button>
            </form>
            
            <div className="pt-4 border-t border-gray-800">
              <div className="grid grid-cols-2 gap-4">
                {navLinks.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} High Design. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;