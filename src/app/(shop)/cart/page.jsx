
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CartContainer from "@/components/cart/CartContainer";


export const metadata = {
  title: "Your Cart | Chameleon Global",
  description: "Review your selected items before checkout.",
};

export default function CartPage() {
  return (
    <section className="min-h-screen py-3 md:py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10 border-b border-secondary/10 pb-6">
          <h1 className="text-xl md:text-2xl font-black ms-1 md:ms-5 text-secondary tracking-tighter uppercase leading-none">
            Cart<span className="text-primary">.</span>
          </h1>
          <Link 
            href="/shop" 
            className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} /> Back to Shop
          </Link>
        </div>
        <CartContainer />
      </div>
    </section>
  );
}