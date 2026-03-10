import React from "react";

const OrderSummary = ({ subtotal, formatPrice }) => {
  return (
    <div className="bg-secondary/5 p-6 rounded-sm sticky top-32 border border-secondary/5">
      <h2 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 border-b border-secondary/10 pb-4 text-secondary">
        Order Summary
      </h2>
      
      <div className="space-y-5">
        <div className="flex justify-between items-center text-xs">
          <span className="text-secondary/50 font-bold uppercase tracking-tighter">Subtotal</span>
          <span className="font-black text-secondary">{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between items-center text-xs">
          <span className="text-secondary/50 font-bold uppercase tracking-tighter">Shipping</span>
          <span className="text-[9px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-2 py-1 rounded-sm">
            Calculated at Checkout
          </span>
        </div>

        <div className="pt-6 border-t border-secondary/10 flex justify-between items-end">
          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-secondary">Estimated Total</span>
          <div className="text-right">
            <span className="text-2xl font-black text-secondary leading-none block">
              {formatPrice(subtotal)}
            </span>
          </div>
        </div>
      </div>

      <button className="w-full mt-10 bg-secondary text-white py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all active:scale-[0.98] shadow-sm">
        Proceed to Checkout
      </button>
      
      <p className="mt-4 text-[9px] text-center text-secondary/30 font-medium uppercase tracking-tighter">
        Taxes and shipping calculated at next step
      </p>
    </div>
  );
};

export default OrderSummary;