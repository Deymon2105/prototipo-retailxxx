import React, { useState, useEffect } from 'react';
import {
  Navigation,
  CheckCircle2,
  Clock,
  MapPin,
  Store,
  Phone,
  MessageSquare
} from 'lucide-react';

interface GpsMapTrackerProps {
  orderNumber: string;
  storeOrigin: string;
  deliveryAddress: string;
  timeWindow: string;
}

export const GpsMapTracker: React.FC<GpsMapTrackerProps> = ({
  orderNumber,
  storeOrigin,
  deliveryAddress,
  timeWindow,
}) => {
  const [activeStage, setActiveStage] = useState<1 | 2 | 3>(2);
  const [courierProgress, setCourierProgress] = useState(65); // 0 to 100%
  const [etaMinutes, setEtaMinutes] = useState(24);

  // Subtle live movement simulation
  useEffect(() => {
    if (activeStage !== 2) return;
    const interval = setInterval(() => {
      setCourierProgress((prev) => {
        if (prev >= 95) return 30; // loop for demo
        return prev + 1;
      });
      setEtaMinutes((prev) => (prev <= 5 ? 25 : prev - 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [activeStage]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden">
      {/* Map Header with Live Status */}
      <div className="bg-slate-900 text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-base text-white tracking-tight">
                Live GPS Delivery Tracking • {orderNumber}
              </h3>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full font-medium border border-emerald-500/30">
                En Tiempo Real
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Despacho express desde {storeOrigin} hacia {deliveryAddress}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Stage switchers for interactive demo */}
          <div className="bg-slate-800 p-1 rounded-xl flex items-center gap-1 text-xs text-slate-300">
            <span className="text-[11px] text-slate-400 px-1 font-mono">Fase demo:</span>
            <button
              onClick={() => setActiveStage(1)}
              className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
                activeStage === 1
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'hover:text-white hover:bg-slate-700/60'
              }`}
            >
              1. Preparando
            </button>
            <button
              onClick={() => setActiveStage(2)}
              className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
                activeStage === 2
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'hover:text-white hover:bg-slate-700/60'
              }`}
            >
              2. En Ruta
            </button>
            <button
              onClick={() => setActiveStage(3)}
              className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
                activeStage === 3
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'hover:text-white hover:bg-slate-700/60'
              }`}
            >
              3. Entregado
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Vector Map Canvas */}
      <div className="relative w-full h-[360px] bg-[#0f172a] overflow-hidden select-none">
        {/* Subtle Map Grid & Street Network (SVG) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-60"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            </pattern>
            {/* Gradient for route */}
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Major Streets of Providencia Simulation */}
          {/* Av. Andrés Bello / Costanera */}
          <path
            d="M -20 80 Q 200 70, 420 100 T 900 120"
            fill="none"
            stroke="#334155"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Mapuche / Rio Mapocho */}
          <path
            d="M -20 60 Q 200 50, 420 80 T 900 100"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="6"
            strokeOpacity="0.4"
          />
          {/* Av. Providencia */}
          <path
            d="M -20 180 Q 250 170, 500 200 T 900 220"
            fill="none"
            stroke="#475569"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M -20 180 Q 250 170, 500 200 T 900 220"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />

          {/* Av. Pedro de Valdivia */}
          <path
            d="M 180 -20 L 220 400"
            fill="none"
            stroke="#334155"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Av. Los Leones */}
          <path
            d="M 520 -20 L 550 400"
            fill="none"
            stroke="#334155"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Av. Manuel Montt */}
          <path
            d="M 800 -20 L 820 400"
            fill="none"
            stroke="#334155"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Minor diagonal connecting roads */}
          <path
            d="M 100 280 L 350 120"
            fill="none"
            stroke="#1e293b"
            strokeWidth="4"
          />
          <path
            d="M 380 260 L 680 140"
            fill="none"
            stroke="#1e293b"
            strokeWidth="4"
          />

          {/* ACTIVE DISPATCH ROUTE: From Tienda Providencia (x: 160, y: 180) to Customer Home (x: 640, y: 210) */}
          {/* Base Glow */}
          <path
            d="M 160 180 L 280 180 Q 320 180 340 210 L 480 210 Q 520 210 540 190 L 640 210"
            fill="none"
            stroke="#2563eb"
            strokeWidth="12"
            strokeOpacity="0.25"
            strokeLinecap="round"
          />
          {/* Animated Route Line */}
          <path
            d="M 160 180 L 280 180 Q 320 180 340 210 L 480 210 Q 520 210 540 190 L 640 210"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            className="animate-route-dash"
          />

          {/* Route distance labels */}
          <text x="360" y="240" fill="#94a3b8" fontSize="11" fontFamily="JetBrains Mono, monospace">
            Av. Providencia 2.8 km
          </text>
        </svg>

        {/* Santiago / Providencia Landmark Badges */}
        <div className="absolute top-6 left-6 pointer-events-none">
          <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>Parque Uruguay / Río Mapocho</span>
          </div>
        </div>

        <div className="absolute top-6 right-6 pointer-events-none">
          <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Sector Los Leones / Costanera</span>
          </div>
        </div>

        {/* Origin Marker: Tienda Providencia (Micro-fulfillment) */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{ left: '160px', top: '180px' }}
        >
          <div className="relative flex flex-col items-center">
            <div className="bg-blue-600 text-white p-2.5 rounded-full shadow-lg border-2 border-white ring-4 ring-blue-500/30 group-hover:scale-110 transition-transform">
              <Store className="w-5 h-5" />
            </div>
            <div className="mt-1 bg-slate-900/90 text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow border border-blue-500/40 whitespace-nowrap">
              Tienda Providencia (Salida)
            </div>
          </div>
        </div>

        {/* Courier Moving Marker (Electric Moto) */}
        {activeStage === 2 && (
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
            style={{
              left: `${160 + (courierProgress / 100) * (640 - 160)}px`,
              top: `${180 + (courierProgress / 100) * (210 - 180)}px`,
            }}
          >
            <div className="relative flex flex-col items-center">
              <div className="bg-emerald-600 text-white p-2 rounded-full shadow-md border-2 border-white flex items-center justify-center">
                <Navigation className="w-5 h-5 rotate-45" />
              </div>
              <div className="mt-1.5 bg-slate-900/95 text-emerald-300 text-[11px] font-mono px-2 py-0.5 rounded-md shadow-sm border border-slate-700 flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Carlos M. (ETA: {etaMinutes} min)</span>
              </div>
            </div>
          </div>
        )}

        {/* Destination Marker: Customer Home */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{ left: '640px', top: '210px' }}
        >
          <div className="relative flex flex-col items-center">
            <div className="bg-rose-600 text-white p-2.5 rounded-full shadow-lg border-2 border-white ring-4 ring-rose-500/30 group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="mt-1 bg-slate-900/90 text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow border border-rose-500/40 whitespace-nowrap">
              Tu Domicilio (Av. Providencia 1240)
            </div>
          </div>
        </div>

        {/* Floating live ETA overlay badge in bottom-right */}
        <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-3 rounded-xl shadow-md text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Ventana Comprometida
            </div>
            <div className="text-sm font-bold text-white">
              {timeWindow}
            </div>
            <div className="text-[11px] text-emerald-400 font-medium">
              Promesa horaria 2 hrs garantizada
            </div>
          </div>
        </div>
      </div>

      {/* Stepper Timeline - 3 Fases Logísticas */}
      <div className="p-6 bg-slate-50 border-t border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
          Fases de Micro-Fulfillment Retail XXX
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Phase 1: Preparación */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              activeStage >= 1
                ? 'bg-white border-blue-200 shadow-sm'
                : 'bg-slate-100/60 border-slate-200 opacity-60'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activeStage > 1
                    ? 'bg-emerald-100 text-emerald-600'
                    : activeStage === 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {activeStage > 1 ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Store className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Paso 1</span>
                  {activeStage > 1 && (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                      Listo
                    </span>
                  )}
                </div>
                <div className="font-semibold text-slate-800 text-sm mt-0.5">
                  Preparando en Tienda
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Empacado y verificado en <strong className="text-slate-700">Tienda Providencia</strong>
                </p>
                <div className="text-[11px] text-slate-400 mt-2">18:04 hrs - Verificado</div>
              </div>
            </div>
          </div>

          {/* Phase 2: Repartidor en Ruta */}
          <div
            className={`p-4 rounded-xl border transition-all relative ${
              activeStage === 2
                ? 'bg-white border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                : activeStage > 2
                ? 'bg-white border-blue-200 shadow-sm'
                : 'bg-slate-100/60 border-slate-200 opacity-60'
            }`}
          >
            {activeStage === 2 && (
              <span className="absolute -top-2.5 right-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                En Vivo
              </span>
            )}
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activeStage > 2
                    ? 'bg-emerald-100 text-emerald-600'
                    : activeStage === 2
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {activeStage > 2 ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Navigation className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Paso 2</span>
                  {activeStage === 2 && (
                    <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-medium">
                      En Tránsito
                    </span>
                  )}
                </div>
                <div className="font-semibold text-slate-800 text-sm mt-0.5">
                  Repartidor en Ruta
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Moto eléctrica ECO-04 en camino a Providencia
                </p>
                <div className="text-[11px] text-blue-600 font-medium mt-2">
                  ETA Estimado: ~{etaMinutes} min
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3: Entregado */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              activeStage === 3
                ? 'bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                : 'bg-slate-100/60 border-slate-200 opacity-60'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activeStage === 3
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Paso 3</span>
                  {activeStage === 3 && (
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">
                      Completado
                    </span>
                  )}
                </div>
                <div className="font-semibold text-slate-800 text-sm mt-0.5">
                  Entregado en tu Puerta
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Firma digital o recepción en conserjería
                </p>
                <div className="text-[11px] text-slate-400 mt-2">
                  {timeWindow}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Courier Details Card */}
        <div className="mt-5 p-4 bg-white rounded-xl border border-slate-200/90 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-slate-800 text-white font-semibold flex items-center justify-center text-base shadow-xs border border-slate-700">
              CM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 text-sm">
                  Carlos Méndez
                </span>
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  ★ 4.9 (418 entregas)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Vehículo: Moto Eléctrica ECO-04 • Flota Retail XXX Express Providencia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert('Simulación: Llamando a Carlos Méndez (+56 9 8765 4321)...')}
              className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Llamar al Repartidor</span>
            </button>
            <button
              type="button"
              onClick={() => alert('Simulación: Abriendo chat directo con el repartidor')}
              className="px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Repartidor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
