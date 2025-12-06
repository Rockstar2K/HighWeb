import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Type, PenTool } from 'lucide-react';

export const BrandingIllustration = () => {
  return (
    <motion.div 
      initial="initial"
      whileHover="hover"
      animate="animate"
      className="relative w-full h-full min-h-[450px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl p-8 flex items-center justify-center group perspective-1000"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/10 opacity-100" />
      
      {/* Decorative Background Elements */}
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-purple-200/40 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-pink-100/50 rounded-full blur-3xl pointer-events-none"
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-sm h-64">
        
        {/* Card 1: Color Palette (Back Layer) */}
        <motion.div 
          variants={{
            initial: { rotate: -5, x: -20, y: 10 },
            animate: { 
              y: [10, 0, 10],
              transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            },
            hover: { 
              rotate: -12, 
              x: -40, 
              y: -10, 
              scale: 1.05, 
              zIndex: 20,
              transition: { duration: 0.4 } 
            }
          }}
          className="absolute top-0 left-0 w-48 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 origin-bottom-right"
        >
          <div className="flex items-center gap-2 mb-3">
             <div className="p-1.5 bg-purple-50 rounded-lg"><Palette size={14} className="text-purple-600" /></div>
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Colors</span>
          </div>
          <div className="space-y-3">
             <div className="flex gap-2">
                <div className="h-10 w-10 rounded-full bg-[#7741EA] shadow-sm transform transition-transform hover:scale-110" />
                <div className="h-10 w-10 rounded-full bg-[#35F099] shadow-sm transform transition-transform hover:scale-110" />
                <div className="h-10 w-10 rounded-full bg-[#1a1a1a] shadow-sm transform transition-transform hover:scale-110" />
             </div>
             <div className="space-y-1.5">
                <div className="h-2 w-full bg-gray-100 rounded-full" />
                <div className="h-2 w-2/3 bg-gray-100 rounded-full" />
             </div>
          </div>
        </motion.div>

        {/* Card 2: Typography/Logo (Front Layer) */}
        <motion.div 
          variants={{
             initial: { rotate: 5, x: 20, y: -10 },
             animate: { 
               y: [-10, 0, -10],
               transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
             },
             hover: { 
               rotate: 8, 
               x: 50, 
               y: -20, 
               scale: 1.05,
               transition: { duration: 0.4 }
             }
          }}
          className="absolute bottom-0 right-0 w-52 bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 origin-top-left"
        >
           <div className="flex items-center gap-2 mb-4">
             <div className="p-1.5 bg-pink-50 rounded-lg"><Type size={14} className="text-pink-600" /></div>
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Typography</span>
          </div>
          
           <div className="border-2 border-dashed border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-white transition-colors">
              <div className="text-4xl font-black text-gray-900 tracking-tighter">Aa</div>
              <div className="mt-2 text-[10px] text-gray-400 font-mono">Sans Serif</div>
           </div>
        </motion.div>

        {/* Floating Tool: Pen/Vector */}
        <motion.div 
           variants={{
             initial: { x: 0, y: 0, opacity: 0.8 },
             animate: { 
               x: [0, 80, 80, 0, 0],
               y: [0, -40, 0, 0, 0],
               rotate: [0, 10, -10, 0],
               transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
             },
             hover: {
               opacity: 1,
               scale: 1.1,
               transition: { duration: 0.3 }
             }
           }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
        >
           <div className="bg-white p-3 rounded-full shadow-lg border border-purple-100 text-purple-600">
              <PenTool size={20} className="transform rotate-[-45deg]" />
           </div>
        </motion.div>

      </div>
    </motion.div>
  );
};
