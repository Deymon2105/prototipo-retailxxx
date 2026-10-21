import React, { useState } from 'react';
import {
  ShoppingBag,
  Zap,
  CheckCircle,
  MessageCircle,
  RotateCcw,
  Info
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { CartState } from '../types/cart';

export const DemoHeader: React.FC = () => {
  const { state, setStep, resetDemo } = useCart();
  const [showExplanation, setShowExplanation] = useState(false);

  const steps: Array<{
    id: CartState['currentStep'];
    label: string;
    icon: React.ElementType;
    badge: string;
  }> = [
    {
      id: 'cart',
      label: '1. Carrito',
      icon: ShoppingBag,
      badge: 'Cero costos ocultos',
    },
    {
      id: 'checkout',
      label: '2. Checkout 1-Click',
      icon: Zap,
      badge: 'Biometría & OTP',
    },
    {
      id: 'success',
      label: '3. Éxito & GPS Tracking',
      icon: CheckCircle,
      badge: 'Micro-fulfillment',
    },
    {
      id: 'whatsapp-mock',
      label: '4. WhatsApp API',
      icon: MessageCircle,
      badge: 'Reenganche omnicanal',
    },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top PMV Executive Demo Control Bar */}
      <div className="bg-slate-900 text-slate-200 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-white">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>RETAIL XXX</span>
            <span className="text-[10px] text-blue-400 font-mono font-normal bg-blue-950 px-1.5 py-0.5 rounded border border-blue-800">
              PMV Tasa de Abandono
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Reset Demo */}
          <button
            type="button"
            onClick={resetDemo}
            className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-rose-300 hover:bg-slate-700 text-[11px] flex items-center gap-1.5 transition-colors border border-slate-700"
            title="Restablecer LocalStorage al estado inicial"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>

          {/* Explanatory Info Toggle */}
          <button
            type="button"
            onClick={() => setShowExplanation(!showExplanation)}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 transition-colors"
            title="Ver resumen de las 4 soluciones del PMV"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Explanatory Dropdown */}
      {showExplanation && (
        <div className="bg-slate-950 text-slate-200 p-4 border-b border-slate-800 text-xs">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="font-bold text-blue-400 block mb-1">
                1. Carrito Transparente
              </span>
              <p className="text-slate-400 text-[11px]">
                Elimina el 48% de abandono por costos sorpresa. Flete y descuento calculados de inmediato antes de cualquier formulario.
              </p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="font-bold text-indigo-400 block mb-1">
                2. Checkout 1-Click Híbrido
              </span>
              <p className="text-slate-400 text-[11px]">
                Elimina formularios largos con biometría Touch ID/Passkey y respaldo instantáneo por SMS OTP ante cualquier falla.
              </p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-400 block mb-1">
                3. Micro-Fulfillment & GPS
              </span>
              <p className="text-slate-400 text-[11px]">
                Genera certeza con despacho desde tienda Providencia, ventana horaria de 2 horas y tracking en tiempo real.
              </p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="font-bold text-emerald-400 block mb-1">
                4. WhatsApp API Recovery
              </span>
              <p className="text-slate-400 text-[11px]">
                Reengancha carritos abandonados a los 15 min ofreciendo envío gratis ($44.990) y pago en 1 toque.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step Navigation Bar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-1.5 flex-1 min-w-[500px]">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = state.currentStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setStep(step.id)}
                className={`flex-1 py-2 px-3 rounded-xl text-left transition-all flex items-center gap-2.5 border ${
                  isActive
                    ? 'bg-blue-50 border-blue-500/40 text-blue-900 ring-2 ring-blue-500/20 shadow-xs'
                    : 'bg-transparent border-transparent hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-xs truncate">
                    {step.label}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {step.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
