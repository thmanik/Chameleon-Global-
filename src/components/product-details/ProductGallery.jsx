"use client";
import React, { useState } from "react";
import { Heart } from "lucide-react";

const ProductGallery = ({ baseImage, gallery, name }) => {
  const [activeImage, setActiveImage] = useState(baseImage);
  const [isLiked, setIsLiked] = useState(false);
  const images = [baseImage, ...(gallery || [])];

  return (
    <div className="space-y-4">
      <div className="aspect-[3/4] overflow-hidden rounded-sm bg-secondary/5 relative">
        <img 
          src={activeImage} 
          alt={name} 
          className="w-full h-full object-cover transition-all duration-700" 
        />
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2.5 bg-background/80 backdrop-blur-md shadow-sm rounded-full transition-all active:scale-90"
        >
          <Heart 
            size={18} 
            className={`transition-colors ${isLiked ? "fill-primary text-primary" : "text-secondary/60"}`} 
          />
        </button>
      </div>
      
      <div className="flex gap-3 overflow-x-auto scrollbar-hide py-1">
        {images.map((img, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveImage(img)}
            className={`flex-shrink-0 w-20 h-24 rounded-sm overflow-hidden border-2 transition-all duration-300 ${
              activeImage === img 
                ? "border-primary shadow-sm scale-[1.02]" 
                : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;