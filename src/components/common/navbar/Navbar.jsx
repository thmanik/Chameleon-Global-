
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, User, Globe } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext"; 
import DesktopMenu from "./DesktopMenu";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const Navbar = () => {
  const { user, switchRole } = useAuth();
  const { currency, setCurrency } = useCurrency();
  const { categories, products } = useProducts();
  const { cartCount } = useCart(); 

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
    <nav
      className={`bg-white border-b border-secondary/10 sticky top-0 z-[100] transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <TopBar user={user} />

      <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
        <button
          className="lg:hidden p-2 -ml-2 text-secondary"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        <Link
          href="/"
          className="text-xl lg:text-2xl font-black text-secondary tracking-tighter"
        >
          CHAMELEON<span className="text-primary">.</span>
        </Link>

        <DesktopMenu
          pathname={pathname}
          categories={categories}
          user={user}
        />

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-secondary/5 px-3 py-1 rounded-full text-xs">
            <Globe size={14} className="text-primary" />
            <select
              value={currency.code}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="USD">USD</option>
              <option value="BDT">BDT</option>
            </select>
          </div>

          <button
            onClick={() =>
              switchRole(user.role === "B2C" ? "B2B" : "B2C")
            }
            className="hidden sm:block text-[11px] font-bold uppercase tracking-widest px-4 py-2 border border-secondary/20 rounded-full hover:bg-secondary hover:text-white transition-all"
          >
            {user.role === "B2C" ? "B2B" : "B2C"}
          </button>

          <div className="flex items-center gap-4 text-secondary">
            <Link href="/cart" className="relative hover:text-primary">
              <ShoppingCart size={22} />
              
             
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/profile"
              className="hidden lg:block hover:text-primary"
            >
              <User size={22} />
            </Link>
          </div>
        </div>
      </div>

      <Sidebar
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        categories={categories}
        getSubCategories={getSubCategories}
        user={user}
        switchRole={switchRole}
      />
    </nav>
  );
};

export default Navbar;