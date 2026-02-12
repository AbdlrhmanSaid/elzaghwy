"use client";

import Image from "next/image";
import { Offer } from "@/lib/types";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, Check, Package, Plus, Minus } from "lucide-react";
import { useState } from "react";

interface OfferCardProps {
  offer: Offer;
}

export default function OfferCard({ offer }: OfferCardProps) {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      productId: offer._id,
      name: offer.title,
      price: offer.price,
      quantity,
      unit: "عرض",
      image: offer.image,
      type: "offer",
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col lg:flex-row h-full">
      {/* صورة العرض */}
      <div className="relative h-64 lg:h-auto lg:w-2/5 xl:w-1/2 overflow-hidden flex-shrink-0">
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* شارة حالة التوفر */}
        {!offer.isActive && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-white text-red-600 px-6 py-2 rounded-full font-black shadow-xl transform -rotate-12 border-2 border-red-600">
              نفذت الكمية
            </span>
          </div>
        )}

        {/* شارة عرض خاص */}
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-red-600 text-white px-4 py-1.5 rounded-full font-bold text-xs shadow-lg flex items-center gap-1 animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            عرض خاص
          </span>
        </div>
      </div>

      {/* محتوى الكرت */}
      <div className="p-5 flex flex-col flex-grow lg:w-3/5 xl:w-1/2">
        <h3 className="text-xl font-black text-gray-800 mb-3 line-clamp-1">
          {offer.title}
        </h3>

        {/* صندوق المحتويات */}
        <div className="bg-green-50/50 rounded-xl p-4 mb-4 border border-green-100/50 relative overflow-hidden flex-grow">
          <div className="flex items-center gap-2 mb-2 text-green-700">
            <Package className="w-4 h-4" />
            <span className="text-sm font-bold">مكونات العرض:</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed leading-6">
            {offer.description}
          </p>
        </div>

        {/* السعر والتحكم في الكمية */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              السعر الإجمالي
            </span>
            <span className="text-2xl font-black text-green-600 flex items-baseline gap-1">
              {offer.price}
              <span className="text-sm font-medium">جنيه</span>
            </span>
          </div>

          {offer.isActive && (
            <div className="flex items-center bg-gray-100 rounded-xl p-1 shadow-inner border border-gray-200">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-gray-600 hover:text-red-500 transition-colors shadow-sm"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-black text-gray-800">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-gray-600 hover:text-green-600 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* زر الإضافة */}
        {offer.isActive && (
          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-95 shadow-lg ${
              added
                ? "bg-gray-800 text-white scale-100"
                : "bg-green-600 hover:bg-green-700 text-white hover:shadow-green-200"
            }`}
          >
            {added ? (
              <>
                <Check className="w-5 h-5" />
                تمت الإضافة للسلة
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                إضافة لطلبك
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
