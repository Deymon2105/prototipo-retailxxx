import React, { useState } from 'react';
import {
  CheckCircle,
  Award,
  Store,
  MapPin,
  Clock,
  CreditCard,
  RotateCcw,
  FileText
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { GpsMapTracker } from './GpsMapTracker';

export const SuccessView: React.FC = () => {
  const { state, orderDetails, resetDemo, calculateTotal } = useCart();
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const total = calculateTotal();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Celebration Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-blue-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
            <CheckCircle className="w-12 h-12 text-emerald-300" />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
              <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                1-Click Checkout Completado
              </span>
              <span className="text-emerald-200 text-xs font-mono font-semibold">
                Tiempo de checkout: 4.8s
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ¡Pedido Confirmado con Éxito!
            </h1>
            <p className="text-blue-100 text-sm mt-1 max-w-xl">
              Hemos procesado tu compra mediante tokenización segura. Sin esperas bancarias ni formularios adicionales.
            </p>

            {/* Club Points Highlighted Badge */}
            <div className="mt-4 inline-flex items-center gap-2.5 bg-amber-400/20 border border-amber-300/40 text-amber-100 px-4 py-2 rounded-xl text-xs font-semibold">
              <Award className="w-4 h-4 text-amber-300 flex-shrink-0" />
              <span>
                ¡Felicitaciones! Has acumulado <strong>+{orderDetails.clubPoints} Puntos Club Retail</strong> en tu cuenta.
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex sm:flex-col gap-2">
            <button
              onClick={() => setShowReceiptModal(true)}
              className="px-4 py-2.5 rounded-xl bg-white text-slate-800 text-xs font-bold hover:bg-blue-50 transition-colors shadow-sm flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Ver Comprobante</span>
            </button>
            <button
              onClick={resetDemo}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-colors border border-white/20 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Order Key Data Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-slate-400 text-xs font-medium block">Número de Orden</span>
          <div className="text-lg font-bold text-slate-900 font-mono mt-1">
            {orderDetails.orderNumber}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded mt-2 inline-block">
            Pago Verificado
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-slate-400 text-xs font-medium block">Método de Pago</span>
          <div className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-blue-600" />
            <span>Visa •••• {orderDetails.lastFour}</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-2">
            Autorizado por {orderDetails.paymentMethod}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-slate-400 text-xs font-medium block">Sucursal de Origen</span>
          <div className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5">
            <Store className="w-4 h-4 text-indigo-600" />
            <span>Tienda Providencia</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-2">
            Micro-fulfillment Hub Express
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-slate-400 text-xs font-medium block">Promesa de Entrega</span>
          <div className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Mañana 11:00 - 13:00 hrs</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-medium block mt-2">
            Ventana horaria de 2 hrs
          </span>
        </div>
      </div>

      {/* GPS LIVE TRACKING INTERACTIVE COMPONENT */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Seguimiento Logístico en Vivo (Micro-Fulfillment Providencia)
          </h2>
          <span className="text-xs text-slate-500">
            Actualización cada 3 segundos
          </span>
        </div>

        <GpsMapTracker
          orderNumber={orderDetails.orderNumber}
          storeOrigin={orderDetails.storeOrigin}
          deliveryAddress={orderDetails.deliveryAddress}
          timeWindow={orderDetails.timeWindow}
        />
      </div>

      {/* Purchased Item Summary & Total */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-4">
          Resumen de la Compra
        </h3>

        <div className="flex items-center justify-between py-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img
              src={state.item.image}
              alt={state.item.name}
              className="w-16 h-16 rounded-xl object-cover bg-slate-100 border border-slate-200"
            />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                {state.item.name}
              </h4>
              <p className="text-xs text-slate-500">
                Talla: M • Color: Navy & Grafito • Cantidad: 1
              </p>
              <div className="text-[11px] text-emerald-600 font-medium mt-1">
                Garantía oficial 2 años Retail XXX
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono font-bold text-slate-900">
              ${(state.item.price - state.item.discount).toLocaleString('es-CL')} CLP
            </div>
            <div className="text-xs text-slate-400">
              Descuento -$5.000 aplicado
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Flete geolocalizado Providencia:</span>
            <span>
              {state.freeShippingApplied ? (
                <strong className="text-emerald-600">GRATIS ($0 CLP)</strong>
              ) : (
                `$${state.item.shipping.toLocaleString('es-CL')} CLP`
              )}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm font-bold text-slate-900 pt-2 border-t border-slate-100">
            <span>Total Pagado:</span>
            <span className="text-xl font-mono text-blue-900 font-extrabold">
              ${total.toLocaleString('es-CL')} CLP
            </span>
          </div>
        </div>
      </div>

      {/* Modal: Comprobante Digital */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="text-center pb-4 border-b border-slate-200">
              <span className="font-black text-xl tracking-wider text-blue-900">
                RETAIL XXX
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                Comprobante Electrónico de Compra PMV
              </p>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">N° Comprobante:</span>
                <span className="font-mono font-bold text-slate-800">
                  {orderDetails.orderNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fecha y Hora:</span>
                <span className="text-slate-800">{orderDetails.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Medio de Pago:</span>
                <span className="text-slate-800">{orderDetails.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dirección:</span>
                <span className="text-slate-800 text-right">{orderDetails.deliveryAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Puntos Club Ganados:</span>
                <span className="font-bold text-amber-600">+{orderDetails.clubPoints} pts</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold">
                <span>Total Facturado:</span>
                <span className="font-mono text-blue-900">${total.toLocaleString('es-CL')} CLP</span>
              </div>
            </div>

            <button
              onClick={() => setShowReceiptModal(false)}
              className="w-full mt-4 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
            >
              Cerrar Comprobante
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
