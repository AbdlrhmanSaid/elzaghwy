import Image from "next/image";
import Link from "next/link";
import { getProducts, getOffers } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import OfferCard from "@/components/OfferCard";
import { ArrowLeft, ShoppingBag, Tag, Truck } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
      <section className="relative h-[500px] md:h-[600px] flex items-center overflow-hidden bg-slate-900">
        {/* صورة الهيرو */}
        <div className="absolute inset-0">
          <Image
            src="/hero-poultry.jpg" // اتأكد ان اسم الصورة صح عندك
            alt="الزغوي للطيور"
            fill
            className="object-cover object-center opacity-70 transform -scale-x-100" // هنا عكسنا الصورة عشان تناسب مكان الكلام
            priority
          />
          {/* Overlay تدرج سواد احترافي عشان الكلام يبان */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/40 to-transparent" />
        </div>

        <div className="relative container mx-auto px-6 z-10 text-right">
          <div className="max-w-2xl">
            {" "}
            {/* خليت الكلام يروح لليمين في الجزء الفاضي من الصورة */}
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">
              أصل الطزاجة <br />
              <span className="text-green-500">في الزغوي</span>
            </h1>
            <p className="text-base md:text-xl text-gray-200 mb-10 max-w-lg leading-relaxed border-r-4 border-green-600 pr-4">
              أجود أنواع الطيور واللحوم الطازجة من المزرعة لبيتك مباشرة.. جودة
              تشرّفك في عزوماتك.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="group bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-xl"
              >
                اطلب دلوقتى
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
              </Link>

              <Link
                href="/offers"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-2"
              >
                شاهد العروض
                <Tag className="w-5 h-5" />
              </Link>
            </div>
            {/* المميزات */}
            <div className="mt-12 flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs md:text-sm font-bold">توصيل سريع</span>
              </div>
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs md:text-sm font-bold">ذبح إسلامي</span>
              </div>
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs md:text-sm font-bold">أعلى جودة</span>
              </div>
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

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
