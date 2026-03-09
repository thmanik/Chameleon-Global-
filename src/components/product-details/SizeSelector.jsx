
// const SizeSelector = ({ sizes, selectedSize, onSelect }) => (
//   <div className="space-y-4">
//     <div className="flex justify-between items-center text-[12px] font-bold uppercase tracking-wider">
//       <span className="text-secondary dark:text-foreground">Size</span>
//       <button className="text-secondary/40 hover:text-primary underline underline-offset-4 transition-colors">
//         Size Guide
//       </button>
//     </div>
//     <div className="flex flex-wrap gap-2">
//       {sizes?.map((size) => (
//         <button 
//           key={size} 
//           onClick={() => onSelect(size)}
//           className={`h-12 min-w-[3.5rem] px-4 rounded-sm text-xs font-semibold transition-all border duration-300 ${
//             selectedSize === size 
//             ? "bg-primary text-white border-primary shadow-sm" 
//             : "bg-background border-secondary/20 text-secondary/70 dark:text-foreground/70 hover:border-primary/50"
//           }`}
//         >
//           {size}
//         </button>
//       ))}
//     </div>
//   </div>
// );

// export default SizeSelector;


const SizeSelector = ({ sizes, selectedSize, onSelect }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center text-[12px] font-black uppercase tracking-widest ">
      <span className="text-secondary dark:text-foreground">Select Size</span>
      <button className="text-secondary/40 hover:text-primary underline underline-offset-4 transition-all uppercase">
        Size Guide
      </button>
    </div>
    <div className="flex flex-wrap gap-2">
      {sizes?.map((size) => (
        <button 
          key={size} 
          onClick={() => onSelect(size)}
          className={`h-12 min-w-[3.5rem] cursor-pointer px-4 rounded-sm text-xs font-bold transition-all border duration-300 uppercase ${
            selectedSize === size 
            ? "bg-secondary text-white border-secondary shadow-md scale-[1.02]" 
            : "bg-background border-secondary/10 text-secondary/60 hover:border-secondary/30"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  </div>
);

export default SizeSelector;