import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { ShoppingBag } from "lucide-react";

export const metadata = {
  title: "المنتجات - الزغوي",
  description: "تصفح جميع منتجات الطيور واللحوم الطازجة في متجر الزغوي",
};

export default async function ProductsPage() {
  let products = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBag className="w-8 h-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">المنتجات</h1>
          </div>
          <p className="text-gray-600 text-lg">
            تصفح جميع منتجاتنا من الطيور واللحوم الطازجة
          </p>
        </div>

        {/* قائمة المنتجات */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              لا توجد منتجات حالياً
            </h3>
            <p className="text-gray-600">
              تأكد من تشغيل الباك إند أو تواصل مع الدعم الفني
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
