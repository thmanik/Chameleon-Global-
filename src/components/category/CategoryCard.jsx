import Link from "next/link";

const CategoryCard = ({ cat }) => {
  return (
    <Link
      href={`/shop?category=${cat.name.toLowerCase()}`}
      className="min-w-[calc(50%-6px)] md:min-w-[220px] snap-start group"
    >
      <div className="relative h-[240px] md:h-[320px] overflow-hidden bg-gray-100 rounded-sm shadow-sm">
        <img
          src={cat.image}
          alt={cat.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

        <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
          <h3 className="text-white text-xs md:text-base font-bold uppercase tracking-tight leading-tight">
            {cat.name}
          </h3>
          <div className="h-[2px] w-0 group-hover:w-full bg-primary transition-all duration-300 mt-1" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;