import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { services, Service } from '@/data/services';
import { ContactModal } from '../contactModal/ContactModal';

interface PricingSectionProps {
  serviceId: string;
}

const PricingSection: React.FC<PricingSectionProps> = ({ serviceId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  
  // Get the specified service
  const service = services.find(service => service.id === serviceId) as Service | undefined;
  
  const handleContactClick = (plan: string) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan('');
  };
  
  if (!service?.pricing) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {Object.entries(service.pricing).map(([plan, details], index) => {
            const isPopular = plan === 'standard';
            return (
              <div 
                key={plan}
                className={`relative flex flex-col p-6 rounded-2xl h-full transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${
                  isPopular 
                    ? 'bg-[#F9F5FF] border-2 border-[#7741EA] hover:shadow-[#7741EA]/20 scale-[1.02]' 
                    : 'bg-white border border-gray-200 hover:border-[#7741EA]/30 hover:shadow-[#7741EA]/10'
                }`}
              >
                
                <div className="p-6 h-full flex flex-col">
                  {isPopular && (
                    <div className="absolute top-0 right-4 -translate-y-1/2 bg-[#7741EA] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      MÁS POPULAR
                    </div>
                  )}
                  
                  <div>
                    <h3 className={`text-xl font-bold mb-2 capitalize ${
                      isPopular ? 'text-[#7741EA]' : 'text-gray-900'
                    }`}>
                      {plan}
                    </h3>
                    
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-[#7741EA]">{details.price}</span>
                      {details.price.includes('/mes') && (
                        <span className="text-gray-500 text-sm">/mes</span>
                      )}
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {details.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-auto pt-4">
                    <Button 
                      onClick={() => handleContactClick(plan)}
                      className={`w-full transition-all duration-200 ease-in-out ${
                        isPopular 
                          ? 'bg-[#7741EA]! hover:bg-[#6a3ac8]! text-white hover:shadow-md hover:shadow-[#7741EA]/30' 
                          : 'bg-white! text-[#7741EA]! border border-[#7741EA]! hover:bg-[#F9F5FF]! hover:border-[#7741EA]! hover:text-[#6a3ac8]!'
                      }`}
                    >
                      {isPopular ? 'Comenzar ahora' : 'Seleccionar plan'}
                      <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
      <ContactModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Contratar Plan ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}`}
      />
    </div>
  );
};

export default PricingSection;