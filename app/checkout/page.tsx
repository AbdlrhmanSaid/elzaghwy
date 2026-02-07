"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { getAreas, createOrder } from "@/lib/api";
import {
  getCustomerInfo,
  saveCustomerInfo,
  addOrderNumber,
} from "@/lib/localStorage";
import { Area } from "@/lib/types";
import {
  ShoppingCart,
  User,
  MapPin,
  Phone,
  Home,
  Loader2,
  Copy,
  CheckCircle,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, loadCart, isLoaded, getTotal, clearCart } = useCartStore();

  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // بيانات العميل
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
    address: "",
  });

  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  useEffect(() => {
    if (!isLoaded) {
      loadCart();
    }

    // تحميل بيانات العميل المحفوظة
    const savedInfo = getCustomerInfo();
    if (savedInfo) {
      setFormData(savedInfo);
    }

    // تحميل المناطق
    getAreas()
      .then((data) => setAreas(data))
      .catch((err) => console.error("Error loading areas:", err));
  }, [isLoaded, loadCart]);

  useEffect(() => {
    // تحديث المنطقة المختارة
    if (formData.area) {
      const area = areas.find((a) => a.name === formData.area);
      setSelectedArea(area || null);
    } else {
      setSelectedArea(null);
    }
  }, [formData.area, areas]);

  const subTotal = getTotal();
  const deliveryPrice = selectedArea?.deliveryPrice || 0;
  const totalAmount = subTotal + deliveryPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (cart.length === 0) {
      setError("السلة فارغة");
      return;
    }

    if (
      !formData.name ||
      !formData.phone ||
      !formData.area ||
      !formData.address
    ) {
      setError("يرجى ملء جميع الحقول");
      return;
    }

    setLoading(true);

    try {
      // حفظ بيانات العميل
      saveCustomerInfo(formData);

      // إنشاء الطلب
      const orderData = {
        customerName: formData.name,
        phone: formData.phone,
        area: formData.area,
        address: formData.address,
        deliveryPrice,
        items: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          unit: item.unit,
        })),
        subTotal,
        totalAmount,
      };

      const response = await createOrder(orderData);

      // حفظ رقم الطلب
      addOrderNumber(response.orderNumber);

      // حفظ رقم الطلب في الـ state
      setOrderNumber(response.orderNumber);

      // مسح السلة
      clearCart();

      // إظهار الـ dialog
      setShowSuccessDialog(true);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "حدث خطأ أثناء إنشاء الطلب");
      setLoading(false);
    }
  };

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
    router.push("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">إتمام الطلب</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* نموذج البيانات */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  بيانات التوصيل
                </h2>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  {/* الاسم */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline ml-2" />
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="أدخل اسمك الكامل"
                      required
                    />
                  </div>

                  {/* رقم الهاتف */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline ml-2" />
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="01xxxxxxxxx"
                      required
                    />
                  </div>

                  {/* المنطقة */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline ml-2" />
                      المنطقة
                    </label>
                    <select
                      value={formData.area}
                      onChange={(e) =>
                        setFormData({ ...formData, area: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">اختر المنطقة</option>
                      {areas.map((area) => (
                        <option key={area._id} value={area.name}>
                          {area.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* العنوان */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <Home className="w-4 h-4 inline ml-2" />
                      العنوان بالتفصيل
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="الشارع، رقم المبنى، الدور، الشقة..."
                      rows={3}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      جاري إرسال الطلب...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      تأكيد الطلب
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* ملخص الطلب */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  ملخص الطلب
                </h3>

                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div
                      key={`${item.productId}-${item.type}`}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-600">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-bold text-gray-800">
                        {item.price * item.quantity} جنيه
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المجموع الفرعي:</span>
                    <span className="font-bold text-gray-800">
                      {subTotal} جنيه
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">رسوم التوصيل:</span>
                    <span className="font-bold text-gray-800">
                      {deliveryPrice} جنيه
                    </span>
                  </div>

                  <div className="border-t pt-2 flex justify-between">
                    <span className="text-lg font-bold text-gray-800">
                      الإجمالي:
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      {totalAmount} جنيه
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 animate-fadeIn">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                تم إرسال طلبك بنجاح!
              </h2>
              <p className="text-gray-600 mb-6">
                شكراً لك! سيتم التواصل معك قريباً
              </p>

              {/* Order Number */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">رقم الطلب:</p>
                <div className="flex items-center justify-center gap-2">
                  <code className="text-2xl font-bold text-green-600 font-mono">
                    {orderNumber}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(orderNumber);
                      alert("تم نسخ رقم الطلب!");
                    }}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    title="نسخ رقم الطلب"
                  >
                    <Copy className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  احتفظ برقم الطلب لتتبع حالته
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() =>
                    router.push(`/track-order?orderNumber=${orderNumber}`)
                  }
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-colors"
                >
                  تتبع الطلب
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-bold transition-colors"
                >
                  العودة للرئيسية
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
