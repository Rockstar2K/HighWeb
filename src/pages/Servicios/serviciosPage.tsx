'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/contactModal/ContactModal';
import directions from "@/assets/proceso/directions.png"
import manual from "@/assets/proceso/manual.png"
import text from "@/assets/proceso/text.png"

interface Plan {
  type: 'Pymes' | 'Startups' | 'Empresas';
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface TabItem {
  id: string;
  label: string;
  title: string;
  description: string;
  buttonText: string;
  plans: Plan[];
}

interface PlanCardProps {
  plan: Plan;
  isPopular?: boolean;
  onSelectPlan: (service: string, plan: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, isPopular = false, onSelectPlan }) => (
  <div 
    className={`relative flex flex-col p-6 rounded-2xl h-full transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${
      isPopular 
        ? 'bg-[#F9F5FF] border-2 border-[#7741EA] hover:shadow-[#7741EA]/20' 
        : 'bg-white border border-gray-200 hover:border-[#7741EA]/30 hover:shadow-[#7741EA]/10'
    }`}
  >
    {isPopular && (
      <div className="absolute top-0 right-4 -translate-y-1/2 bg-[#7741EA] text-white text-xs font-semibold px-3 py-1 rounded-full">
        Más popular
      </div>
    )}
    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.type}</h3>
    <div className="mb-4">
      <span className="text-3xl font-bold text-[#7741EA]">{plan.price}</span>
      <span className="text-gray-500 text-sm">/proyecto</span>
    </div>
    <p className="text-gray-600 text-sm mb-6 min-h-[40px]">{plan.description}</p>
    <ul className="space-y-3 mb-6 flex-grow">
      {plan.features.map((feature, idx) => (
        <li key={idx} className="flex items-start">
          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-gray-700 text-sm">{feature}</span>
        </li>
      ))}
    </ul>
    <Button 
      variant="purple" 
      onClick={() => onSelectPlan(plan.type, plan.description)}
      className={`w-full mt-auto transition-all duration-200 ease-in-out ${
        isPopular 
          ? 'bg-[#7741EA] hover:bg-[#6a3ac8] text-white hover:shadow-md hover:shadow-[#7741EA]/30' 
          : 'bg-white text-[#7741EA] border border-[#7741EA] hover:bg-[#F9F5FF] hover:border-[#7741EA] hover:text-[#6a3ac8]'
      }`}
    >
      Contratar {plan.type}
    </Button>
  </div>
);

interface TabContentProps extends Omit<TabItem, 'id' | 'label' | 'buttonText'> {
  onSelectPlan: (service: string, plan: string) => void;
}

const TabContent: React.FC<TabContentProps> = ({ title, description, plans, onSelectPlan }) => (
  <div className="bg-white rounded-3xl p-8 shadow-md mx-auto w-full max-w-6xl">
    <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
      {title}
    </h2>
    
    <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
      {description}
    </p>

    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <PlanCard 
            key={plan.type}
            plan={plan}
            isPopular={index === 1} // Middle plan is marked as popular
            onSelectPlan={onSelectPlan}
          />
        ))}
      </div>
    </div>
  </div>
);

