"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { getPreviousOrders } from "@/lib/localStorage";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft,
  CheckCircle,
  Copy,
  Package,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, loadCart, isLoaded, removeItem, updateQuantity, getTotal } =
    useCartStore();

  const [previousOrders, setPreviousOrders] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newOrderNumber, setNewOrderNumber] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      loadCart();
    }
    // تحميل الطلبات السابقة
    const orders = getPreviousOrders();
    setPreviousOrders(orders);

    const success = searchParams.get("success");
    const orderNumber = searchParams.get("orderNumber");
    if (success === "true" && orderNumber) {
      setShowSuccess(true);
      setNewOrderNumber(orderNumber);
      router.replace("/cart");
    }
  }, [isLoaded, loadCart, searchParams, router]);

  const total = getTotal();

  // مكون عرض الطلبات السابقة لمنع التكرار
  const PreviousOrdersSection = () =>
    previousOrders.length > 0 && (
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Package className="w-6 h-6 text-green-600" />
          طلباتك السابقة
        </h3>
        <div className="space-y-2">
          {previousOrders.map((orderNum) => (
            <Link
              key={orderNum}
              href={`/track-order?orderNumber=${orderNum}`}
              className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">رقم الطلب</p>
                    <code className="text-lg font-bold text-gray-800 font-mono">
                      {orderNum}
                    </code>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    );

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 text-center">
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* 1. رسالة النجاح (تظهر فوق كل شيء) */}
          {showSuccess && newOrderNumber && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-6 border-2 border-green-500">
              {/* ... كود رسالة النجاح كما هو ... */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    تم إرسال طلبك بنجاح! 🎉
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600">رقم الطلب:</p>
                    <code className="text-2xl font-bold text-green-600">
                      {newOrderNumber}
                    </code>
                  </div>
                  <Link
                    href={`/track-order?orderNumber=${newOrderNumber}`}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold"
                  >
                    تتبع الطلب
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* 2. حالة السلة (فارغة أو ممتلئة) */}
          {cart.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                السلة فارغة
              </h2>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold"
              >
                تصفح المنتجات <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-gray-800 mb-8">السلة</h1>
              <div className="bg-white rounded-lg shadow-md mb-6">
                {cart.map((item) => (
                  <div
                    key={`${item.productId}-${item.type}`}
                    className="flex items-center gap-4 p-4 border-b last:border-b-0"
                  >
                    {/* ... كود عرض منتجات السلة كما هو ... */}
                    <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.price} جنيه</p>
                    </div>
                    {/* ... أزرار التحكم والكمية ... */}
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between mb-6">
                  <span className="text-xl font-bold">المجموع:</span>
                  <span className="text-2xl font-bold text-green-600">
                    {total} جنيه
                  </span>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full bg-green-600 text-white text-center py-4 rounded-lg font-bold"
                >
                  إتمام الطلب
                </Link>
              </div>
            </>
          )}

          {/* 3. قسم الطلبات السابقة (يظهر دائماً أسفل الصفحة سواء السلة فارغة أم لا) */}
          <PreviousOrdersSection />
        </div>
      </div>
    </div>
  );
}
