"use client";

import Image from "next/image";
import { Product } from "@/lib/types";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, Check } from "lucide-react";
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {/* صورة المنتج */}
      <div className="relative h-48 bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
              غير متوفر
            </span>
          </div>
        )}
      </div>

      {/* معلومات المنتج */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-green-600">
            {product.price} جنيه
          </span>
          <span className="text-gray-600 text-sm">/{product.unit}</span>
        </div>

        {product.inStock && (
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
