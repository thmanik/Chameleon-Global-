"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const CartContainer = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { formatPrice } = useCurrency();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-64 flex items-center justify-center font-bold uppercase tracking-widest text-secondary/20">Loading...</div>;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-secondary/5 rounded-sm">
        <ShoppingBag size={40} className="text-secondary/10 mb-4" />
        <p className="text-secondary/40 font-bold uppercase tracking-widest text-xs mb-6">Your bag is empty</p>
        <Link href="/shop" className="bg-secondary text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-all">
           Shop Now
        </Link>
      </div>
    );
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8">
        {cart.map((item) => (
          <CartItem 
            key={item.cartItemId} 
            item={item} 
            formatPrice={formatPrice} 
            onRemove={removeFromCart}
            onUpdateQty={updateQuantity}
          />
        ))}
      </div>
      <div className="lg:col-span-4">
        <OrderSummary subtotal={subtotal} formatPrice={formatPrice} />
      </div>
    </div>
  );
};

export default CartContainer;