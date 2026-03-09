"use client";
import { Plus, Minus } from "lucide-react";

const QuantitySelector = ({ quantity, setQuantity }) => (
  <div className="flex items-center border border-secondary/20 dark:border-foreground/20 rounded-sm px-2 h-full bg-background">
    <button 
      onClick={() => setQuantity(Math.max(1, quantity - 1))} 
      className="p-2 text-secondary/40 dark:text-foreground/40 hover:text-primary transition-colors"
    >
      <Minus size={14}/>
    </button>
    
    <span className="w-8 text-center text-sm font-semibold text-secondary dark:text-foreground">
      {quantity}
    </span>
    
    <button 
      onClick={() => setQuantity(quantity + 1)} 
      className="p-2 text-secondary/40 dark:text-foreground/40 hover:text-primary transition-colors"
    >
      <Plus size={14}/>
    </button>
  </div>
);

export default QuantitySelector;