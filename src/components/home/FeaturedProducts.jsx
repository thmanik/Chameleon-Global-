"use client";

import React from "react";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import { ArrowRight } from "lucide-react";
import ProductCard from "../shop/ProductCard";
import Loading from "../ui/Loading";

const FeaturedProducts = () => {
  const { products, loading } = useProducts();
  const featuredDrops = products?.slice(0, 4) || [];

  
  if (loading) {
    return(
        <div>
            <Loading text="Loading Feature Products"/>
        </div>
    )
  }

  return (
    <section className=" py-2 md:py-6 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-secondary">
              Latest 
              <span className="text-primary"> Drops</span>
            </h2>
            <p className="mt-3 text-xs md:text-sm text-gray-500 font-medium tracking-wide">
              Directly synced from our global inventory
            </p>
          </div>

          <Link 
            href="/shop" 
            className="group flex items-center gap-2 text-xs md:text-sm font-bold text-secondary hover:text-primary transition-all border-b-2 border-secondary hover:border-primary pb-1"
          >
            Shop All Collections <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {featuredDrops.length > 0 ? (
            featuredDrops.map((product) => (
              <ProductCard 
                key={product._id || product.id} 
                product={product} 
              />
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-gray-400 font-medium text-xs tracking-wide">
              No featured products available at the moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;