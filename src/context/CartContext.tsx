/* oxlint-disable react/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import type { CartState, OrderDetails } from '../types/cart';


const STORAGE_KEY = 'retail_xxx_cart_state';

const INITIAL_STATE: CartState = {
  item: {
    id: 'chaqueta-urban-waterproof-01',
    name: 'Chaqueta Urban Waterproof',
    price: 49990,
    shipping: 2990,
    discount: 5000,
    image: '/jacket_waterproof.jpg',
  },
  hasAbandoned: false,
  freeShippingApplied: false,
  orderCompleted: false,
  currentStep: 'cart',
};

const INITIAL_ORDER_DATE = '18 de octubre de 2026, 18:00';

const INITIAL_ORDER_DETAILS: OrderDetails = {
  orderNumber: '#RXX-92841',
  paymentMethod: 'Tarjeta de Crédito Tokenizada (1-Click)',
  lastFour: '4821',
  deliveryAddress: 'Av. Providencia 1240, Dpto 502, Providencia, Santiago',
  storeOrigin: 'Tienda Providencia (Micro-fulfillment Hub)',
  timeWindow: 'Mañana entre 11:00 y 13:00 hrs (Ventana 2 hrs)',
  clubPoints: 480,
  totalPaid: 47980,
  date: INITIAL_ORDER_DATE,
};

export interface CartContextType {
  state: CartState;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  quantity: number;
  setQuantity: (qty: number) => void;
  setStep: (step: CartState['currentStep']) => void;
  simulateAbandonment: () => void;
  recoverFromWhatsApp: () => void;
  proceedToCheckout: () => void;
  completeOrder: (paymentMethod?: string) => void;
  resetDemo: () => void;
  toggleFreeShipping: () => void;
  toastMessage: string | null;
  dismissToast: () => void;
  orderDetails: OrderDetails;
  calculateTotal: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CartState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.item) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading localStorage for retail_xxx_cart_state:', e);
    }
    return INITIAL_STATE;
  });

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Navy & Grafito');
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>(INITIAL_ORDER_DETAILS);

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving state to localStorage:', e);
    }
  }, [state]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4500);
  };

  const dismissToast = () => setToastMessage(null);

  const calculateTotal = () => {
    const subtotal = state.item.price * quantity;
    const discount = state.item.discount;
    const shipping = state.freeShippingApplied ? 0 : state.item.shipping;
    return Math.max(0, subtotal - discount + shipping);
  };

  const setStep = (step: CartState['currentStep']) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  const simulateAbandonment = () => {
    setState((prev) => ({
      ...prev,
      hasAbandoned: true,
      currentStep: 'whatsapp-mock',
    }));
    showToast('🚨 Abandono de carrito detectado: Disparando flujo de reenganche por WhatsApp API...');
  };

  const recoverFromWhatsApp = () => {
    setState((prev) => ({
      ...prev,
      freeShippingApplied: true,
      item: {
        ...prev.item,
        shipping: 0,
      },
      currentStep: 'cart',
    }));
    showToast('🎉 ¡Cupón de Envío Gratis aplicado con éxito desde WhatsApp! Ahorraste $2.990 CLP');
  };

  const proceedToCheckout = () => {
    setState((prev) => ({ ...prev, currentStep: 'checkout' }));
  };

  const completeOrder = (paymentMethod = 'Touch ID / Passkey (Visa •••• 4821)') => {
    const total = calculateTotal();
    setOrderDetails((prev) => ({
      ...prev,
      totalPaid: total,
      paymentMethod,
      date: new Date().toLocaleDateString('es-CL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }));

    setState((prev) => ({
      ...prev,
      orderCompleted: true,
      currentStep: 'success',
    }));
    showToast('✅ ¡Compra 1-Click autorizada con éxito en menos de 5 segundos!');
  };

  const toggleFreeShipping = () => {
    setState((prev) => {
      const willBeFree = !prev.freeShippingApplied;
      return {
        ...prev,
        freeShippingApplied: willBeFree,
        item: {
          ...prev.item,
          shipping: willBeFree ? 0 : 2990,
        },
      };
    });
  };

  const resetDemo = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(INITIAL_STATE);
    setSelectedSize('M');
    setSelectedColor('Navy & Grafito');
    setQuantity(1);
    showToast('🔄 Estado reiniciado a valores originales');
  };

  return (
    <CartContext.Provider
      value={{
        state,
        selectedSize,
        setSelectedSize,
        selectedColor,
        setSelectedColor,
        quantity,
        setQuantity,
        setStep,
        simulateAbandonment,
        recoverFromWhatsApp,
        proceedToCheckout,
        completeOrder,
        resetDemo,
        toggleFreeShipping,
        toastMessage,
        dismissToast,
        orderDetails,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { useCart } from './useCart';

