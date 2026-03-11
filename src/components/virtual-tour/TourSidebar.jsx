import { ChevronRight, RotateCw, Sparkles } from "lucide-react";

const TourSidebar = ({ rooms, activeRoom, isMenuOpen, onRoomChange }) => {
  return (
    <div className={`absolute top-0 left-0 h-full z-40 transition-all duration-700 ease-in-out bg-[#050b18]/95 backdrop-blur-xl border-r border-white/5 flex flex-col shadow-2xl
      ${isMenuOpen ? 'w-full md:w-80 translate-x-0 opacity-100' : 'w-0 -translate-x-full opacity-0 pointer-events-none'}
    `}>
      <div className="w-80 p-6 pt-24 md:pt-32 flex flex-col h-full shrink-0">
        
        <div className="mb-8 border-b border-white/5 pb-6">
          <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-tight text-white">
            Chameleon <br/> 
            <span className="text-primary tracking-[0.3em] text-[10px] font-bold">Virtual Lab</span>
          </h1>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar text-white">
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 ml-2">Showroom Areas</p>
          
          {Object.values(rooms).map((room) => {
            const isActive = activeRoom.id === room.id;
            return (
              <button
                key={room.id}
                onClick={() => onRoomChange(room.id)}
                className={`w-full flex items-center cursor-pointer justify-between px-4 py-3 rounded-xl transition-all duration-300 border ${
                  isActive 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                  : "text-gray-400 border-transparent hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`${isActive ? "text-white" : "text-primary/60"}`}>
                    {room.icon}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest">
                    {room.name}
                  </span>
                </div>
                <ChevronRight size={14} className={`transition-transform duration-300 ${isActive ? "opacity-100 rotate-90" : "opacity-0 -translate-x-2"}`} />
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary/70 italic font-bold text-[9px] uppercase tracking-[0.2em]">
            <RotateCw size={12} className="animate-spin-slow" />
            Live Discovery
          </div>
          <Sparkles size={12} className="text-yellow-500/40" />
        </div>
      </div>
    </div>
  );
};

export default TourSidebar;