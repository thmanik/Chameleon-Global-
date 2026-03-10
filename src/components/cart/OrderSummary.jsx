
import React from "react";
import { ArrowRight } from "lucide-react";

const OrderSummary = ({ subtotal }) => {
  const delivery = subtotal > 500 ? 0 : 6.99;
  const total = subtotal + delivery;

  return (
    <div className="bg-[#F9F9F7] rounded-lg p-6 md:p-8 sticky top-32 shadow-sm">
      <h2 className="text-lg md:text-xl font-semibold text-[var(--color-secondary)] mb-6 border-b border-gray-200 pb-3">
        Order Summary
      </h2>

      <div className="space-y-4 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-[var(--color-secondary)]">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span className="font-semibold text-[var(--color-secondary)]">
            {delivery === 0 ? "FREE" : `$${delivery.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Tax</span>
          <span className="font-semibold text-[var(--color-secondary)]">—</span>
        </div>

        <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 text-base md:text-lg font-semibold text-[var(--color-secondary)]">
          <span>Total</span>
          <span className="text-[var(--color-primary)]">${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full cursor-pointer mt-6 bg-primary text-white py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition hover:bg-[var(--color-primary)] active:scale-[0.98]">
        Proceed to Checkout
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </button>

     

      <p className="mt-6 text-xs text-center text-gray-400 leading-relaxed">
        Secure transactions with Chameleon Global.<br />
        Taxes and shipping calculated at the next step.
      </p>
    </div>
  );
};

export default OrderSummary;