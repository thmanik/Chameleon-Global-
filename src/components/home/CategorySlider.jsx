"use client";

import { useMemo, useRef } from "react";
import { useProducts } from "@/context/ProductContext"; 
import CategoryHeader from "../category/CategoryHeader";
import CategoryCard from "../category/CategoryCard";
import Loading from "../ui/Loading";



export default function CategorySlider() {
  const { products, loading } = useProducts();
  const sliderRef = useRef(null);

  const categories = useMemo(() => {
    if (!products) return [];
    const categoryMap = {};
    products.forEach((product) => {
      if (!categoryMap[product.category]) {
        categoryMap[product.category] = {
          name: product.category,
          image: product.base_image,
        };
      }
    });
    return Object.values(categoryMap);
  }, [products]);

  const handleScroll = (direction) => {
    const container = sliderRef.current;
    if (container) {
      const scrollAmount = window.innerWidth < 768 ? 200 : 350;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <Loading text="Fetching Categories"/>; 

  return (
    <section className="py-2 md:py-0.5 bg-white">
      <div className="w-full mx-auto px-1">
        
        <CategoryHeader onScroll={handleScroll} />

       
        <div
          ref={sliderRef}
          className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          
          <style jsx>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none; /* Firefox */
            }
          `}</style>

          {categories.map((cat) => (
            <CategoryCard key={cat.name} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}