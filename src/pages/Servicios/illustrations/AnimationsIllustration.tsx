import React from 'react';
import { Play, Music } from 'lucide-react';

export const AnimationsIllustration = () => {
  return (
    <div className="relative w-full h-full min-h-[450px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl p-8 flex items-center justify-center group">
      <div className="absolute inset-0 bg-gradient-to-tl from-[#F18807]/15 to-[#F0B708]/30 opacity-100 transition-all duration-500 group-hover:from-[#F18807]/25 group-hover:to-[#F0B708]/40" />
      
      {/* Main 3D Shape / Screen */}
      <div className="relative z-10 w-64 h-64">
        {/* Timeline Track */}
        <div className="absolute -bottom-12 -left-12 -right-12 h-16 bg-white/80 backdrop-blur-md rounded-xl border border-white/50 shadow-lg flex items-center px-4 gap-2 transform transition-all duration-500 group-hover:translate-y-[-10px]">
            <div className="w-8 h-8 rounded-full bg-[#F18807] flex items-center justify-center text-white">
              <Play size={14} fill="currentColor" />
            </div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-gradient-to-r from-[#F18807] to-[#F0B708] group-hover:w-2/3 transition-all duration-1000 ease-in-out" />
            </div>
            <div className="text-xs font-mono text-gray-500">00:12</div>
        </div>

        {/* Central Element */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F18807] to-[#F0B708] rounded-3xl shadow-2xl transform transition-all duration-700 group-hover:rotate-[10deg] group-hover:scale-110 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
            <Play size={64} className="text-white fill-white opacity-90 transform group-hover:scale-125 transition-transform duration-500" />
            

        </div>

        {/* Floating Elements */}
        <div className="absolute -top-8 -right-8 bg-white p-3 rounded-xl shadow-lg transform transition-all duration-500 group-hover:translate-y-4 group-hover:-translate-x-4 z-0">
            <Music size={24} className="text-[#F18807]" />
        </div>

      </div>
    </div>
  );
};
