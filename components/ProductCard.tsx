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
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      {/* صورة المنتج */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* حالة التوفر */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-white text-red-600 px-5 py-1.5 rounded-full font-black shadow-xl transform -rotate-12 border-2 border-red-600">
              غير متوفر حالياً
            </span>
          </div>
        )}
      </div>

      {/* معلومات المنتج */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-black text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md font-bold">
            {product.unit}
          </span>
        </div>

        {/* السعر */}
        <div className="mb-5">
          <span className="text-2xl font-black text-green-600 flex items-baseline gap-1">
            {product.price}
            <span className="text-sm font-medium">جنيه</span>
          </span>
        </div>

        {product.inStock && (
          <div className="mt-auto space-y-4">
            {/* التحكم في الكمية */}
            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-2 border border-gray-100">
              <span className="text-sm font-bold text-gray-500 mr-2">
                الكمية:
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-gray-600 hover:text-red-500 transition-colors shadow-sm border border-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center font-black text-gray-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-gray-600 hover:text-green-600 transition-colors shadow-sm border border-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* زر الإضافة */}
            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 shadow-md ${
                added
                  ? "bg-gray-800 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white hover:shadow-green-100"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  تمت الإضافة
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  أضف للسلة
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
