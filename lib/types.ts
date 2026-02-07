// أنواع البيانات المستخدمة في المتجر

export interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  unit: "كيلو" | "قطعة";
  inStock: boolean;
}

export interface Offer {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  includedItems: {
    productId: string;
    name: string;
    quantity: number;
    unit: string;
  }[];
  isActive: boolean;
}

export interface Area {
  _id: string;
  name: string;
  deliveryPrice: number;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
  type: "product" | "offer";
}

export interface CustomerInfo {
  name: string;
  phone: string;
  area: string;
  address: string;
}

export interface Order {
  orderNumber: string;
  customerName: string;
  phone: string;
  area: string;
  address: string;
  deliveryPrice: number;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    unit: string;
  }[];
  subTotal: number;
  totalAmount: number;
  status: "معلق" | "يتم التحضير" | "خرج للتوصيل" | "وصل";
  createdAt: string;
}
