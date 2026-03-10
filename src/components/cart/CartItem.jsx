"use client";

import Image from "next/image";
import { Trash2, ChevronDown, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, addToCart } = useCart();

  const itemPrice = item?.price || 0;
  const isB2B = item.type === "B2B";
  const quantities = isB2B ? [15, 30, 50, 100, 200] : [1,2,3,4,5,6,7,8,9,10];

  const handleQtyChange = (newQty) => {
    if (newQty < 1) return;
    addToCart(
      { id: item.id, name: item.name, base_image: item.image, slug: item.slug },
      newQty,
      item.size,
      isB2B,
      itemPrice
    );
  };

  return (
    <div className="flex gap-5 md:gap-8 py-6 border-b border-gray-100">

      <div className="relative w-24 h-32 md:w-32 md:h-40 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
        <Image
          src={item.image || "/placeholder.png"}
          alt={item.name}
          fill
          className="object-cover hover:scale-105 transition duration-300"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">

        <div className="flex justify-between gap-4">

          <div className="space-y-2">

            <span className={`inline-block text-[11px] px-2 py-1 rounded ${
              isB2B ? "bg-[var(--color-primary)] text-white" : "bg-gray-100 text-gray-700"
            }`}>
              {isB2B ? "Wholesale" : "Retail"}
            </span>

            <h3 className="text-sm md:text-base font-semibold text-[var(--color-secondary)]">
              {item.name}
            </h3>

            <p className="text-xs text-gray-500">
              Size: {item.size}
            </p>

            <p className="text-xs text-gray-500">
              Unit Price: ${itemPrice.toFixed(2)}
            </p>

            <div className="flex items-center gap-3 pt-2">

              <div className="relative">
                <select
                  value={item.quantity}
                  onChange={(e) => handleQtyChange(parseInt(e.target.value))}
                  className="appearance-none border border-gray-200 rounded-md text-sm px-3 py-1 pr-7 bg-white outline-none cursor-pointer"
                >
                  {quantities.map((q) => (
                    <option key={q} value={q}>
                      {q} {isB2B ? "Units" : ""}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={14}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>

            </div>

            <div className="flex items-center gap-4 pt-2">
              <button className="text-gray-400 hover:text-[var(--color-primary)] transition">
                <Heart size={18} />
              </button>

              <button
                onClick={() => removeFromCart(item.cartItemId)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>

          </div>

          <div className="text-right flex flex-col justify-between">
            <p className="text-base md:text-lg font-semibold text-[var(--color-secondary)]">
              ${(itemPrice * item.quantity).toFixed(2)}
            </p>

            {isB2B && (
              <p className="text-[11px] text-[var(--color-primary)] mt-1">
                Wholesale price applied
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default CartItem;