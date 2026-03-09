"use client";
import React from "react";
import { Loader2 } from "lucide-react";

const Loading = ({ fullPage = false, size = 32, text = "Loading..." }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
      
        <div 
          className="absolute inset-0 rounded-full border-2 border-primary/10"
          style={{ width: size + 8, height: size + 8, left: -4, top: -4 }}
        ></div>
        
        <Loader2 
          className="animate-spin text-primary" 
          size={size} 
        />
      </div>
      {text && (
        <p className="text-secondary/50 text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
        {content}
      </div>
    );
  }

  return (
    <div className="w-full py-20 flex items-center justify-center">
      {content}
    </div>
  );
};

export default Loading;