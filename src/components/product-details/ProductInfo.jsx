"use client";
import React, { useState, useEffect } from "react";
import { ShoppingCart, Truck, RotateCcw, Info, ChevronDown } from "lucide-react";
import PriceDisplay from "./PriceDisplay";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const ProductInfo = ({ product, formatPrice }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const isB2B = user?.role === "B2B";
  const b2bTiers = product?.b2b_info?.tiers || [];

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.attributes?.sizes?.[0] || "");

  useEffect(() => {
    if (isB2B && b2bTiers.length > 0) {
      setQuantity(b2bTiers[0].minQty);
    } else {
      setQuantity(1);
    }
  }, [isB2B, b2bTiers, product]);

  const currentPrice = isB2B 
    ? (b2bTiers.find(t => t.minQty === Number(quantity))?.price || b2bTiers[0]?.price)
    : product?.sale_price;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, isB2B, currentPrice);
  };

  if (!product) return null;

  return (
    <div className="flex flex-col py-2">
      <div className="flex items-center gap-2 mb-3">
        <p className="text-[11px] font-bold text-primary uppercase tracking-[0.2em]">
          {product.category}
        </p>
        {isB2B && (
          <span className="bg-primary text-white text-[9px] px-2 py-0.5 font-bold rounded-sm uppercase tracking-widest italic">
            Wholesale Pricing
          </span>
        )}
      </div>

      <h1 className="text-3xl font-semibold text-secondary dark:text-foreground mb-2 leading-tight tracking-tight uppercase ">
        {product.name}
      </h1>
      
      <p className="text-secondary/70 dark:text-foreground/70 text-sm leading-relaxed max-w-md mb-6">
        {product.short_description}
      </p>
      
      <PriceDisplay 
        salePrice={currentPrice} 
        basePrice={product.base_price} 
        formatPrice={formatPrice}
        isB2B={isB2B}
        currentTierPrice={currentPrice}
      />

      <div className="mt-10 space-y-10">
        <SizeSelector
          sizes={product.attributes?.sizes} 
          selectedSize={selectedSize} 
          onSelect={setSelectedSize} 
        />

        <div className="space-y-4">
          <div className="flex gap-4 h-12">
            {isB2B ? (
              <div className="relative flex-1 max-w-[160px]">
                <select 
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-full bg-background border border-secondary/20 rounded-sm px-4 appearance-none font-bold text-sm cursor-pointer focus:border-primary outline-none transition-all dark:text-foreground"
                >
                  {b2bTiers.map((tier) => (
                    <option key={tier.minQty} value={tier.minQty}>
                      {tier.minQty} Units
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary/40" />
              </div>
            ) : (
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            )}
            
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-primary cursor-pointer text-white text-[13px] font-medium rounded-sm hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] shadow-sm uppercase tracking-widest"
            >
              <ShoppingCart size={16} /> 
              {isB2B ? "Order Bulk" : "Add to Cart"}
            </button>
          </div>
          
          {isB2B && (
            <div className="flex flex-col gap-2 p-4 bg-secondary/5 rounded-sm border border-secondary/5">
                <p className="text-[10px] font-bold text-secondary/60 dark:text-foreground/60 flex items-center gap-1.5 uppercase tracking-wider">
                  <Info size={12} /> Wholesale Tier info:
                </p>
                <div className="flex gap-4">
                    {b2bTiers.map((tier, idx) => (
                        <div key={idx} className={`text-[11px] ${quantity === tier.minQty ? "text-primary font-bold" : "text-secondary/40"}`}>
                            {tier.minQty}+ : {formatPrice(tier.price)}
                        </div>
                    ))}
                </div>
            </div>
          )}
        </div>

        <div className="pt-10 border-t border-secondary/10 dark:border-foreground/10">
            <h3 className="text-[12px] font-bold text-secondary dark:text-foreground uppercase tracking-wider mb-4">Product Story</h3>
            <p className="text-[14px] text-secondary/80 dark:text-foreground/80 leading-[1.8] mb-8">{product.description}</p>
            <div className="grid grid-cols-2 gap-y-6 pt-6 border-t border-secondary/5">
                <div>
                    <span className="text-[14px] text-secondary/50 dark:text-foreground/50 uppercase block mb-1 tracking-tighter">Fabric</span>
                    <span className="text-[13px] font-medium text-secondary dark:text-foreground">{product.attributes.fabric}</span>
                </div>
                <div>
                    <span className="text-[14px] text-secondary/50 dark:text-foreground/50 uppercase block mb-1 tracking-tighter">Season</span>
                    <span className="text-[13px] font-medium text-secondary dark:text-foreground">{product.season}</span>
                </div>
                <div>
                    <span className="text-[14px] text-secondary/50 dark:text-foreground/50 uppercase block mb-1 tracking-tighter">Gender</span>
                    <span className="text-[13px] font-medium text-secondary dark:text-foreground">{product.gender}</span>
                </div>
                <div>
                    <span className="text-[14px] text-secondary/50 dark:text-foreground/50 uppercase block mb-1 tracking-tighter">Segment</span>
                    <span className="text-[13px] font-medium text-secondary dark:text-foreground">{product.segment}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;