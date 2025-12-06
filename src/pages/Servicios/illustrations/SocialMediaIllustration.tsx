import React, { useState, useEffect, useRef } from 'react';
import { Share2, Heart } from 'lucide-react';
import { animate } from 'framer-motion';

const Counter = ({ from, to, isHovered }: { from: number, to: number, isHovered: boolean }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, isHovered ? to : from, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = value.toFixed(1) + 'k';
      }
    });

    return () => controls.stop();
  }, [from, to, isHovered]);

  return <span ref={nodeRef} className="text-sm font-bold text-gray-800">{from.toFixed(1)}k</span>;
};

export const SocialMediaIllustration = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-full min-h-[450px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl p-8 flex items-center justify-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 to-purple-600/30 opacity-100 transition-all duration-500 group-hover:from-pink-500/20 group-hover:to-purple-600/40" />

      {/* Phone */}
      <div className="relative z-10 w-64 h-[400px] bg-white rounded-[2.5rem] border-8 border-gray-900 shadow-2xl overflow-hidden transform transition-all duration-500 group-hover:rotate-[-2deg]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20" />
        
        {/* Screen Content */}
        <div className="w-full h-full bg-gray-50 pt-12 relative overflow-hidden">
          {/* Scrolling Container */}
          <div className="flex flex-col">
            {[0, 1].map((i) => (
              <div 
                key={i} 
                className="flex flex-col gap-4 p-4 animate-marquee-vertical [animation-play-state:paused] group-hover:[animation-play-state:running]"
                style={{ "--duration": "15s", "--gap": "1rem" } as React.CSSProperties}
              >
                {/* Post 1 */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500" />
                    <div className="h-2 w-20 bg-gray-100 rounded-full" />
                  </div>
                  <div className="w-full aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-5 h-5 rounded-full bg-pink-50" />
                    <div className="w-5 h-5 rounded-full bg-gray-50" />
                    <div className="w-5 h-5 rounded-full bg-gray-50" />
                  </div>
                </div>

                {/* Post 2 */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500" />
                    <div className="h-2 w-24 bg-gray-100 rounded-full" />
                  </div>
                  <div className="w-full h-24 bg-gray-100 rounded-lg mb-2 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-cyan-100" />
                  </div>
                  <div className="space-y-1">
                      <div className="h-2 w-full bg-gray-50 rounded-full" />
                      <div className="h-2 w-2/3 bg-gray-50 rounded-full" />
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
          </div>
          
          {/* Gradient Overlays for smooth fade */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent z-10" />
        </div>
      </div>

      {/* Floating Notifications */}
      <div className="absolute top-1/4 right-10 bg-white p-3 rounded-2xl shadow-lg border border-pink-100 flex items-center gap-3 transform transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-4 z-20">
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white">
            <Share2 size={16} />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-16 bg-gray-200 rounded-full" />
            <div className="h-1.5 w-10 bg-gray-100 rounded-full" />
          </div>
      </div>
      
      <div className="absolute bottom-1/3 left-8 bg-white p-3 rounded-2xl shadow-lg border border-pink-100 transform transition-all duration-500 group-hover:-translate-x-2 group-hover:scale-110 z-20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <Heart size={20} className="text-red-500 fill-red-500" />
          </div>
          <div className="flex flex-col pr-2">
            <Counter from={4.2} to={8.5} isHovered={isHovered} />
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Likes</span>
          </div>
      </div>
    </div>
  );
};
