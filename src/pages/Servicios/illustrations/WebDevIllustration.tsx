import React from 'react';

export const WebDevIllustration = () => {
  return (
    <div className="relative w-full h-full min-h-[450px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl p-8 flex items-center justify-center group">
      <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-blue-600/30 opacity-100 transition-all duration-500 group-hover:from-blue-500/20 group-hover:to-blue-600/40" />
      
      {/* Browser Window */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-blue-500/20">
        {/* Header */}
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="ml-4 flex-1 h-6 bg-white rounded-md border border-gray-200 shadow-sm" />
        </div>
        {/* Body */}
        <div className="p-6 grid grid-cols-12 gap-4">
          {/* Sidebar */}
          <div className="col-span-3 space-y-2">
            <div className="h-2 w-full bg-gray-100 rounded-full" />
            <div className="h-2 w-2/3 bg-gray-100 rounded-full" />
            <div className="h-2 w-3/4 bg-gray-100 rounded-full" />
          </div>
          {/* Main */}
          <div className="col-span-9 space-y-4">
            <div className="h-32 bg-blue-50 rounded-lg border border-blue-100 relative overflow-hidden group-hover:bg-blue-100 transition-colors">
               <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full shadow-sm" />
               <div className="absolute bottom-4 right-4 px-3 py-1 bg-blue-500 text-white text-xs rounded-full">Button</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-gray-50 rounded-lg" />
              <div className="h-20 bg-gray-50 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
