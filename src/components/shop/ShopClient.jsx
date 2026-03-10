"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import { Filter, X } from "lucide-react";
import ProductCard from "./ProductCard";
import Loading from "../ui/Loading";

export default function ShopClient({ initialCategory }) {
  const { products = [], loading } = useProducts();
  const searchParams = useSearchParams();
  
  const categoryFromUrl = searchParams.get("category")?.toLowerCase() || "all";

  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    setActiveCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const categories = useMemo(() => {
    if (!products.length) return ["all"];
    const cats = Array.from(
      new Set(products.map((p) => p.category.toLowerCase()))
    );
    return ["all", ...cats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter(
      (p) => p.category.toLowerCase() === activeCategory
    );
  }, [products, activeCategory]);

  if (loading)
    return (
      <div>
        <Loading text="Loading Products"/>
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <aside className="hidden lg:block w-64">
        <div className="sticky top-28 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-secondary italic">
            Categories
          </h3>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-left text-xs font-bold uppercase py-3 px-4 transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-secondary text-white translate-x-2 shadow-lg"
                    : "text-gray-500 hover:bg-gray-50 hover:text-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-8 border-b pb-6">
          <h1 className="text-2xl font-black text-secondary uppercase italic tracking-tighter">
            {activeCategory === "all" ? "Our Collection" : activeCategory}
          </h1>

          <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {filteredProducts.length} Items
            </span>

            <button
              onClick={() => setShowMobileFilter(true)}
              className="lg:hidden flex items-center gap-2 text-xs font-black uppercase tracking-widest text-secondary cursor-pointer"
            >
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {filteredProducts.length
            ? filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            : (
              <div className="col-span-full text-center py-32 text-gray-400 uppercase text-xs font-bold tracking-widest">
                No products found.
              </div>
            )}
        </div>
      </div>

      {showMobileFilter && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="absolute left-0 top-0 h-full w-80 bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-10">
              <span className="font-black text-xl text-secondary uppercase italic tracking-tighter">
                Categories
              </span>
              <button 
                onClick={() => setShowMobileFilter(false)} 
                className="p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setShowMobileFilter(false);
                  }}
                  className={`text-left text-xs font-bold uppercase py-4 px-5 transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-primary text-white"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}