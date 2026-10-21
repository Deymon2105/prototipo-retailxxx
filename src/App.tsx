import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { DemoHeader } from './components/DemoHeader';
import { CartView } from './components/CartView';
import { CheckoutModal } from './components/CheckoutModal';
import { SuccessView } from './components/SuccessView';
import { WhatsAppMockView } from './components/WhatsAppMockView';
import { CheckCircle2, X } from 'lucide-react';

const MainContent: React.FC = () => {
  const { state, setStep, toastMessage, dismissToast } = useCart();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Sync modal open state if currentStep is 'checkout'
  const isCheckoutOpen = state.currentStep === 'checkout' || isCheckoutModalOpen;

  const handleCloseCheckout = () => {
    setIsCheckoutModalOpen(false);
    if (state.currentStep === 'checkout') {
      setStep('cart');
    }
  };

  const handleOpenCheckout = () => {
    setIsCheckoutModalOpen(true);
    setStep('checkout');
  };

  const renderActiveScreen = () => {
    switch (state.currentStep) {
      case 'cart':
      case 'checkout':
        return <CartView onOpenCheckout={handleOpenCheckout} />;
      case 'success':
        return <SuccessView />;
      case 'whatsapp-mock':
        return <WhatsAppMockView />;
      default:
        return <CartView onOpenCheckout={handleOpenCheckout} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 max-w-md bg-slate-900 text-white px-5 py-4 rounded-xl shadow-lg border border-slate-800 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex-1">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-400">
              Notificación PMV
            </span>
            <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
              {toastMessage}
            </p>
          </div>
          <button
            onClick={dismissToast}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Global Header & Demo Controls */}
      <DemoHeader />

      {/* Main Body */}
      <main className="flex-1 pb-16">
        <div className="w-full">{renderActiveScreen()}</div>
      </main>

      {/* Checkout 1-Click Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
      />



      {/* Minimal Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-blue-900 tracking-wider">
              RETAIL XXX
            </span>
            <span className="text-slate-300">•</span>
            <span>Prototipo PMV para Reducción de Abandono de Carrito</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Tienda Providencia Hub</span>
            <span>Micro-fulfillment 2 hrs</span>
            <span>Passkey / Touch ID 1-Click</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}

export default App;
