"use client";

const PriceDisplay = ({ salePrice, basePrice, formatPrice }) => {
  const discount = Math.round(((basePrice - salePrice) / basePrice) * 100);
  
  return (
    <div className="flex items-center gap-3 mt-4">
      <span className="text-2xl font-bold text-secondary dark:text-foreground">
        {formatPrice && formatPrice(salePrice)}
      </span>

      <span className="text-lg text-secondary/40 dark:text-foreground/40 line-through font-medium">
        {formatPrice && formatPrice(basePrice)}
      </span>

      {discount > 0 && (
        <span className="text-[11px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-sm uppercase tracking-wider">
          {discount}% OFF
        </span>
      )}
    </div>
  );
};

export default PriceDisplay;