import React from 'react';
import { Palette } from 'lucide-react';

export const BrandingIllustration = () => {
  return (
    <div className="relative w-full h-full min-h-[450px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl p-8 flex items-center justify-center group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-100" />
      
      {/* Branding Visual */}
      <div className="relative z-10 grid grid-cols-2 gap-6 w-full max-w-sm">
        
        {/* Palette Card */}
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-500 group-hover:-rotate-3 group-hover:-translate-y-2">
          <div className="flex gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#7741EA]" />
            <div className="w-8 h-8 rounded-full bg-[#35F099]" />
            <div className="w-8 h-8 rounded-full bg-gray-900" />
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full bg-gray-100 rounded-full" />
            <div className="h-2 w-2/3 bg-gray-50 rounded-full" />
          </div>
        </div>

        {/* Logo Grid Card */}
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-500 group-hover:rotate-3 group-hover:translate-x-2 mt-8">
          <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="w-full aspect-square border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-gray-900 rounded-sm transform rotate-45" />
              </div>
              <div className="w-full aspect-square bg-gray-50 rounded-lg" />
          </div>
          <div className="h-2 w-12 bg-gray-200 rounded-full mx-auto" />
        </div>

      </div>
      
      {/* Floating Element */}
      <div className="absolute bottom-1/4 right-1/4 bg-white p-3 rounded-full shadow-xl border border-gray-100 transform transition-all duration-700 group-hover:scale-110 z-20">
          <Palette size={24} className="text-[#7741EA]" />
      </div>

    </div>
  );
};
