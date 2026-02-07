import Image from "next/image";
import Link from "next/link";
import { getProducts, getOffers } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import OfferCard from "@/components/OfferCard";
import { ArrowLeft, ShoppingBag, Tag, Truck } from "lucide-react";

export default async function Home() {
  let products = [];
  let offers = [];

  try {
    products = await getProducts();
    offers = await getOffers();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // عرض أول 4 منتجات فقط
  const featuredProducts = products.slice(0, 4);
  // عرض أول 3 عروض فقط
  const featuredOffers = offers.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-br from-green-50 to-green-100">
        <div className="absolute inset-0">
          <Image
            src="/nutrule.jpg"
            alt="الزغوي"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              مرحباً بك في الزغوي
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              أفضل منتجات الطيور واللحوم الطازجة بأعلى جودة وأفضل الأسعار
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center gap-2"
              >
                تصفح المنتجات
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link
                href="/offers"
                className="bg-white hover:bg-gray-50 text-green-600 border-2 border-green-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center gap-2"
              >
                العروض الخاصة
                <Tag className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* مميزات الخدمة */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                منتجات طازجة
              </h3>
              <p className="text-gray-600">
                جميع منتجاتنا طازجة ومن أفضل المصادر
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                توصيل سريع
              </h3>
              <p className="text-gray-600">
                نوصل طلبك لجميع المناطق في أسرع وقت
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                أسعار مناسبة
              </h3>
              <p className="text-gray-600">
                أفضل الأسعار مع عروض مميزة طوال الوقت
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* العروض المميزة */}
      {featuredOffers.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                العروض المميزة
              </h2>
              <Link
                href="/offers"
                className="text-green-600 hover:text-green-700 font-bold flex items-center gap-2"
              >
                عرض الكل
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredOffers.map((offer: any) => (
                <OfferCard key={offer._id} offer={offer} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* المنتجات المميزة */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                المنتجات المميزة
              </h2>
              <Link
                href="/products"
                className="text-green-600 hover:text-green-700 font-bold flex items-center gap-2"
              >
                عرض الكل
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* رسالة إذا لم تكن هناك بيانات */}
      {products.length === 0 && offers.length === 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                جاري تحميل المنتجات...
              </h3>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
