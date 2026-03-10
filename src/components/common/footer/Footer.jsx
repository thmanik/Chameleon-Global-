
import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Newsletter from "../footer/Newsletter";

async function getFooterCategories() {
  return ["Men", "Women", "Accessories", "Bulk Orders", "New Arrivals"];
}

const Footer = async () => {
  const categories = await getFooterCategories();
  const currentYear = new Date().getFullYear();

  const links = {
    support: [
      { name: "Track Order", href: "/track-order" },
      { name: "Shipping Policy", href: "/shipping" },
      { name: "Return & Exchange", href: "/returns" },
      { name: "FAQs", href: "/faqs" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact Us", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  };

  return (
    <footer className="bg-[#000000] text-primary pt-16 mt-20">
      <div className="mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          <div className="lg:col-span-4 space-y-6">
            <Link
              href="/"
              className="text-3xl font-black tracking-tighter uppercase text-[var(--primary)]"
            >
              CHAMELEON
              <span className="text-[var(--background)]">.</span>
            </Link>
            <p className="text-sm text-[var(--background)]/70 leading-relaxed max-w-sm">
              Premium apparel since 1996. We blend timeless style with modern craftsmanship.
            </p>
            <SocialLinks />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
              Shop
            </h4>
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/shop?category=${cat.toLowerCase()}`}
                    className="text-sm text-[var(--background)]/70 hover:text-[var(--primary)] transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
              Support
            </h4>
            <ul className="space-y-4">
              {links.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--background)]/70 hover:text-[var(--primary)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
              Join the club
            </h4>
            <p className="text-sm text-[var(--background)]/70">
              Subscribe to get special offers and first look at new arrivals.
            </p>
            <Newsletter />
          </div>
        </div>

  
        <div className=" py-1 md:py-2 mx-auto border-t border-primary/40  gap-6">
          <p className="text-[10px] font-medium mx-auto text-white uppercase tracking-widest">
            © {currentYear} Chameleon Apparel Ltd.
          </p>
          
        </div>
      </div>
    </footer>
  );
};


const SocialLinks = () => (
  <div className="flex items-center gap-4">
    {[Facebook, Instagram, Twitter].map((Icon, i) => (
      <Link
        key={i}
        href="#"
        className="w-10 h-10 rounded-full border border-[var(--background)]/20 flex items-center justify-center hover:bg-[var(--primary)] hover:text-[var(--foreground)] transition-all"
      >
        <Icon size={18} />
      </Link>
    ))}
  </div>
);

export default Footer;