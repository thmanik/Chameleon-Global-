
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const DesktopMenu = ({ pathname, categories, user }) => {
  return (
    <div className="hidden lg:flex items-center gap-8 text-[15px]">
      <Link
        href="/"
        className={pathname === "/" ? "text-primary" : "text-secondary hover:text-primary"}
      >
        Home
      </Link>

      <div className="relative group py-2">
        <button className="flex items-center gap-1 text-secondary hover:text-primary">
          Categories <ChevronDown size={14} />
        </button>

        <div className="absolute top-full left-0 w-64 bg-white shadow-2xl border border-secondary/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/shop?category=${cat.toLowerCase()}`}
              className="block px-6 py-3 text-sm hover:bg-primary hover:text-white transition-colors border-b border-secondary/5 last:border-none"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <Link
        href="/shop"
        className={pathname === "/shop" ? "text-primary" : "text-secondary hover:text-primary"}
      >
        Shop
      </Link>

      {user.role === "B2B" && (
        <Link href="/bulk" className="text-secondary hover:text-primary">
          Bulk Order
        </Link>
      )}
    </div>
  );
};

export default DesktopMenu;