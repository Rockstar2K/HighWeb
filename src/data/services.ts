import branding from '@/assets/servicios/branding.png';
import web from '@/assets/servicios/web.png';
import redes from '@/assets/servicios/redes.png';
import animaciones from '@/assets/servicios/animaciones.png';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  buttonText: string;
  link: string;
  pricing?: {
    basic?: {
      price: string;
      features: string[];
    };
    standard?: {
      price: string;
      features: string[];
    };
    premium?: {
      price: string;
      features: string[];
    };
  };
}

export const services: Service[] = [
  {
    id: 'branding',
    title: 'Branding',
    description: 'Diseñamos contigo la marca de tus sueños basados en un proceso de estrategia único en Chile.',
    icon: branding,
    buttonText: 'Saber más',
    link: '/branding',
    pricing: {
      basic: {
        price: '$1,299,000',
        features: [
          'Diseño de logo',
          'Paleta de colores',
          'Tipografía principal'
        ]
      },
      standard: {
        price: '$1,899,000',
        features: [
          'Todo en Básico',
          'Manual de marca básico',
          '3 aplicaciones de marca',
          'Papelería corporativa'
        ]
      },
      premium: {
        price: '$2,499,000',
        features: [
          'Todo en Estándar',
          'Manual de marca completo',
          '5 aplicaciones de marca',
          'Diseño de redes sociales',
          'Soporte por 1 mes'
        ]
      }
    }
  },
  {
    id: 'web',
    title: 'Sitios Web',
    description: 'Creamos sitios web a medida que convierten visitantes en clientes con diseños únicos y funcionales.',
    icon: web,
    buttonText: 'Ver más',
    link: '/sitios-web',
    pricing: {
      basic: {
        price: '$1,199,000',
        features: [
          'Diseño responsivo',
          'Hasta 5 secciones',
          'Formulario de contacto'
        ]
      },
      standard: {
        price: '$1,799,000',
        features: [
          'Todo en Básico',
          'Hasta 10 secciones',
          'Integración con redes sociales',
          'SEO básico'
        ]
      },
      premium: {
        price: '$2,999,000',
        features: [
          'Todo en Estándar',
          'Tienda online (hasta 20 productos)',
          'SEO avanzado',
          'Soporte por 3 meses',
          'Capacitación'
        ]
      }
    }
  },
  {
    id: 'redes',
    title: 'Redes Sociales',
    description: 'Gestionamos tus redes sociales con contenido atractivo que genera engagement y fideliza a tu audiencia.',
    icon: redes,
    buttonText: 'Ver más',
    link: '/redes-sociales',
    pricing: {
      basic: {
        price: '$499,000/mes',
        features: [
          '12 publicaciones mensuales',
          'Diseño de plantillas',
          '1 red social a elección'
        ]
      },
      standard: {
        price: '$899,000/mes',
        features: [
          'Todo en Básico',
          '24 publicaciones mensuales',
          '2 redes sociales',
          'Informe mensual'
        ]
      },
      premium: {
        price: '$1,499,000/mes',
        features: [
          'Todo en Estándar',
          'Publicaciones ilimitadas',
          '3-5 redes sociales',
          'Campañas pagadas',
          'Reporte semanal'
        ]
      }
    }
  },
  {
    id: 'animaciones',
    title: 'Animaciones',
    description: 'Dale vida a tu marca con animaciones personalizadas que cuenten tu historia de manera única.',
    icon: animaciones,
    buttonText: 'Ver más',
    link: '/animaciones',
    pricing: {
      basic: {
        price: '$299,000',
        features: [
          'Animación simple (hasta 15 segundos)',
          '1 revisión',
          'Formato MP4'
        ]
      },
      standard: {
        price: '$599,000',
        features: [
          'Animación intermedia (hasta 30 segundos)',
          '2 revisiones',
          'Múltiples formatos',
          'Efectos de sonido básicos'
        ]
      },
      premium: {
        price: '$1,199,000',
        features: [
          'Animación avanzada (hasta 1 minuto)',
          'Revisiones ilimitadas',
          'Todos los formatos',
          'Banda sonora personalizada',
          'Derechos de autor'
        ]
      }
    }
  }
];

export default services;
