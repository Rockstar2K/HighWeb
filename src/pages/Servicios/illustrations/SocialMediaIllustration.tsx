import React, { useState, useEffect, useRef } from 'react';
import { Share2, Heart, MessageCircle, UserPlus } from 'lucide-react';
import { motion, animate, useAnimation } from 'framer-motion';

const Counter = ({ from, to }: { from: number, to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = value.toFixed(1) + 'k';
      }
    });

    return () => controls.stop();
  }, [from, to]);

  return <span ref={nodeRef} className="text-sm font-bold text-gray-800">{from.toFixed(1)}k</span>;
};

export const SocialMediaIllustration = () => {
  return (
    <motion.div 
      initial="initial"
      whileHover="hover"
      animate="animate"
      className="relative w-full h-full min-h-[450px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl p-8 flex items-center justify-center group perspective-1000"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 to-purple-600/10 opacity-100" />

      {/* Decorative Background Elements */}
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-pink-100/60 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-10%] w-72 h-72 bg-purple-100/60 rounded-full blur-3xl pointer-events-none"
      />

      {/* Phone */}
      <motion.div 
        variants={{
          initial: { rotate: 0, y: 0 },
          animate: { y: [0, -10, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } },
          hover: { rotate: -3, scale: 1.05, transition: { duration: 0.4 } }
        }}
        className="relative z-10 w-64 h-[400px] bg-white rounded-[2.5rem] border-8 border-gray-900 shadow-2xl overflow-hidden"
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20" />
        
        {/* Screen Content */}
        <div className="w-full h-full bg-gray-50 pt-12 relative overflow-hidden">
          {/* Scrolling Container */}
          <div className="flex flex-col relative h-full">
             <motion.div
                animate={{ y: ["0%", "-50%"] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="flex flex-col"
             >
                {/* We double the content for seamless looping */}
                {[0, 1].map((setIndex) => (
                  <div key={setIndex} className="flex flex-col gap-4 p-4 pb-0">
                    {/* Post 1 */}
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500" />
                        <div className="h-2 w-20 bg-gray-100 rounded-full" />
                      </div>
                      <div className="w-full aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100" />
                          <div className="absolute bottom-2 right-2 p-1.5 bg-white/80 rounded-full backdrop-blur-sm">
                             <Heart size={12} className="text-pink-500 fill-pink-500" />
                          </div>
                      </div>
                    </div>

                    {/* Post 2 */}
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500" />
                        <div className="h-2 w-24 bg-gray-100 rounded-full" />
                      </div>
                      <div className="w-full h-20 bg-gray-100 rounded-lg mb-2 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-cyan-100" />
                      </div>
                    </div>

                    {/* Post 3 */}
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-green-500" />
                        <div className="h-2 w-16 bg-gray-100 rounded-full" />
                      </div>
                      <div className="w-full aspect-video bg-gray-100 rounded-lg relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-bl from-green-100 to-emerald-100" />
                      </div>
                    </div>
                  </div>
                ))}
             </motion.div>
          </div>
          
          {/* Gradient Overlays for smooth fade */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none" />
        </div>
      </motion.div>

      {/* Floating Notification: Share */}
      <motion.div 
        variants={{
           initial: { x: 0, y: 0 },
           animate: { y: [0, -15, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 } },
           hover: { x: 20, y: -20, rotate: 5, scale: 1.1, transition: { duration: 0.3 } }
        }}
        className="absolute top-[20%] right-[10%] bg-white p-3 rounded-2xl shadow-lg border border-pink-100 flex items-center gap-3 z-20"
      >
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white">
            <Share2 size={16} />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-16 bg-gray-100 rounded-full" />
            <div className="h-1.5 w-8 bg-gray-50 rounded-full" />
          </div>
      </motion.div>
      
      {/* Floating Notification: Likes */}
      <motion.div 
        variants={{
          initial: { x: 0, y: 0 },
          animate: { y: [0, 15, 0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } },
          hover: { x: -20, y: 10, rotate: -5, scale: 1.1, transition: { duration: 0.3 } }
        }}
        className="absolute bottom-[30%] left-[5%] bg-white p-3 rounded-2xl shadow-lg border border-pink-100 z-20 flex items-center gap-3"
      >
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <Heart size={20} className="text-red-500 fill-red-500" />
          </div>
          <div className="flex flex-col pr-2">
            <motion.div
               key="counter"
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
            >
               <Counter from={0} to={8.5} />
            </motion.div>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">New Likes</span>
          </div>
      </motion.div>

       {/* Floating Notification: New Follower */}
       <motion.div 
        variants={{
           initial: { x: 0, y: 0, opacity: 0 },
           animate: { opacity: 1, y: [0, -10, 0], transition: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 } },
           hover: { opacity: 1, x: 30, y: 30, scale: 1.1, transition: { duration: 0.3 } }
        }}
        className="absolute top-[60%] right-[5%] bg-white p-2.5 rounded-xl shadow-lg border border-purple-100 z-10 flex items-center gap-2"
      >
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <UserPlus size={14} className="text-purple-600" />
          </div>
          <div className="text-[10px] font-bold text-gray-600 pr-2">New Follower</div>
      </motion.div>

    </motion.div>
  );
};
