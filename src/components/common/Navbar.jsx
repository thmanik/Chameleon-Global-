"use client";
import React, { useState, useEffect } from "react"; // useEffect যোগ করা হয়েছে
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useProducts } from "@/context/ProductContext";
import { ShoppingCart, User, Globe, Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { user, switchRole } = useAuth();
  const { currency, setCurrency } = useCurrency();
  const { categories, products, loading } = useProducts();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // স্ক্রল লজিকের জন্য নতুন স্টেট
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathname = usePathname();

  // স্ক্রল হ্যান্ডলার লজিক
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 200) { // ২০০ পিক্সেল স্ক্রল করার পর ইফেক্ট শুরু হবে
        if (window.scrollY > lastScrollY) {
          // নিচে স্ক্রল করলে হাইড হবে
          setIsVisible(false);
        } else {
          // উপরে স্ক্রল করলে শো হবে
          setIsVisible(true);
        }
      } else {
        // একদম উপরে থাকলে সবসময় শো হবে
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const getLinkStyle = (path) => {
    const active = pathname === path;
    return `relative transition-colors duration-300 py-2 ${
      active ? "text-primary" : "text-secondary hover:text-primary"
    }`;
  };

  const getUnderline = (path) => {
    return pathname === path ? (
      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transition-all" />
    ) : null;
  };

  const getSubCategories = (categoryName) => {
    const subs = products
      .filter((p) => p.category === categoryName && p.subCategory)
      .map((p) => p.subCategory);
    return [...new Set(subs)];
  };

  return (
    // 'sticky' এর সাথে 'transition-transform' এবং 'isVisible' লজিক যোগ করা হয়েছে
    <nav className={`bg-white border-b border-secondary/10 sticky top-0 z-[100] transition-transform duration-500 ease-in-out ${
      isVisible ? "translate-y-0" : "-translate-y-full"
    }`}>
      {/* Top Bar */}
      <div className="bg-secondary text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-[12px] font-normal uppercase tracking-wider">
          <p className="hidden sm:block">Quality Apparel Since 1996</p>
          <p className="mx-auto sm:mx-0">
            {user.role === "B2B" ? "Wholesale Portal Active" : "New Collection Live - Shop Now"}
          </p>
          <div className="hidden sm:flex gap-6">
            <span className="cursor-pointer hover:text-primary transition">Track Order</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 lg:px-8 py-5 flex items-center justify-between">
        <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={28} className="text-secondary" />
        </button>

        <Link href="/" className="text-2xl lg:text-3xl font-black text-secondary tracking-tighter">
          CHAMELEON<span className="text-primary">.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10 text-[16px] font-normal tracking-wide">
          <Link href="/" className={getLinkStyle("/")}>
            Home
            {getUnderline("/")}
          </Link>
          
          <div className="relative group">
            <button className={`flex items-center gap-1 py-2 transition-colors ${pathname.includes('category') ? 'text-primary' : 'text-secondary hover:text-primary'}`}>
              Categories <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>
            
            <div className="absolute top-full left-0 w-72 bg-white border border-secondary/5 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-50">
              <div className="py-3 max-h-[70vh] overflow-y-auto">
                {loading ? (
                  <div className="px-6 py-3 text-sm text-secondary/50 italic">Loading...</div>
                ) : (
                  categories.map((cat) => (
                    <div key={cat} className="relative group/sub">
                      <Link
                        href={`/shop?category=${cat.toLowerCase()}`}
                        className="flex justify-between items-center px-6 py-3 text-[15px] text-secondary hover:bg-primary hover:text-white transition-colors border-b border-secondary/5 last:border-none"
                      >
                        {cat}
                        {getSubCategories(cat).length > 0 && <ChevronDown size={14} className="-rotate-90" />}
                      </Link>
                      
                      {getSubCategories(cat).length > 0 && (
                        <div className="absolute top-0 left-full w-56 bg-white border border-secondary/5 shadow-xl opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200">
                          {getSubCategories(cat).map((sub) => (
                            <Link
                              key={sub}
                              href={`/shop?category=${cat.toLowerCase()}&sub=${sub.toLowerCase()}`}
                              className="block px-6 py-3 text-[14px] text-secondary hover:bg-secondary hover:text-white border-b border-secondary/5 last:border-none"
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <Link href="/shop" className={getLinkStyle("/shop")}>
            Shop
            {getUnderline("/shop")}
          </Link>

          {user.role === "B2B" && (
            <Link href="/bulk" className={getLinkStyle("/bulk")}>
              Bulk Order
              {getUnderline("/bulk")}
            </Link>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center gap-2 text-[14px] font-normal text-secondary bg-secondary/5 px-3 py-1.5 rounded-full">
            <Globe size={16} className="text-primary" />
            <select
              value={currency.code}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer appearance-none"
            >
              <option value="USD">USD</option>
              <option value="BDT">BDT</option>
            </select>
          </div>

          <button
            onClick={() => switchRole(user.role === "B2C" ? "B2B" : "B2C")}
            className={`hidden md:block px-6 py-2 rounded-full text-[13px] font-normal uppercase tracking-widest transition-all border ${
              user.role === "B2B"
                ? "bg-primary border-primary text-white"
                : "border-secondary text-secondary hover:bg-secondary hover:text-white"
            }`}
          >
            {user.role === "B2C" ? "B2B Access" : "B2C View"}
          </button>

          <div className="flex items-center gap-5 text-secondary">
            <Link href="/cart" className={`relative transition-colors ${pathname === '/cart' ? 'text-primary' : 'hover:text-primary'}`}>
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                0
              </span>
            </Link>
            <Link href="/profile" className={pathname === '/profile' ? 'text-primary' : 'hover:text-primary'}>
              <User size={24} className="hidden lg:block" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className={`fixed inset-y-0 left-0 w-[300px] bg-white transition-transform duration-500 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="p-8 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-10">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-secondary">
                CHAMELEON<span className="text-primary">.</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={30} /></button>
            </div>
            
            <div className="flex flex-col gap-5 text-secondary">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-normal border-b pb-2 ${pathname === '/' ? 'text-primary' : ''}`}>Home</Link>
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-normal border-b pb-2 ${pathname === '/shop' ? 'text-primary' : ''}`}>Shop All</Link>
              <div>
                <p className="text-lg font-normal mb-3 text-primary">Categories</p>
                <div className="pl-4 flex flex-col gap-4">
                  {categories.map(cat => (
                    <div key={cat}>
                      <Link href={`/shop?category=${cat.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-md font-semibold block mb-1">{cat}</Link>
                      <div className="pl-3 border-l flex flex-col gap-2">
                        {getSubCategories(cat).map(sub => (
                           <Link key={sub} href={`/shop?category=${cat.toLowerCase()}&sub=${sub.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-sm opacity-70 hover:text-primary">
                            {sub}
                           </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;