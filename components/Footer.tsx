import Link from "next/link";
import { Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* معلومات التواصل */}
          <div>
            <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+201234567890"
                className="flex items-center gap-2 hover:text-green-400 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>01554794442 - 01003875619</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>القباري, الاسكان الصناعي </span>
                <span>شارع الهيثمي بجوار البريد</span>
              </div>
            </div>
          </div>

          {/* روابط سريعة */}
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="hover:text-green-400 transition-colors">
                الرئيسية
              </Link>
              <Link
                href="/products"
                className="hover:text-green-400 transition-colors"
              >
                المنتجات
              </Link>
              <Link
                href="/offers"
                className="hover:text-green-400 transition-colors"
              >
                العروض
              </Link>
              <Link
                href="/track-order"
                className="hover:text-green-400 transition-colors"
              >
                تتبع الطلب
              </Link>
            </div>
          </div>

          {/* عن المتجر */}
          <div>
            <h3 className="text-xl font-bold mb-4">عن الزغوي</h3>
            <p className="text-gray-300 leading-relaxed">
              متجر الزغوي متخصص في بيع منتجات الطيور واللحوم الطازجة بأعلى جودة
              وأفضل الأسعار. نوفر خدمة التوصيل لجميع المناطق.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© 2024 الزغوي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
