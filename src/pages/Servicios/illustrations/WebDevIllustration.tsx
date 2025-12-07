import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Code, Layout, Search, Zap } from 'lucide-react';

export const WebDevIllustration = () => {
  return (
    <div className="relative w-full h-full min-h-[450px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl p-8 flex items-center justify-center group perspective-1000">
      <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/5 to-cyan-500/10 opacity-100" />
      
      {/* Decorative Background Elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 left-10 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-100/50 rounded-full blur-3xl pointer-events-none"
      />

      {/* Main Browser Window */}
      <motion.div 
        initial={{ y: 20, rotateX: 5 }}
        whileHover={{ y: 0, rotateX: 0, scale: 1.02 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
      >
        {/* Browser Header */}
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          <div className="flex-1 h-7 bg-white rounded-md border border-gray-200 shadow-sm flex items-center px-3 text-[10px] text-gray-400 font-mono">
            https://yourbrand.com
          </div>
        </div>

        {/* Website Content */}
        <div className="p-6 relative">
          {/* Hero Section */}
          <div className="mb-6 space-y-3">
             <div className="h-8 w-3/4 bg-gray-900 rounded-lg opacity-10" />
             <div className="h-3 w-1/2 bg-gray-100 rounded-full" />
             <div className="flex gap-2 pt-2">
                <div className="h-8 w-24 bg-blue-500 rounded-md shadow-lg shadow-blue-500/20" />
                <div className="h-8 w-24 bg-white border border-gray-200 rounded-md" />
             </div>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-2 gap-4">
             {[1, 2].map((i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all duration-300"
                >
                   <div className="w-8 h-8 rounded-full bg-blue-100 mb-2 flex items-center justify-center">
                      <Zap size={14} className="text-blue-500" />
                   </div>
                   <div className="h-2 w-16 bg-gray-200 rounded-full mb-1" />
                   <div className="h-1.5 w-10 bg-gray-100 rounded-full" />
                </motion.div>
             ))}
          </div>

          {/* Cursor Animation */}
          <motion.div 
             animate={{ 
               x: [0, 120, 120, 0, 0],
               y: [0, 80, 0, 0, 0],
             }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-1/4 left-1/4 pointer-events-none drop-shadow-xl z-20"
          >
             <MousePointer2 size={24} className="text-gray-900 fill-gray-900" />
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Elements (SEO, Code, etc) */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-10 right-8 bg-white p-3 rounded-xl shadow-lg border border-gray-100 z-20 flex items-center gap-2 transform group-hover:scale-110 transition-transform"
      >
         <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Search size={16} className="text-green-600" />
         </div>
         <div className="space-y-1">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
            <div className="w-8 h-1.5 bg-gray-100 rounded-full" />
         </div>
         <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-6 bg-[#1e1e1e] p-4 rounded-xl shadow-xl z-20 transform group-hover:-translate-y-2 transition-transform"
      >
         <div className="flex items-center gap-2 mb-2 border-b border-gray-700 pb-2">
            <Code size={14} className="text-blue-400" />
            <span className="text-[10px] text-gray-400 font-mono">config.ts</span>
         </div>
         <div className="space-y-1.5 font-mono text-[8px]">
            <div className="flex gap-1"><span className="text-purple-400">export</span> <span className="text-blue-400">const</span> <span className="text-yellow-400">SEO</span> = {'{'}</div>
            <div className="pl-2 flex gap-1"><span className="text-gray-300">title:</span> <span className="text-green-400">'Premium'</span>,</div>
            <div className="pl-2 flex gap-1"><span className="text-gray-300">speed:</span> <span className="text-orange-400">100</span>,</div>
            <div className="text-white">{'}'}</div>
         </div>
      </motion.div>

    </div>
  );
};
