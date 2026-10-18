export interface CartItem {
  id: string;
  name: string;
  price: number;
  shipping: number;
  discount: number;
  image: string;
  size?: string;
  color?: string;
  quantity?: number;
}

export interface CartState {
  item: {
    id: string;
    name: string;
    price: number;
    shipping: number;
    discount: number;
    image: string;
  };
  hasAbandoned: boolean;
  freeShippingApplied: boolean;
  orderCompleted: boolean;
  currentStep: "cart" | "checkout" | "success" | "whatsapp-mock";
}

export interface OrderDetails {
  orderNumber: string;
  paymentMethod: string;
  lastFour: string;
  deliveryAddress: string;
  storeOrigin: string;
  timeWindow: string;
  clubPoints: number;
  totalPaid: number;
  date: string;
}
