"use client";

import Image from "next/image";
import { Offer } from "@/lib/types";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, Check, Package } from "lucide-react";
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {/* صورة العرض */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          className="object-cover"
        />
        {!offer.isActive && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
              غير متوفر
            </span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
          عرض خاص
        </div>
      </div>

      {/* معلومات العرض */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{offer.title}</h3>
        {/* محتويات العرض */}
        <div className="bg-gray-50 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-green-600" />
            <span className="text-sm font-bold text-gray-700">
              محتويات العرض:
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-green-600">
            {offer.price} جنيه
          </span>
        </div>

        {offer.isActive && (
          <div className="space-y-3">
            {/* الكمية */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                الكمية:
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* زر الإضافة للسلة */}
            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
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
