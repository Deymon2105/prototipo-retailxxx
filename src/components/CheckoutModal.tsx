import React, { useState, useEffect } from 'react';
import {
  X,
  Fingerprint,
  Smartphone,
  ShieldCheck,
  CreditCard,
  MapPin,
  AlertTriangle,
  Lock,
  Zap,
  RotateCcw
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { state, calculateTotal, completeOrder } = useCart();

  // Mode: 'biometric' | 'otp'
  const [authMode, setAuthMode] = useState<'biometric' | 'otp'>('biometric');
  const [isScanning, setIsScanning] = useState(false);
  const [biometricError, setBiometricError] = useState(false);
  const [simulateFailureToggle, setSimulateFailureToggle] = useState(false);

  // OTP inputs
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [otpSubmitting, setOtpSubmitting] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const total = calculateTotal();

  // Handle Biometric Click
  const handleBiometricAuth = () => {
    setIsScanning(true);
    setBiometricError(false);

    setTimeout(() => {
      if (simulateFailureToggle) {
        // Trigger simulated failure
        setIsScanning(false);
        setBiometricError(true);
        setTimeout(() => {
          setAuthMode('otp');
        }, 1200);
      } else {
        // Success
        setIsScanning(false);
        completeOrder('Touch ID / Passkey (Biometría 1-Click)');
      }
    }, 1800);
  };

  // Handle Fill Mock OTP
  const handleFillMockOtp = () => {
    setOtpDigits(['4', '8', '2', '1']);
  };

  // Handle OTP Digit Change
  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const newDigits = [...otpDigits];
    newDigits[index] = val;
    setOtpDigits(newDigits);

    // Auto focus next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Validate and submit OTP
  const handleValidateOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSubmitting(true);
    setTimeout(() => {
      setOtpSubmitting(false);
      completeOrder('Código SMS OTP de Respaldo');
    }, 1200);
  };

  const isOtpComplete = otpDigits.every((d) => d.trim().length === 1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 pb-8 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] overflow-y-auto">
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-6 relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              1-Click Checkout
            </span>
            <span className="text-slate-400 text-xs flex items-center gap-1 font-mono">
              <Lock className="w-3.5 h-3.5" /> Encriptación AES-256
            </span>
          </div>

          <h2 className="text-xl font-bold text-white tracking-tight">
            Autorización de Pago Seguro
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Sin formularios ni portales externos. Confirmación inmediata en tu cuenta.
          </p>
        </div>

        {/* Saved Tokenized Credentials (Zero friction) */}
        <div className="p-6 space-y-5">
          {/* Credit Card Tokenized Display */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-700 shadow-sm relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Tarjeta Tokenizada Guardada
                </span>
              </div>
              <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-medium">
                Verificada por Banco
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-mono tracking-widest text-white font-semibold">
                  •••• •••• •••• 4821
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Santander Platinum Visa • Exp: 09/28
                </div>
              </div>
              <div className="text-right">
                <span className="font-extrabold italic text-xl tracking-tighter text-white">
                  VISA
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Address & Order Total */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 font-medium flex items-center gap-1 mb-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" /> Dirección de Entrega:
              </span>
              <p className="font-semibold text-slate-800">
                Av. Providencia 1240, Dpto 502
              </p>
              <p className="text-slate-500 text-[11px]">Providencia, Santiago</p>
            </div>
            <div className="text-right border-l border-slate-200 pl-3">
              <span className="text-slate-400 font-medium mb-1 block">
                Total a Facturar:
              </span>
              <div className="text-lg font-bold text-slate-900 font-sans">
                ${total.toLocaleString('es-CL')} CLP
              </div>
              {state.freeShippingApplied && (
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  Envío Gratis WhatsApp
                </span>
              )}
            </div>
          </div>

          {/* Demo Control: Simulator Toggle for Biometric Error */}
          <div className="bg-amber-50 border border-amber-200/90 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <div>
                <div className="text-xs font-bold text-amber-900">
                  Control de Prueba PMV:
                </div>
                <div className="text-[11px] text-amber-700">
                  Simular falla de sensor biométrico para probar respaldo OTP
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={simulateFailureToggle}
                onChange={(e) => setSimulateFailureToggle(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
            </label>
          </div>

          {/* MODE 1: BIOMETRIC AUTHENTICATION */}
          {authMode === 'biometric' && (
            <div className="text-center py-2 space-y-4">
              {biometricError ? (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-2">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-rose-900 text-sm">
                    Sensor no disponible o lectura fallida
                  </h4>
                  <p className="text-xs text-rose-700 mt-1">
                    Activando automáticamente el respaldo seguro por SMS (OTP)...
                  </p>
                </div>
              ) : (
                <>
                  <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                    <div
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-colors ${
                        isScanning
                          ? 'bg-blue-600 text-white ring-2 ring-blue-500 ring-offset-2'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Fingerprint className="w-11 h-11" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 text-base">
                      {isScanning
                        ? 'Verificando huella dactilar / Passkey...'
                        : 'Autorizar con Touch ID / Passkey'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Usa tu sensor biométrico en móvil o Touch ID / Windows Hello en desktop
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={isScanning}
                    onClick={handleBiometricAuth}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <Fingerprint className="w-5 h-5" />
                    <span>
                      {isScanning
                        ? 'Escaneando biometría...'
                        : `Pagar $${total.toLocaleString('es-CL')} CLP con Touch ID`}
                    </span>
                  </button>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('otp');
                      }}
                      className="text-xs font-semibold text-slate-500 hover:text-blue-600 underline transition-colors"
                    >
                      ¿No tienes biometría activa? Usar código SMS (OTP)
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* MODE 2: OTP BACKUP (NO ABANDONMENT TOLERANCE) */}
          {authMode === 'otp' && (
            <form onSubmit={handleValidateOtp} className="space-y-4">
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-2">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">
                  Respaldo OTP Anti-Bloqueos
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Enviamos un código de 4 dígitos al número registrado{' '}
                  <strong className="text-slate-900">+56 9 **** 1234</strong>
                </p>
              </div>

              {/* 4 Digit Boxes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 text-center mb-2">
                  Ingresa el código de 4 dígitos
                </label>
                <div className="flex justify-center gap-3">
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-13 h-14 text-center text-2xl font-bold font-mono rounded-xl border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white"
                      placeholder="•"
                    />
                  ))}
                </div>
              </div>

              {/* Mock Quick-fill Helper */}
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleFillMockOtp}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-300"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Autocompletar código mock (4 8 2 1)</span>
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isOtpComplete || otpSubmitting}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 ${
                  isOtpComplete && !otpSubmitting
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25'
                    : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span>
                  {otpSubmitting
                    ? 'Validando código SMS...'
                    : `Validar y Pagar $${total.toLocaleString('es-CL')} CLP`}
                </span>
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode('biometric')}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                >
                  Volver a autorizar con Touch ID
                </button>
              </div>
            </form>
          )}

          {/* Guarantee Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Tokenización PCI-DSS
            </span>
            <span>Garantía Retail XXX Protección Total</span>
          </div>
        </div>
      </div>
    </div>
  );
};
