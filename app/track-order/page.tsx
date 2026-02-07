"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getOrder } from "@/lib/api";
import { getPreviousOrders } from "@/lib/localStorage";
import { Order } from "@/lib/types";
import {
  Search,
  Package,
  Clock,
  Truck,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const statusIcons = {
  معلق: Clock,
  "يتم التحضير": Package,
  "خرج للتوصيل": Truck,
  وصل: CheckCircle,
};

const statusColors = {
  معلق: "bg-yellow-100 text-yellow-700 border-yellow-300",
  "يتم التحضير": "bg-blue-100 text-blue-700 border-blue-300",
  "خرج للتوصيل": "bg-purple-100 text-purple-700 border-purple-300",
  وصل: "bg-green-100 text-green-700 border-green-300",
};

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const urlOrderNumber = searchParams.get("orderNumber");

  const [orderNumber, setOrderNumber] = useState(urlOrderNumber || "");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previousOrders, setPreviousOrders] = useState<string[]>([]);

  useEffect(() => {
    setPreviousOrders(getPreviousOrders());

    // إذا كان هناك رقم طلب في الـ URL، ابحث عنه تلقائياً
    if (urlOrderNumber) {
      handleSearch(urlOrderNumber);
    }
  }, [urlOrderNumber]);

  const handleSearch = async (searchOrderNumber?: string) => {
    const numberToSearch = searchOrderNumber || orderNumber;
    if (!numberToSearch) {
      setError("يرجى إدخال رقم الطلب");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const data = await getOrder(numberToSearch);
      setOrder(data);
    } catch (err: any) {
      setError(err.message || "لم يتم العثور على الطلب");
    } finally {
      setLoading(false);
    }
  };

  const StatusIcon = order ? statusIcons[order.status] : Clock;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">تتبع الطلب</h1>

          {/* نموذج البحث */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              رقم الطلب
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="أدخل رقم الطلب"
              />
              <button
                onClick={() => handleSearch()}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                بحث
              </button>
            </div>

            {/* الطلبات السابقة */}
            {previousOrders.length > 0 && !order && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">طلباتك السابقة:</p>
                <div className="flex flex-wrap gap-2">
                  {previousOrders.map((prevOrder) => (
                    <button
                      key={prevOrder}
                      onClick={() => {
                        setOrderNumber(prevOrder);
                        handleSearch(prevOrder);
                      }}
                      className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg transition-colors"
                    >
                      {prevOrder}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* رسالة خطأ */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          {/* تفاصيل الطلب */}
          {order && (
            <div className="space-y-6">
              {/* الحالة */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    حالة الطلب
                  </h2>
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                      statusColors[order.status]
                    }`}
                  >
                    <StatusIcon className="w-5 h-5" />
                    <span className="font-bold">{order.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">رقم الطلب:</p>
                    <p className="font-bold text-gray-800 font-mono">
                      {order.orderNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">تاريخ الطلب:</p>
                    <p className="font-bold text-gray-800">
                      {new Date(order.createdAt).toLocaleDateString("ar-EG")}
                    </p>
                  </div>
                </div>
              </div>

              {/* معلومات التوصيل */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  معلومات التوصيل
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">الاسم:</span>
                    <span className="font-bold text-gray-800">
                      {order.customerName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الهاتف:</span>
                    <span className="font-bold text-gray-800 font-mono">
                      {order.phone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">المنطقة:</span>
                    <span className="font-bold text-gray-800">
                      {order.area}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">العنوان:</span>
                    <span className="font-bold text-gray-800">
                      {order.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* المنتجات */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  المنتجات
                </h3>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b last:border-b-0"
                    >
                      <div>
                        <p className="font-bold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.quantity} {item.unit} × {item.price} جنيه
                        </p>
                      </div>
                      <p className="font-bold text-gray-800">
                        {item.quantity * item.price} جنيه
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">المجموع الفرعي:</span>
                    <span className="font-bold text-gray-800">
                      {order.subTotal} جنيه
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">رسوم التوصيل:</span>
                    <span className="font-bold text-gray-800">
                      {order.deliveryPrice} جنيه
                    </span>
                  </div>
                  <div className="flex justify-between text-lg border-t pt-2">
                    <span className="font-bold text-gray-800">الإجمالي:</span>
                    <span className="font-bold text-green-600">
                      {order.totalAmount} جنيه
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
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
      <TrackOrderContent />
    </Suspense>
  );
}
