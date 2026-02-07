"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Copy, Package, ArrowLeft } from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (orderNumber) {
      navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!orderNumber) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600">رقم الطلب غير موجود</p>
            <Link
              href="/"
              className="inline-block mt-6 text-green-600 hover:text-green-700 font-bold"
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* رسالة النجاح */}
          <div className="bg-white rounded-lg shadow-md p-12 text-center mb-6">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              تم استلام طلبك بنجاح!
            </h1>

            <p className="text-gray-600 mb-8">
              شكراً لك! تم تسجيل طلبك وسيتم التواصل معك قريباً لتأكيد الطلب
            </p>

            {/* رقم الطلب */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">رقم الطلب:</p>
              <div className="flex items-center justify-center gap-3">
                <p className="text-2xl font-bold text-green-600 font-mono">
                  {orderNumber}
                </p>
                <button
                  onClick={handleCopy}
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
              <p className="text-xs text-gray-500 mt-2">
                احتفظ برقم الطلب لتتبع حالة طلبك
              </p>
            </div>

            {/* الخطوات التالية */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-right mb-6">
              <h3 className="font-bold text-gray-800 mb-3">الخطوات التالية:</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">1.</span>
                  <span>سيتم مراجعة طلبك والتأكد من توفر المنتجات</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">2.</span>
                  <span>سنتواصل معك للتأكيد وتحديد موعد التوصيل</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">3.</span>
                  <span>سيتم تحضير طلبك وإرساله في الموعد المحدد</span>
                </li>
              </ol>
            </div>

            {/* الأزرار */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/track-order?orderNumber=${orderNumber}`}
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                <Package className="w-5 h-5" />
                تتبع الطلب
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-green-600 border-2 border-green-600 px-6 py-3 rounded-lg font-bold transition-colors"
              >
                العودة للرئيسية
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600">جاري التحميل...</p>
          </div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
