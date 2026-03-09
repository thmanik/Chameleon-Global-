"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import { useCurrency } from "@/context/CurrencyContext";
import { 
  ShoppingCart, 
  Loader2,
  Plus,
  Minus,
  AlertCircle,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck
} from "lucide-react";

const ProductDetails = ({ params }) => {
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug;
  
  const router = useRouter();
  const { products, loading } = useProducts();
  const { formatPrice } = useCurrency();
  
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (!loading && products?.length > 0) {
      const foundProduct = products.find(
        (p) => p.slug.trim().toLowerCase() === slug?.trim().toLowerCase()
      );
      
      if (foundProduct) {
        setProduct(foundProduct);
        setActiveImage(foundProduct.base_image);
        if(foundProduct.attributes?.sizes?.length > 0) {
            setSelectedSize(foundProduct.attributes.sizes[0]);
        }
      }
    }
  }, [products, slug, loading]);

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-gray-400" size={30} />
        <p className="text-gray-500 text-sm font-medium">Loading details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center px-4">
        <AlertCircle size={40} className="text-gray-300 mb-4" />
        <h2 className="text-lg font-semibold text-gray-800">Product not found</h2>
        <button 
          onClick={() => router.push('/')}
          className="mt-6 border border-gray-200 text-gray-600 px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const discountPercentage = Math.round(((product.base_price - product.sale_price) / product.base_price) * 100);

  return (
    <main className="container mx-auto px-4 lg:px-20 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Left: Product Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-50 relative group">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
            <button className="absolute top-5 right-5 p-2.5 bg-white/80 backdrop-blur-sm shadow-sm rounded-full hover:bg-white transition-colors">
              <Heart size={18} className="text-gray-600" />
            </button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {[product.base_image, ...(product.gallery || [])].map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border transition-all ${
                  activeImage === img ? "border-gray-800" : "border-gray-100 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <p className="text-sm font-medium text-gray-400 mb-2">{product.category}</p>
            <h1 className="text-3xl font-semibold text-gray-900 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 mt-4">
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice && formatPrice(product.sale_price)}
              </span>
              <span className="text-lg text-gray-400 line-through">
                {formatPrice && formatPrice(product.base_price)}
              </span>
              {discountPercentage > 0 && (
                <span className="text-xs font-semibold bg-red-50 text-red-600 px-2 py-1 rounded">
                  -{discountPercentage}%
                </span>
              )}
            </div>
          </div>

          <div className="space-y-8">
            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Size</span>
                <button className="text-xs text-gray-400 underline underline-offset-4">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.attributes.sizes.map(size => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 min-w-[3rem] px-4 rounded-md text-sm transition-all border ${
                      selectedSize === size 
                      ? "bg-gray-900 text-white border-gray-900" 
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & CTA */}
            <div className="flex gap-3">
              <div className="flex items-center border border-gray-200 rounded-md px-3">
                <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="p-2 text-gray-400 hover:text-gray-900"><Minus size={16}/></button>
                <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(q => q+1)} className="p-2 text-gray-400 hover:text-gray-900"><Plus size={16}/></button>
              </div>
              
              <button className="flex-1 bg-gray-900 text-white font-medium py-4 rounded-md text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                <ShoppingCart size={18} /> Add to Bag
              </button>
            </div>

            <hr className="border-gray-100" />

            {/* Description & Details */}
            <div className="space-y-4">
              <p className="text-sm text-gray-500 leading-relaxed italic">
                A refined take on the classic {product.category.toLowerCase()}. Made from premium {product.attributes.fabric.toLowerCase()}, this piece is designed for lasting comfort throughout the {product.season.toLowerCase()}.
              </p>
              
              <div className="grid grid-cols-2 gap-y-3 pt-2">
                <div className="text-xs"><span className="text-gray-400">Material:</span> <span className="text-gray-700 ml-1 font-medium">{product.attributes.fabric}</span></div>
                <div className="text-xs"><span className="text-gray-400">Season:</span> <span className="text-gray-700 ml-1 font-medium">{product.season}</span></div>
                <div className="text-xs"><span className="text-gray-400">Gender:</span> <span className="text-gray-700 ml-1 font-medium">{product.gender}</span></div>
                <div className="text-xs"><span className="text-gray-400">Segment:</span> <span className="text-gray-700 ml-1 font-medium">{product.segment}</span></div>
              </div>
            </div>

            {/* Trust Badges - Simplified */}
            <div className="flex justify-between pt-6 border-t border-gray-50">
              <div className="flex items-center gap-2 text-gray-400">
                <Truck size={16} />
                <span className="text-[10px] font-medium uppercase tracking-wider">Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <RotateCcw size={16} />
                <span className="text-[10px] font-medium uppercase tracking-wider">30 Days Return</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-medium uppercase tracking-wider">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;