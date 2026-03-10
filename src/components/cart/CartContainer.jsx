"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Loading from "../ui/Loading";

const CartContainer = () => {
  const { cart } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div>
       <Loading text="Loading Cart"/>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 bg-[#F9F9F7] rounded-sm border border-dashed border-gray-200">
        <div className="p-6 bg-white rounded-full shadow-sm mb-6">
          <ShoppingBag size={40} className="text-secondary/20" />
        </div>
        
        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-8">
          Add some items to start your journey
        </p>
        <Link 
          href="/shop" 
          className="bg-secondary text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-lg active:scale-95"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-[1400px] mx-auto">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20">
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="flex flex-col">
            {cart.map((item) => (
              <CartItem 
                key={item.cartItemId} 
                item={item} 
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <OrderSummary subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
};

export default CartContainer;