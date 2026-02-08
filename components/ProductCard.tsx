"use client";

import Image from "next/image";
import { Product } from "@/lib/types";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, Check, Plus, Minus } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      unit: product.unit,
      image: product.image,
      type: "product",
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* صورة المنتج - تقليل الارتفاع في الموبايل */}
      <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* حالة التوفر - تصغير الخط في الموبايل */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10 text-center p-2">
            <span className="bg-white text-red-600 px-2 py-1 md:px-5 md:py-1.5 rounded-full text-[10px] md:text-sm font-black shadow-xl transform -rotate-12 border border-red-600">
              غير متوفر
            </span>
          </div>
        )}
      </div>

      {/* معلومات المنتج - تقليل الـ padding في الموبايل */}
      <div className="p-3 md:p-5 flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-1 md:mb-2 gap-1">
          <h3 className="text-sm md:text-lg font-black text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          <span className="text-[10px] md:text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-bold">
            {product.unit}
          </span>
        </div>

        {/* السعر - تصغير الخط في الموبايل */}
        <div className="mb-3 md:mb-5">
          <span className="text-lg md:text-2xl font-black text-green-600 flex items-baseline gap-1">
            {product.price}
            <span className="text-[10px] md:text-sm font-medium">جنيه</span>
          </span>
        </div>

        {product.inStock && (
          <div className="mt-auto space-y-2 md:space-y-4">
            {/* التحكم في الكمية - تبسيط الشكل للموبايل */}
            <div className="flex items-center justify-between bg-gray-50 rounded-lg md:rounded-xl p-1 md:p-2 border border-gray-100">
              <span className="hidden sm:inline text-xs md:text-sm font-bold text-gray-500 mr-1">
                الكمية:
              </span>
              <div className="flex items-center justify-between w-full sm:w-auto gap-1 md:gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-white rounded md:rounded-lg text-gray-600 hover:text-red-500 shadow-sm border border-gray-100"
                >
                  <Minus className="w-3 h-3 md:w-4 md:h-4" />
                </button>
                <span className="text-xs md:text-base font-black text-gray-800 min-w-[1.2rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-white rounded md:rounded-lg text-gray-600 hover:text-green-600 shadow-sm border border-gray-100"
                >
                  <Plus className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </div>
            </div>

            {/* زر الإضافة - تصغير الخط والـ padding */}
            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`w-full py-2 md:py-3.5 rounded-lg md:rounded-xl font-bold flex items-center justify-center gap-1 md:gap-2 transition-all duration-300 transform active:scale-95 shadow-md text-xs md:text-base ${
                added
                  ? "bg-gray-800 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3 h-3 md:w-5 md:h-5" />
                  <span className="truncate">تمت الإضافة</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3 h-3 md:w-5 md:h-5" />
                  <span className="truncate">أضف للسلة</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
