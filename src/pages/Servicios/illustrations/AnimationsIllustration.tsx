import React from 'react';
import { Play, Music, Clapperboard, Film } from 'lucide-react';
import { motion } from 'framer-motion';

export const AnimationsIllustration = () => {
  return (
    <motion.div 
      initial="initial"
      whileHover="hover"
      animate="animate"
      className="relative w-full h-full min-h-[450px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl p-8 flex items-center justify-center group perspective-1000"
    >
      <div className="absolute inset-0 bg-gradient-to-tl from-[#F18807]/10 to-[#F0B708]/20 opacity-100" />
      
      {/* Decorative Background Elements */}
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-yellow-200/40 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-10%] w-72 h-72 bg-orange-100/50 rounded-full blur-3xl pointer-events-none"
      />

      {/* Main Container */}
      <div className="relative z-10 w-64 h-64">
        
        {/* Central Element (Animated Cube/Screen) - Now z-40 to be on top */}
        <motion.div 
          variants={{
             initial: { rotate: 0, scale: 1 },
             animate: { 
               rotate: [0, 5, -5, 0],
               scale: [1, 1.02, 1],
               transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
             },
             hover: { 
               rotate: 15, 
               scale: 1.1, 
               transition: { duration: 0.4, type: "spring", stiffness: 200 } 
             }
          }}
          className="absolute inset-0 bg-gradient-to-br from-[#F18807] to-[#F0B708] rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden z-40"
        >
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
             
             {/* Pulse Ring */}
             <motion.div 
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-3xl border-2 border-white/50"
             />

             <motion.div
               animate={{ scale: [1, 1.2, 1] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             >
                <Play size={64} className="text-white fill-white opacity-90" />
             </motion.div>
        </motion.div>


         {/* Floating Element: Timeline Track (Bottom) - Now z-20 to be below */}
        <motion.div 
           variants={{
             initial: { y: 0, opacity: 0.9 },
             animate: { y: [0, 5, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 } },
             hover: { y: 20, scale: 1.05, opacity: 1, transition: { duration: 0.3 } }
           }}
           className="absolute -bottom-12 -left-12 -right-12 h-16 bg-white/90 backdrop-blur-md rounded-xl border border-white/50 shadow-xl flex items-center px-4 gap-2 z-20"
        >
            <div className="w-8 h-8 rounded-full bg-[#F18807] flex items-center justify-center text-white">
              <Play size={14} fill="currentColor" />
            </div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="h-full bg-gradient-to-r from-[#F18807] to-[#F0B708]" 
              />
            </div>
            <div className="text-xs font-mono text-gray-500">00:12</div>
        </motion.div>

        {/* Floating Element: Music Note (Top Right) */}
        <motion.div 
           variants={{
              initial: { x: 0, y: 0, rotate: 0 },
              animate: { 
                 y: [0, -15, 0], 
                 rotate: [0, 10, -10, 0],
                 transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } 
              },
              hover: { x: 40, y: -40, rotate: 20, scale: 1.2, transition: { duration: 0.4 } }
           }}
           className="absolute -top-8 -right-8 bg-white p-3 rounded-xl shadow-lg transform z-10"
        >
            <Music size={24} className="text-[#F18807]" />
        </motion.div>

        {/* Floating Element: Clapperboard (Top Left) */}
        <motion.div 
           variants={{
              initial: { x: 0, y: 0, rotate: 0, opacity: 0 },
              animate: { 
                 opacity: 1,
                 y: [0, -10, 0], 
                 rotate: [0, -5, 5, 0],
                 transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 } 
              },
              hover: { x: -40, y: -20, rotate: -20, scale: 1.2, transition: { duration: 0.4 } }
           }}
           className="absolute -top-4 -left-12 bg-white p-2.5 rounded-xl shadow-lg transform z-10 border border-orange-100"
        >
            <Clapperboard size={20} className="text-[#F0B708]" />
        </motion.div>

        {/* Floating Element: Film Strip (Bottom Right) */}
        <motion.div 
           variants={{
              initial: { x: 0, y: 0, rotate: 0, opacity: 0 },
              animate: { 
                 opacity: 1,
                 y: [0, 10, 0], 
                 rotate: [0, 5, -5, 0],
                 transition: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 } 
              },
              hover: { x: 50, y: 10, rotate: 15, scale: 1.1, transition: { duration: 0.4 } }
           }}
           className="absolute bottom-8 -right-16 bg-white p-2 rounded-lg shadow-lg transform z-10 border border-orange-50"
        >
            <Film size={18} className="text-orange-400" />
        </motion.div>

      </div>
    </motion.div>
  );
};
