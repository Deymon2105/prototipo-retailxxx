import React from 'react';
import {
  ShieldCheck,
  Truck,
  Clock,
  Zap,
  ArrowRight,
  Award,
  Store,
  Tag,
  AlertCircle,
  MessageCircle,
  CheckCircle2,
  PackageCheck,
  Plus,
  Minus
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartViewProps {
  onOpenCheckout: () => void;
}

export const CartView: React.FC<CartViewProps> = ({ onOpenCheckout }) => {
  const {
    state,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    quantity,
    setQuantity,
    simulateAbandonment,
    toggleFreeShipping,
    calculateTotal,
    setStep,
  } = useCart();

  const total = calculateTotal();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Top Value Proposition Banner */}
      <div className="mb-6 bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-200">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-300">
                Micro-Fulfillment Providencia
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <h2 className="text-base font-bold text-white">
              Stock garantizado en Tienda Providencia (Santiago, Chile)
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-200">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Promesa horaria: <strong>Mañana 11:00 - 13:00 hrs</strong></span>
        </div>
      </div>

      {/* Main Grid: Product Details & Transparent Cost Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Product & Experience (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h1 className="text-xl font-bold text-slate-900">
                Tu Carrito de Compras
              </h1>
              <span className="text-xs text-slate-500 font-medium">
                1 producto reservado por 24 hrs
              </span>
            </div>

            {/* Product Item Row */}
            <div className="py-6 flex flex-col sm:flex-row gap-6">
              <div className="relative group sm:w-44 flex-shrink-0">
                <img
                  src={state.item.image}
                  alt={state.item.name}
                  className="w-full aspect-square object-cover rounded-2xl bg-slate-100 border border-slate-200 shadow-sm"
                />
                <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow">
                  Gore-Tex Tech
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                        Retail XXX Outdoor Tech
                      </span>
                      <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                        {state.item.name}
                      </h2>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">
                        ${state.item.price.toLocaleString('es-CL')} CLP
                      </div>
                      <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                        -$5.000 Descuento activo
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                    Membrana cortaviento impermeable 20.000mm, costuras termoselladas y capucha técnica ajustable para la ciudad y montaña.
                  </p>

                  {/* Size, Color & Quantity Selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Talla:
                      </label>
                      <div className="flex gap-1.5">
                        {['S', 'M', 'L', 'XL'].map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                              selectedSize === size
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Color:
                      </label>
                      <select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-full text-xs bg-slate-100 border border-slate-200 rounded-lg px-2 py-1.5 font-medium text-slate-800 outline-none focus:border-blue-500"
                      >
                        <option value="Navy & Grafito">Navy & Grafito</option>
                        <option value="Carbon Black">Carbon Black</option>
                        <option value="Arctic Slate">Arctic Slate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Cantidad:
                      </label>
                      <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-1 w-fit border border-slate-200">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-6 h-6 rounded bg-white hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors shadow-xs"
                          title="Disminuir"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-xs px-2 font-mono text-slate-900">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.min(4, quantity + 1))}
                          className="w-6 h-6 rounded bg-white hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors shadow-xs"
                          title="Aumentar"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Micro-fulfillment store inventory status */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Stock verificado: <strong>4 unidades en Tienda Providencia</strong>
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    SKU: RXX-URB-772
                  </span>
                </div>
              </div>
            </div>

            {/* Guaranteed Delivery Window Dynamic Banner */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Promesa de Entrega Exacta
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    Despacho desde Tienda Providencia: Mañana 11:00 - 13:00 hrs
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Ventana garantizada de 2 horas con seguimiento GPS en vivo
                  </div>
                </div>
              </div>
              <span className="hidden sm:inline-block bg-white text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                Ventana 2 hrs
              </span>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-xs text-slate-800">Garantía 2 Años</h3>
                <p className="text-[11px] text-slate-500">Cobertura total Retail XXX</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <PackageCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-xs text-slate-800">Devolución Gratis</h3>
                <p className="text-[11px] text-slate-500">30 días sin preguntas</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <Award className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-xs text-slate-800">Puntos Club</h3>
                <p className="text-[11px] text-slate-500">+480 Puntos Club Retail</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Transparent Cost Breakdown & Actions (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 relative overflow-hidden">
            {/* Transparent Cost Notice Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Cero Costos Ocultos
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Transparencia 100%
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-3">
              En Retail XXX el flete y descuentos están calculados desde el primer segundo. El precio que ves aquí es el precio final que pagarás.
            </p>

            {/* Cost Breakdown Details */}
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between items-center text-slate-600">
                <span>Precio base producto:</span>
                <span className="font-semibold text-slate-900 font-mono">
                  ${(state.item.price * quantity).toLocaleString('es-CL')} CLP
                </span>
              </div>

              <div className="flex justify-between items-center text-emerald-600">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4" /> Descuento promocional:
                </span>
                <span className="font-bold font-mono">
                  -${state.item.discount.toLocaleString('es-CL')} CLP
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-blue-600" />
                  Flete express Providencia:
                </span>
                {state.freeShippingApplied ? (
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                    GRATIS (Cupón WhatsApp)
                  </span>
                ) : (
                  <span className="font-semibold text-slate-900 font-mono">
                    +${state.item.shipping.toLocaleString('es-CL')} CLP
                  </span>
                )}
              </div>

              {state.freeShippingApplied && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
                  <span className="font-medium flex items-center gap-1">
                    🎉 Cupón de WhatsApp activo
                  </span>
                  <span className="font-bold">Ahorras $2.990 CLP</span>
                </div>
              )}

              {/* Total Final Line */}
              <div className="pt-4 border-t-2 border-slate-100 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Total a Pagar:
                  </span>
                  <span className="text-[11px] text-slate-400">
                    IVA (19%) incluido
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-slate-900 tracking-tight">
                    ${total.toLocaleString('es-CL')}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">CLP</span>
                </div>
              </div>
            </div>

            {/* Club Points Banner */}
            <div className="mt-5 p-3 bg-amber-50/80 border border-amber-200 rounded-xl flex items-center gap-2.5 text-xs text-amber-900">
              <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>
                Con esta compra acumulas <strong>+480 Puntos Club Retail</strong> en tu cuenta.
              </span>
            </div>

            {/* ACTION 1: Principal - 1-Click Checkout */}
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={onOpenCheckout}
                className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm flex items-center justify-center gap-2 text-base group"
              >
                <Zap className="w-5 h-5 fill-white text-white" />
                <span>Continuar a Pago Rápido 1-Click</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>

              {/* ACTION 2: Demo / Simulation - Trigger Cart Abandonment */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={simulateAbandonment}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 border border-slate-200 transition-all text-xs flex items-center justify-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  <span>Simular abandono de carrito (Disparar WhatsApp API)</span>
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-1.5">
                  Herramienta de prueba: simula que el usuario abandona la compra y salta a la Pantalla 4.
                </p>
              </div>
            </div>
          </div>

          {/* Quick toggle for Free Shipping state (Demo convenience) */}
          <div className="p-4 bg-slate-100/80 rounded-2xl border border-slate-200 text-xs flex items-center justify-between">
            <span className="text-slate-600 font-medium">
              Cupón Envío Gratis ($0 flete):
            </span>
            <button
              onClick={toggleFreeShipping}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                state.freeShippingApplied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              {state.freeShippingApplied ? 'Activado ($44.990)' : 'Desactivado ($47.980)'}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button (FAB) for WhatsApp Instant Support */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative group">
          <button
            onClick={() => setStep('whatsapp-mock')}
            className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all ring-4 ring-emerald-500/20"
            title="Soporte y recuperación WhatsApp"
          >
            <MessageCircle className="w-7 h-7" />
          </button>
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            ¿Dudas con la talla o despacho? Chatea en WhatsApp
          </div>
        </div>
      </div>
    </div>
  );
};
