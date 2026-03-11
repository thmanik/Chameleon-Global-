import { Menu, X, ZoomIn } from "lucide-react";

const TourControls = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <>
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="absolute cursor-pointer top-6 left-6 md:top-10 md:left-10 z-50 p-4 bg-secondary text-white rounded-full shadow-2xl hover:bg-primary transition-all active:scale-95 border border-white/10"
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className="absolute bottom-10 right-10 z-10 pointer-events-none bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg hidden md:block">
        <div className="flex items-center gap-3 text-white">
          <ZoomIn size={18} className="text-primary" />
          <p className="text-[10px] font-bold uppercase tracking-widest">Double click to zoom</p>
        </div>
      </div>
    </>
  );
};

export default TourControls;