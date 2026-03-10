import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({ item, formatPrice, onRemove, onUpdateQty }) => {
  return (
    <div className="flex gap-4 py-6 border-b border-secondary/10 last:border-0 group">
      <div className="relative w-20 h-28 bg-secondary/5 rounded-sm overflow-hidden flex-shrink-0">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xs font-black text-secondary uppercase tracking-tight">{item.name}</h3>
            <p className="text-[9px] text-secondary/50 font-bold uppercase mt-1">
              Size: {item.size} | <span className="text-primary italic">{item.type}</span>
            </p>
          </div>
          <button onClick={() => onRemove(item.cartItemId)} className="text-secondary/20 hover:text-red-500 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex items-center border border-secondary/10 rounded-sm scale-90 origin-left">
            <button 
                onClick={() => onUpdateQty(item.cartItemId, item.quantity - 1)}
                className="p-1.5 hover:bg-secondary/5"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-[11px] font-black">{item.quantity}</span>
            <button 
                onClick={() => onUpdateQty(item.cartItemId, item.quantity + 1)}
                className="p-1.5 hover:bg-secondary/5"
            >
              <Plus size={12} />
            </button>
          </div>
          <p className="text-sm font-black text-secondary">{formatPrice(item.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;