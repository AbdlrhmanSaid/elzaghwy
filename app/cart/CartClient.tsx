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

  console.log(previousOrders);

  useEffect(() => {
    if (!isLoaded) {
      loadCart();
    }

    // تحميل الطلبات السابقة

    setPreviousOrders(getPreviousOrders());

    // التحقق من وجود رسالة نجاح

    const success = searchParams.get("success");

    const orderNumber = searchParams.get("orderNumber");

    if (success === "true" && orderNumber) {
      setShowSuccess(true);

      setNewOrderNumber(orderNumber);

      // إزالة الـ query parameters من الـ URL

      router.replace("/cart");
    }
  }, [isLoaded, loadCart, searchParams, router]);

  const total = getTotal();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* رسالة النجاح */}

            {showSuccess && newOrderNumber && (
              <div className="bg-white rounded-lg shadow-md p-8 mb-6 border-2 border-green-500">
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

                    <p className="text-gray-600 mb-4">
                      شكراً لك! سيتم التواصل معك قريباً
                    </p>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-2">رقم الطلب:</p>

                      <div className="flex items-center gap-2">
                        <code className="text-2xl font-bold text-green-600 font-mono">
                          {newOrderNumber}
                        </code>

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(newOrderNumber);

                            setCopied(true);

                            setTimeout(() => setCopied(false), 2000);
                          }}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                          title="نسخ رقم الطلب"
                        >
                          {copied ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Copy className="w-5 h-5 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Link
                      href={`/track-order?orderNumber=${newOrderNumber}`}
                      className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
                    >
                      تتبع الطلب
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* السلة فارغة */}

            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                السلة فارغة
              </h2>

              <p className="text-gray-600 mb-6">
                لم تقم بإضافة أي منتجات للسلة بعد
              </p>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                تصفح المنتجات
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>

            {/* الطلبات السابقة */}

            {previousOrders.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Package className="w-6 h-6 text-green-600" />
                  طلباتك السابقة
                </h3>

                <div className="space-y-2">
                  {previousOrders.map((orderNum, index) => (
                    <Link
                      key={orderNum}
                      href={`/track-order?orderNumber=${orderNum}`}
                      className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group relative"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Package className="w-5 h-5 text-green-600" />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm text-gray-600">رقم الطلب</p>
                              {index === 0 && (
                                <span className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse p-2 ">
                                  أحدث طلب
                                </span>
                              )}
                            </div>

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
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* العنوان */}

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">السلة</h1>

            <p className="text-gray-600">
              لديك {cart.length} {cart.length === 1 ? "منتج" : "منتجات"} في
              السلة
            </p>
          </div>

          {/* قائمة المنتجات */}

          <div className="bg-white rounded-lg shadow-md mb-6">
            {cart.map((item) => (
              <div
                key={`${item.productId}-${item.type}`}
                className="flex items-center gap-4 p-4 border-b last:border-b-0"
              >
                {/* صورة المنتج */}

                <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* معلومات المنتج */}

                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>

                  <p className="text-sm text-gray-600">
                    {item.price} جنيه / {item.unit}
                  </p>
                </div>

                {/* التحكم في الكمية */}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.productId,

                        item.type,

                        item.quantity - 1,
                      )
                    }
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold transition-colors"
                  >
                    <Minus className="w-4 h-4 mx-auto" />
                  </button>

                  <span className="w-12 text-center font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.productId,

                        item.type,

                        item.quantity + 1,
                      )
                    }
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold transition-colors"
                  >
                    <Plus className="w-4 h-4 mx-auto" />
                  </button>
                </div>

                {/* السعر الإجمالي */}

                <div className="text-left w-24">
                  <p className="font-bold text-gray-800">
                    {item.price * item.quantity} جنيه
                  </p>
                </div>

                {/* زر الحذف */}

                <button
                  onClick={() => removeItem(item.productId, item.type)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* الملخص */}

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-bold text-gray-800">
                المجموع الفرعي:
              </span>

              <span className="text-2xl font-bold text-green-600">
                {total} جنيه
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              * سيتم إضافة رسوم التوصيل حسب المنطقة في الخطوة التالية
            </p>

            <Link
              href="/checkout"
              className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-lg font-bold text-lg transition-colors"
            >
              إتمام الطلب
            </Link>

            <Link
              href="/products"
              className="block w-full text-center text-green-600 hover:text-green-700 font-bold mt-4"
            >
              متابعة التسوق
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
