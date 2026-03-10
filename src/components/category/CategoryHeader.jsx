import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoryHeader = ({ onScroll }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-xl md:text-2xl lg:text-3xl  font-bold text-secondary capitalize tracking-tighter">
          Shop by <span className="text-primary">Category</span>
        </h2>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onScroll("left")}
          className="p-2 border border-gray-200 cursor-pointer rounded-full transition-all duration-300 hover:bg-primary hover:border-primary hover:text-white active:scale-95"
          aria-label="Scroll Left"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => onScroll("right")}
          className="p-2 border cursor-pointer border-gray-200 rounded-full transition-all duration-300 hover:bg-primary hover:border-primary hover:text-white active:scale-95"
          aria-label="Scroll Right"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CategoryHeader;