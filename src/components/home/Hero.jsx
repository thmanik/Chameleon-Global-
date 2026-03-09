"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import { MoveRight, ShoppingBag, Loader2 } from "lucide-react";
import Loading from "../ui/Loading";

const Hero = () => {
  const { products, loading } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    if (products.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [products]);

  if (loading) {
    return (
      <div className="w-full h-[75vh] min-h-[500px] mt-4 rounded-2xl overflow-hidden">
        <Loading text="Fetching Latest Trends" />
      </div>
    );
  }

  return (
    <section className="relative w-full h-[75vh] min-h-[500px] mt-4 overflow-hidden rounded-2xl bg-secondary group">
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 w-full h-full">
            <img
              src={product.base_image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
          </div>

          <div className="relative h-full container mx-auto px-6 lg:px-12 flex items-center">
            <div className={`max-w-2xl space-y-5 transition-all duration-700 delay-200 ${
              index === currentSlide ? "opacity-100 translate-y-0" : "opacity-100 translate-y-8"
            }`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 backdrop-blur-md rounded-full text-primary text-[10px] font-bold uppercase tracking-widest">
                Featured {product.category}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight uppercase">
                {product.name}
              </h1>

              <p className="text-sm md:text-base text-gray-300 max-w-md font-light leading-relaxed line-clamp-2">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href={`/product/${product.slug}`}
                  className="flex items-center gap-2 bg-primary text-secondary px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white transition-all duration-300"
                >
                  Shop Now <ShoppingBag size={16} />
                </Link>
                <Link
                  href="/shop"
                  className="flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all duration-300"
                >
                  Collection <MoveRight size={16} />
                </Link>
              </div>
            </div>

            <div className="absolute bottom-10 right-10 hidden lg:block text-right">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Price</p>
              <h3 className="text-3xl font-bold text-white">
                {product.price} <span className="text-primary text-sm uppercase">{product.currency}</span>
              </h3>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-500 rounded-full h-1 ${
              index === currentSlide ? "w-8 bg-primary" : "w-4 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;