// "use client";
// import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
// import { productService } from "@/services/productService";

// const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         setLoading(true);
//         const data = await productService.getProducts();
//         setProducts(data);
//       } catch (err) {
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAllData();
//   }, []);

//   const categories = useMemo(() => {
//     if (products.length === 0) return [];
//     return [...new Set(products.map(p => p.category))];
//   }, [products]);

//   return (
//     <ProductContext.Provider value={{ products, categories, loading, error }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export const useProducts = () => {
//   const context = useContext(ProductContext);
//   if (!context) throw new Error("useProducts must be used within ProductProvider");
//   return context;
// };


"use client";
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { productService } from "@/services/productService";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts();
        setProducts(data || []);
      } catch (err) {
        console.error("Context Fetch Error:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);


  const categories = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [...new Set(products.map(p => p.category))];
  }, [products]);

  const getProductBySlug = (slug) => {
    if (!products) return null;
    return products.find(p => p.slug === slug);
  };

  return (
    <ProductContext.Provider value={{ products, categories, loading, error, getProductBySlug }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within ProductProvider");
  return context;
};