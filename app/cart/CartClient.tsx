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
    setPreviousOrders(getPreviousOrders());

    const success = searchParams.get("success");
    const orderNumber = searchParams.get("orderNumber");

    if (success === "true" && orderNumber) {
      setShowSuccess(true);
      setNewOrderNumber(orderNumber);
      router.replace("/cart");
    }
  }, [isLoaded, loadCart, searchParams, router]);

  const total = getTotal();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <p className="text-gray-600 font-bold animate-pulse">جاري تحميل السلة...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* رسالة النجاح عند إتمام طلب سابق */}
            {showSuccess && newOrderNumber && (
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-green-100 bg-gradient-to-br from-white to-green-50/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-gray-800 mb-1">تم إرسال طلبك بنجاح! 🎉</h3>
                    <p className="text-gray-600 mb-4 text-sm">شكراً لك! سيتم التواصل معك قريباً لتأكيد الطلب.</p>
                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                      <p className="text-xs text-gray-400 font-bold mb-1 uppercase">رقم الطلب الخاص بك:</p>
                      <div className="flex items-center justify-between">
                        <code className="text-2xl font-black text-green-600 font-mono tracking-wider">{newOrderNumber}</code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(newOrderNumber);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-400" />}
                        </button>
                      </div>
                    </div>
                    <Link
                      href={`/track-order?orderNumber=${newOrderNumber}`}
                      className="inline-flex items-center gap-2 mt-4 bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-transform active:scale-95"
                    >
                      تتبع حالة الطلب
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* السلة فارغة */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="text-2xl font-black text-gray-800 mb-2">السلة فارغة</h2>
              <p className="text-gray-500 mb-8">يبدو أنك لم تضف أي منتجات إلى سلتك بعد.</p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-lg shadow-green-100"
              >
                ابدأ التسوق الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>

            {/* الطلبات السابقة */}
            {previousOrders.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2 px-2">
                  <Package className="w-5 h-5 text-green-600" />
                  طلباتك الأخيرة
                </h3>
                <div className="grid gap-3">
                  {previousOrders.map((orderNum, index) => (
                    <Link
                      key={orderNum}
                      href={`/track-order?orderNumber=${orderNum}`}
                      className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-green-50 transition-colors">
                          <Package className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">رقم الطلب</p>
                          <code className="text-base font-black text-gray-700 font-mono">{orderNum}</code>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {index === 0 && (
                          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-md font-black">الأحدث</span>
                        )}
                        <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:text-green-600 group-hover:-translate-x-1 transition-all" />
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
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">سلة المشتريات</h1>
            <p className="text-gray-500 font-medium">
              لديك <span className="text-green-600 font-black">{cart.length}</span> {cart.length === 1 ? "صنف" : "أصناف"} في سلتك
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            {cart.map((item) => (
              <div
                key={`${item.productId}-${item.type}`}
                className="flex flex-col sm:flex-row items-center gap-4 p-4 md:p-6 border-b last:border-b-0 hover:bg-gray-50/50 transition-colors"
              >
                {/* الجزء العلوي: الصورة والمعلومات */}
                <div className="flex items-center w-full sm:w-auto gap-4 flex-1">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-gray-800 text-base md:text-xl truncate mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-400 font-bold">{item.price} جنيه / {item.unit}</p>
                  </div>
                </div>

                {/* الجزء السفلي: التحكم والسعر (يظهر في سطر واحد في الموبايل) */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-4 md:gap-10 pt-4 sm:pt-0 border-t sm:border-t-0 mt-2 sm:mt-0">
                  {/* التحكم في الكمية */}
                  <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200 shadow-inner">
                    <button
                      onClick={() => updateQuantity(item.productId, item.type, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-gray-600 hover:text-red-500 shadow-sm transition-all active:scale-90"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-black text-gray-800 text-sm md:text-base">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.type, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-gray-600 hover:text-green-600 shadow-sm transition-all active:scale-90"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* السعر الإجمالي والحذف */}
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="text-left min-w-[80px]">
                      <p className="text-lg font-black text-green-600 whitespace-nowrap">
                        {item.price * item.quantity} <span className="text-[10px] font-medium uppercase">جنيه</span>
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.type)}
                      className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                      title="حذف من السلة"
                    >
                      <Trash2 className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ملخص السلة */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h4 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-1">المجموع النهائي للاصناف</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-gray-900">{total}</span>
                  <span className="text-lg font-bold text-gray-500">جنيه مصري</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 font-medium max-w-[250px]">
                  * رسوم التوصيل يتم تحديدها بناءً على منطقتك في الخطوة التالية.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Link
                href="/checkout"
                className="w-full bg-green-600 hover:bg-green-700 text-white text-center py-5 rounded-2xl font-black text-xl transition-all shadow-lg shadow-green-100 transform active:scale-[0.98]"
              >
                إتمام عملية الشراء
              </Link>
              <Link
                href="/products"
                className="w-full text-center text-gray-400 hover:text-green-600 font-black py-2 transition-colors text-sm"
              >
                ← العودة لتصفح المزيد من المنتجات
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
