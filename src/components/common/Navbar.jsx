"use client";
import React, { useState, useEffect } from "react"; 
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useProducts } from "@/context/ProductContext";
import { ShoppingCart, User, Globe, Menu, X, ChevronDown } from "lucide-react";

// --- Sub-Component: TopBar ---
const TopBar = ({ user }) => (
  <div className="bg-secondary text-white py-2 px-4">
    <div className="container mx-auto flex justify-between items-center text-[10px] md:text-[12px] font-normal uppercase tracking-wider">
      <p className="hidden sm:block">Quality Apparel Since 1996</p>
      <p className="mx-auto sm:mx-0">
        {user.role === "B2B" ? "Wholesale Portal Active" : "New Collection Live - Shop Now"}
      </p>
      <div className="hidden sm:flex gap-6">
        <span className="cursor-pointer hover:text-primary transition">Track Order</span>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const { user, switchRole } = useAuth();
  const { currency, setCurrency } = useCurrency();
  const { categories, products, loading } = useProducts();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 200) {
        setIsVisible(window.scrollY < lastScrollY);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const getSubCategories = (categoryName) => {
    const subs = products
      .filter((p) => p.category === categoryName && p.subCategory)
      .map((p) => p.subCategory);
    return [...new Set(subs)];
  };

  return (
    <nav className={`bg-white border-b border-secondary/10 sticky top-0 z-[100] transition-transform duration-500 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
      <TopBar user={user} />

      <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
     
        <button className="lg:hidden p-2 -ml-2 text-secondary" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>

        
        <Link href="/" className="text-xl lg:text-2xl font-black text-secondary tracking-tighter">
          CHAMELEON<span className="text-primary">.</span>
        </Link>

       
        <div className="hidden lg:flex items-center gap-8 text-[15px]">
          <Link href="/" className={`${pathname === '/' ? 'text-primary' : 'text-secondary hover:text-primary'}`}>Home</Link>
          
          <div className="relative group py-2">
            <button className="flex items-center gap-1 text-secondary hover:text-primary">
              Categories <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 w-64 bg-white shadow-2xl border border-secondary/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {categories.map(cat => (
                <Link key={cat} href={`/shop?category=${cat.toLowerCase()}`} className="block px-6 py-3 text-sm hover:bg-primary hover:text-white transition-colors border-b border-secondary/5 last:border-none">
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/shop" className={`${pathname === '/shop' ? 'text-primary' : 'text-secondary hover:text-primary'}`}>Shop</Link>
          {user.role === "B2B" && <Link href="/bulk" className="text-secondary hover:text-primary">Bulk Order</Link>}
        </div>

      
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-secondary/5 px-3 py-1 rounded-full text-xs">
            <Globe size={14} className="text-primary" />
            <select value={currency.code} onChange={(e) => setCurrency(e.target.value)} className="bg-transparent focus:outline-none cursor-pointer">
              <option value="USD">USD</option>
              <option value="BDT">BDT</option>
            </select>
          </div>

          <button onClick={() => switchRole(user.role === "B2C" ? "B2B" : "B2C")} className="hidden sm:block text-[11px] font-bold uppercase tracking-widest px-4 py-2 border border-secondary/20 rounded-full hover:bg-secondary hover:text-white transition-all">
            {user.role === "B2C" ? "B2B" : "B2C"}
          </button>

          <div className="flex items-center gap-4 text-secondary">
            <Link href="/cart" className="relative hover:text-primary">
              <ShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
            <Link href="/profile" className="hidden lg:block hover:text-primary"><User size={22} /></Link>
          </div>
        </div>
      </div>

    
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] transition-opacity ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className={`fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-white shadow-2xl transition-transform duration-500 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col`}>
          
        
          <div className="p-6 border-b flex justify-between items-center bg-white sticky top-0 z-10">
            <span className="text-xl font-black text-secondary uppercase italic">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-secondary/5 rounded-full">
              <X size={24} />
            </button>
          </div>

          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            <div className="flex flex-col gap-4 border-b pb-6">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Home</Link>
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Shop All</Link>
            </div>

            <div className="space-y-4">
              <p className="text-[11px] font-bold text-primary uppercase tracking-widest">Categories</p>
              {categories.map(cat => (
                <div key={cat} className="space-y-3">
                  <Link href={`/shop?category=${cat.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-md font-semibold text-secondary block">
                    {cat}
                  </Link>
                  <div className="grid grid-cols-1 gap-2 pl-4 border-l-2 border-secondary/5">
                    {getSubCategories(cat).map(sub => (
                      <Link key={sub} href={`/shop?category=${cat.toLowerCase()}&sub=${sub.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-secondary/60 hover:text-primary">
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

      
          <div className="p-6 bg-secondary/5 border-t space-y-4">
             <button onClick={() => { switchRole(user.role === "B2C" ? "B2B" : "B2C"); setIsMobileMenuOpen(false); }} className="w-full py-3 bg-secondary text-white text-xs font-bold uppercase tracking-widest rounded-sm">
               Switch to {user.role === "B2C" ? "Wholesale" : "Retail"}
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;