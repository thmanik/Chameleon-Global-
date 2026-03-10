const PriceDisplay = ({ salePrice, basePrice, formatPrice, isB2B, currentTierPrice }) => {
  const discount = Math.round(((basePrice - salePrice) / basePrice) * 100);

  return (
    <div className="flex flex-col gap-1 mt-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-secondary dark:text-foreground tracking-tighter">
          {formatPrice && formatPrice(isB2B ? currentTierPrice : salePrice)}
        </span>

       
        {!isB2B && (
          <>
            <span className="text-lg text-secondary/40 dark:text-foreground/40 line-through font-medium">
              {formatPrice && formatPrice(basePrice)}
            </span>
            {discount > 0 && (
              <span className="text-[11px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-sm uppercase">
                {discount}% OFF
              </span>
            )}
          </>
        )}
        
        {isB2B && (
          <span className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest italic">
            Per Unit (Bulk)
          </span>
        )}
      </div>
    </div>
  );
};

export default PriceDisplay;