"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function Header() {
  const { cart, getItemCount, loadCart, isLoaded } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      loadCart();
    }
  }, [isLoaded, loadCart]);

  const cartCount = getItemCount();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* اللوجو */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="الزغوي"
              width={50}
              height={50}
              className="object-contain"
            />
            <span className="text-2xl font-bold text-green-700">الزغوي</span>
          </Link>

          {/* القائمة - شاشات كبيرة */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-lg font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              الرئيسية
            </Link>
            <Link
              href="/products"
              className="text-lg font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              المنتجات
            </Link>
            <Link
              href="/offers"
              className="text-lg font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              العروض
            </Link>
            <Link
              href="/track-order"
              className="text-lg font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              تتبع الطلب
            </Link>
          </nav>

          {/* السلة والقائمة */}
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* زر القائمة - شاشات صغيرة */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* القائمة المنسدلة - شاشات صغيرة */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t pt-4">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-gray-700 hover:text-green-600 transition-colors py-2"
              >
                الرئيسية
              </Link>
              <Link
                href="/products"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-gray-700 hover:text-green-600 transition-colors py-2"
              >
                المنتجات
              </Link>
              <Link
                href="/offers"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-gray-700 hover:text-green-600 transition-colors py-2"
              >
                العروض
              </Link>
              <Link
                href="/track-order"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-gray-700 hover:text-green-600 transition-colors py-2"
              >
                تتبع الطلب
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
