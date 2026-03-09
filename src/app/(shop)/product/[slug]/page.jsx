"use client";
import React, { useEffect, useState, use } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import ProductGallery from "@/components/product-details/ProductGallery";
import ProductInfo from "@/components/product-details/ProductInfo";
import { useCurrency } from "@/context/CurrencyContext";
import { useProducts } from "@/context/ProductContext";
import Loading from "@/components/ui/Loading";

const ProductPage = ({ params }) => {
  const { slug } = use(params);
  const { products, loading } = useProducts();
  const { formatPrice } = useCurrency();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!loading && products?.length > 0) {
      const found = products.find(p => p.slug.trim().toLowerCase() === slug?.trim().toLowerCase());
      setProduct(found);
    }
  }, [products, slug, loading]);

  if (loading) return (
    <div className="w-full h-[75vh] min-h-[500px] mt-4 rounded-2xl overflow-hidden">
        <Loading text="Refining details..." />
      </div>
  );

  if (!product) return (
    <div className="h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <AlertCircle size={48} className="text-secondary/10 mb-6" />
      <h2 className="text-secondary dark:text-foreground text-xl font-semibold mb-2">
        Oops! Product not found.
      </h2>
      <p className="text-secondary/40 text-sm max-w-xs leading-relaxed">
        The item you're looking for might have been moved or is currently unavailable.
      </p>
    </div>
  );

  return (
    <main className="container mx-auto px-4 lg:px-20 py-12 md:py-20 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <ProductGallery
          baseImage={product.base_image} 
          gallery={product.gallery} 
          name={product.name}
        />
        <ProductInfo
          product={product} 
          formatPrice={formatPrice} 
        />
      </div>
    </main>
  );
};

export default ProductPage;