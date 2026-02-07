import { getOffers } from "@/lib/api";
import OfferCard from "@/components/OfferCard";
import { Tag } from "lucide-react";

export const metadata = {
  title: "العروض الخاصة - الزغوي",
  description: "تصفح جميع العروض الخاصة والمميزة في متجر الزغوي",
};

export default async function OffersPage() {
  let offers = [];

  try {
    offers = await getOffers();
  } catch (error) {
    console.error("Error fetching offers:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Tag className="w-8 h-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">العروض الخاصة</h1>
          </div>
          <p className="text-gray-600 text-lg">
            استفد من عروضنا المميزة ووفر أكثر
          </p>
        </div>

        {/* قائمة العروض */}
        {offers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer: any) => (
              <OfferCard key={offer._id} offer={offer} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              لا توجد عروض حالياً
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
