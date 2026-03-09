"use client";
import React, { useState } from "react";
import { ShoppingCart, Truck, RotateCcw } from "lucide-react";
import PriceDisplay from "./PriceDisplay";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";

const ProductInfo = ({ product, formatPrice }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.attributes?.sizes?.[0] || "");

  if (!product) return null;

  return (
    <div className="flex flex-col py-2">
      <p className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-3">
        {product.category}
      </p>

      <h1 className="text-3xl font-semibold text-secondary dark:text-foreground mb-2 leading-tight tracking-tight">
        {product.name}
      </h1>
      
      <p className="text-secondary/70 dark:text-foreground/70 text-sm leading-relaxed max-w-md mb-6">
        {product.short_description}
      </p>
      
      <PriceDisplay 
        salePrice={product.sale_price} 
        basePrice={product.base_price} 
        formatPrice={formatPrice} 
      />

      <div className="mt-10 space-y-10">
        <SizeSelector
          sizes={product.attributes?.sizes} 
          selectedSize={selectedSize} 
          onSelect={setSelectedSize} 
        />

        <div className="flex gap-4 h-12">
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          
          <button className="flex-1 bg-primary text-white text-[13px] font-medium rounded-sm hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] shadow-sm">
            <ShoppingCart size={16} /> 
            <span className="uppercase cursor-pointer tracking-widest">Add to Cart</span>
          </button>
        </div>

        <div className="pt-10 border-t border-secondary/10 dark:border-foreground/10">
            <h3 className="text-[12px] font-bold text-secondary dark:text-foreground uppercase tracking-wider mb-4">
              Product Story
            </h3>
            <p className="text-[14px] text-secondary/80 dark:text-foreground/80 leading-[1.8] mb-8">
                {product.description}
            </p>
            
            <div className="grid grid-cols-2 gap-y-6 pt-6 border-t border-secondary/5 dark:border-foreground/5">
                <div>
                    <span className="text-[10px] text-secondary/50 dark:text-foreground/50 uppercase tracking-tighter block mb-1">Fabric</span>
                    <span className="text-[13px] font-medium text-secondary dark:text-foreground">{product.attributes.fabric}</span>
                </div>
                <div>
                    <span className="text-[10px] text-secondary/50 dark:text-foreground/50 uppercase tracking-tighter block mb-1">Season</span>
                    <span className="text-[13px] font-medium text-secondary dark:text-foreground">{product.season}</span>
                </div>
                <div>
                    <span className="text-[10px] text-secondary/50 dark:text-foreground/50 uppercase tracking-tighter block mb-1">Gender</span>
                    <span className="text-[13px] font-medium text-secondary dark:text-foreground">{product.gender}</span>
                </div>
                <div>
                    <span className="text-[10px] text-secondary/50 dark:text-foreground/50 uppercase tracking-tighter block mb-1">Segment</span>
                    <span className="text-[13px] font-medium text-secondary dark:text-foreground">{product.segment}</span>
                </div>
            </div>
        </div>

        <div className="flex gap-10 pt-8 border-t border-secondary/10 dark:border-foreground/10">
          <div className="flex items-center gap-2 text-secondary/40 dark:text-foreground/40">
            <Truck size={15} />
            <span className="text-[9px] font-bold uppercase tracking-[0.15em]">Free Shipping</span>
          </div>
          <div className="flex items-center gap-2 text-secondary/40 dark:text-foreground/40">
            <RotateCcw size={15} />
            <span className="text-[9px] font-bold uppercase tracking-[0.15em]">Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;