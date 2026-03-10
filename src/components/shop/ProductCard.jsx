"use client";

import Link from "next/link";
import { ShoppingBag, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isB2B } = useProducts(); 
  const router = useRouter();

  const currentPrice = isB2B 
    ? product.b2b_info.tiers[0].price 
    : (product.sale_price || product.base_price);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const quantity = isB2B ? product.b2b_info.moq : 1;
    const size = product.attributes.sizes[0] || "M";

    addToCart(product, quantity, size, isB2B, currentPrice);
    router.push("/cart");
  };

  return (
    <div className="group relative bg-white border border-gray-100 p-2 rounded-sm shadow-sm">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm">
        <img
          src={product.base_image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/5" />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          <button 
            onClick={handleAddToCart}
            className="p-3 bg-white text-secondary border border-gray-200 shadow-xl hover:bg-primary hover:text-white rounded-full transition-all active:scale-95 flex items-center justify-center"
          >
            <ShoppingBag size={18} />
          </button>
          
          <Link 
            href={`/product/${product.slug}`}
            className="p-3 bg-white text-secondary border border-gray-100 shadow-xl hover:bg-primary hover:text-white rounded-full transition-all active:scale-95 flex items-center justify-center"
          >
            <Eye size={18} />
          </Link>
        </div>

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-secondary text-[8px] font-black px-2 py-1 uppercase tracking-widest rounded-sm border border-gray-100 shadow-sm z-10">
          {product.category}
        </div>

        {isB2B ? (
          <div className="absolute top-3 left-3 bg-secondary text-white text-[8px] font-black px-2 py-1 uppercase tracking-tighter z-10">
            B2B Mode
          </div>
        ) : (
          product.base_price > product.sale_price && (
            <div className="absolute top-3 left-3 bg-primary text-white text-[9px] font-black px-2 py-1 uppercase tracking-tighter z-10">
              OFF ${product.base_price - product.sale_price}
            </div>
          )
        )}
      </div>

      <div className="mt-4 space-y-1.5 px-1 pb-2">
        <div>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.1em]">
            {product.gender} • {product.segment}
          </p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-sm font-bold text-secondary uppercase truncate hover:text-primary transition-colors tracking-tighter italic">
              {product.name}
            </h3>
          </Link>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-secondary">
              ${currentPrice}
            </span>
            {!isB2B && product.base_price > product.sale_price && (
              <span className="text-xs text-gray-400 line-through font-medium">
                ${product.base_price}
              </span>
            )}
          </div>
          
          {isB2B && (
            <p className="text-[9px] text-primary font-bold uppercase tracking-tighter mt-1">
              MOQ: {product.b2b_info.moq} Units
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;