const ServiciosPage = () => {
  const [activeTab, setActiveTab] = useState('branding');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ title: '', plan: '' });

  const handlePlanSelect = (service: string, plan: string) => {
    setSelectedPlan({
      title: service,
      plan: plan
    });
    setIsModalOpen(true);
  };

  const tabs: TabItem[] = [
    {
      id: 'branding',
      label: 'Branding',
      title: 'Creación de Marca',
      description: 'Diseño de identidad de marca profesional que comunique la esencia de tu negocio',
      buttonText: 'Cotizar Ahora',
      plans: [
        {
          type: 'Pymes',
          price: '$1,200',
          description: 'Ideal para emprendimientos que recién comienzan',
          features: [
            '1 Propuesta de identidad',
            '2 Revisiones de diseño',
            'Logo en formatos básicos',
            'Paleta de colores',
            'Manual de marca básico'
          ]
        },
        {
          type: 'Startups',
          price: '$2,500',
          description: 'Perfecto para empresas en crecimiento',
          popular: true,
          features: [
            '3 Propuestas de identidad',
            '4 Revisiones de diseño',
            'Logo en múltiples formatos',
            'Sistema de identidad visual',
            'Manual de marca completo',
            'Papelería básica'
          ]
        },
        {
          type: 'Empresas',
          price: '$4,500',
          description: 'Solución completa para marcas establecidas',
          features: [
            '5+ Propuestas de identidad',
            'Revisiones ilimitadas',
            'Sistema de identidad completo',
            'Manual de marca extenso',
            'Papelería corporativa',
            'Brandbook digital',
            'Soporte prioritario 24/7'
          ]
        }
      ]
    },
    {
      id: 'paginas-web',
      label: 'Páginas Web',
      title: 'Desarrollo Web Profesional',
      description: 'Sitios web a medida, rápidos y optimizados para conversiones',
      buttonText: 'Cotizar Ahora',
      plans: [
        {
          type: 'Pymes',
          price: '$1,500',
          description: 'Sitio web básico para pequeñas empresas',
          features: [
            'Hasta 5 páginas',
            'Diseño responsive',
            'Formulario de contacto',
            'Optimización básica SEO',
            '1 mes de soporte'
          ]
        },
        {
          type: 'Startups',
          price: '$3,500',
          description: 'Solución completa para startups en crecimiento',
          popular: true,
          features: [
            'Hasta 15 páginas',
            'Diseño personalizado',
            'Blog integrado',
            'SEO avanzado',
            '3 meses de soporte',
            'Análisis de métricas'
          ]
        },
        {
          type: 'Empresas',
          price: '$7,000+',
          description: 'Solución empresarial a medida',
          features: [
            'Páginas ilimitadas',
            'Diseño personalizado premium',
            'Sistema de gestión de contenido',
            'E-commerce básico',
            'SEO avanzado',
            '6 meses de soporte',
            'Entrenamiento personalizado'
          ]
        }
      ]
    },
    {
      id: 'redes-sociales',
      label: 'Redes Sociales',
      title: 'Gestión de Redes Sociales',
      description: 'Estrategias de contenido que generan engagement y crecimiento orgánico',
      buttonText: 'Cotizar Ahora',
      plans: [
        {
          type: 'Pymes',
          price: '$600/mes',
          description: 'Gestión básica de redes sociales',
          features: [
            '2 publicaciones por semana',
            '1 red social a elección',
            'Diseño de gráficos básicos',
            'Informe mensual',
            'Respuesta a mensajes'
          ]
        },
        {
          type: 'Startups',
          price: '$1,200/mes',
          description: 'Estrategia completa para crecimiento',
          popular: true,
          features: [
            '4 publicaciones por semana',
            'Hasta 3 redes sociales',
            'Diseño de gráficos personalizados',
            'Informe detallado semanal',
            'Gestión de comunidad',
            '1 campaña mensual'
          ]
        },
        {
          type: 'Empresas',
          price: '$2,500+/mes',
          description: 'Solución empresarial integral',
          features: [
            'Publicaciones diarias',
            'Hasta 5 redes sociales',
            'Contenido multimedia premium',
            'Análisis de competencia',
            'Estrategia de influencers',
            '2+ campañas mensuales',
            'Soporte prioritario 24/7'
          ]
        }
      ]
    },
    {
      id: 'animaciones',
      label: 'Animaciones',
      title: 'Animaciones Creativas',
      description: 'Contenido animado que cuenta la historia de tu marca',
      buttonText: 'Cotizar Ahora',
      plans: [
        {
          type: 'Pymes',
          price: '$800',
          description: 'Animaciones simples para redes sociales',
          features: [
            'Hasta 15 segundos',
            '1 concepto',
            '1 revisión',
            'Formato para redes sociales',
            'Música de stock'
          ]
        },
        {
          type: 'Startups',
          price: '$2,000',
          description: 'Animaciones profesionales para marketing',
          popular: true,
          features: [
            'Hasta 60 segundos',
            '2 conceptos',
            '2 revisiones',
            'Múltiples formatos',
            'Música personalizada',
            'Voces en off opcionales'
          ]
        },
        {
          type: 'Empresas',
          price: '$4,500+',
          description: 'Producción audiovisual completa',
          features: [
            'Duración personalizada',
            'Conceptos ilimitados',
            'Revisiones ilimitadas',
            'Todos los formatos',
            'Banda sonora personalizada',
            'Voces en off profesionales',
            'Sesión fotográfica opcional'
          ]
        }
      ]
    },
  ];

// ... (rest of the code remains the same)

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  if (!activeTabData) return null;

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <ContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Solicitar ${selectedPlan.title} - ${selectedPlan.plan}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[15vh]">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl font-bold text-center mb-6">¿Cuánto vale todo esto?</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#7741EA]! text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <TabContent 
            {...activeTabData} 
            onSelectPlan={handlePlanSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiciosPage;