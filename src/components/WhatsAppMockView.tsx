import React, { useState } from 'react';
import {
  CheckCheck,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Mic,
  Send,
  BadgeCheck,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Truck,
  RotateCcw,
  Store
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const WhatsAppMockView: React.FC = () => {
  const { state, recoverFromWhatsApp, setStep } = useCart();
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: '¡Hola! Guardamos tu Chaqueta Urban Waterproof en Tienda Providencia por 24 horas. Completa tu compra hoy y el envío es totalmente GRATIS. Paga en 1 toque aquí 👇',
      time: '18:15',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendCustomMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const currentTime = new Date().toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Append user message
    const updatedMessages = [
      ...messages,
      { sender: 'user' as const, text, time: currentTime },
    ];
    setMessages(updatedMessages);
    setInputText('');

    // Simulated Bot auto-reply based on intent
    setTimeout(() => {
      let reply = '¡Excelente! Tu carrito está reservado en Tienda Providencia con envío gratuito garantizado.';
      const lower = text.toLowerCase();
      if (lower.includes('garantía') || lower.includes('devolución')) {
        reply = '🛡️ Tienes 2 años de garantía Retail XXX y 30 días para cambio sin costo directo en Tienda Providencia o a domicilio.';
      } else if (lower.includes('hora') || lower.includes('cuándo') || lower.includes('entrega')) {
        reply = '⚡ Tu pedido sale desde nuestra tienda Providencia y llega mañana entre 11:00 y 13:00 hrs.';
      } else if (lower.includes('pago') || lower.includes('tarjeta') || lower.includes('touch')) {
        reply = '💳 Aceptamos 1-Click con Touch ID, Visa, Mastercard y respaldo por SMS OTP. ¡Cero fricciones!';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString('es-CL', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    }, 900);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Top Banner Explaining the PMV WhatsApp Strategy */}
      <div className="mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-5 rounded-2xl shadow-lg border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold flex-shrink-0">
            <Sparkles className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/25 px-2 py-0.5 rounded-full text-white">
                PMV Reenganche Omnicanal
              </span>
              <span className="text-xs text-emerald-100 font-mono">
                Trigger: 15 min post-abandono
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">
              Simulación de WhatsApp Business API
            </h2>
            <p className="text-xs text-emerald-100 max-w-xl">
              Al abandonar el carrito, Retail XXX reactiva la compra ofreciendo envío gratis ($0 CLP) desde el hub de Providencia y enlace de 1 toque directo al checkout.
            </p>
          </div>
        </div>

        <button
          onClick={() => setStep('cart')}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Volver al Carrito</span>
        </button>
      </div>

      {/* WhatsApp Interface Wrapper */}
      <div className="bg-[#efeae2] rounded-3xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col h-[700px]">
        {/* WhatsApp Chat Header */}
        <div className="bg-[#075e54] text-white px-5 py-3.5 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-900 border-2 border-white flex items-center justify-center font-bold text-white shadow-sm overflow-hidden">
                <Store className="w-5 h-5 text-blue-200" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-white">
                  Retail XXX Oficial
                </span>
                <BadgeCheck className="w-4 h-4 text-emerald-300 fill-emerald-500" />
              </div>
              <p className="text-[11px] text-emerald-100">
                en línea • Cuenta comercial verificada
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-emerald-100">
            <button className="hover:text-white transition-colors" title="Llamada">
              <Phone className="w-5 h-5" />
            </button>
            <button className="hover:text-white transition-colors" title="Videollamada">
              <Video className="w-5 h-5" />
            </button>
            <button className="hover:text-white transition-colors" title="Más opciones">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* WhatsApp Chat Body with Authentic Background */}
        <div
          className="flex-1 p-5 overflow-y-auto space-y-4"
          style={{
            backgroundImage: `radial-gradient(#d1d5db 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        >
          {/* Security Banner Notice */}
          <div className="flex justify-center">
            <div className="bg-[#ffeecd] text-[#54656f] text-[11px] px-4 py-1.5 rounded-lg shadow-sm max-w-md text-center border border-[#e5d5b3]">
              🔒 Los mensajes y llamadas están cifrados de extremo a extremo. Retail XXX usa este canal para soporte oficial y recuperación de pedidos.
            </div>
          </div>

          {/* Timestamp marker */}
          <div className="flex justify-center">
            <span className="bg-white/80 text-slate-600 text-[11px] font-semibold px-3 py-1 rounded-md shadow-sm">
              HOY (15 minutos después de salir del sitio)
            </span>
          </div>

          {/* Incoming Automated Message */}
          <div className="flex flex-col items-start max-w-lg">
            <div className="bg-white text-slate-800 p-4 rounded-2xl rounded-tl-none shadow-md border border-slate-200 space-y-3">
              <p className="text-sm leading-relaxed">
                ¡Hola! Guardamos tu <strong>Chaqueta Urban Waterproof</strong> en Tienda Providencia por 24 horas. Completa tu compra hoy y el envío es totalmente <strong>GRATIS</strong>. Paga en 1 toque aquí:
              </p>

              {/* Rich Interactive Product Recovery Card inside WhatsApp */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/90 shadow-sm space-y-3">
                <div className="flex gap-3">
                  <img
                    src={state.item.image}
                    alt={state.item.name}
                    className="w-20 h-20 rounded-lg object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      Reserva Exclusiva 24h
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">
                      {state.item.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <Store className="w-3.5 h-3.5 text-blue-600" />
                      <span>Stock en Tienda Providencia</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown comparison */}
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Precio normal con flete:</span>
                    <span className="line-through font-mono">$47.980 CLP</span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> Cupón WhatsApp:
                    </span>
                    <span>Envío GRATIS (-$2.990)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-extrabold text-blue-900 pt-1 border-t border-slate-100">
                    <span>Total con Envío Gratis:</span>
                    <span className="text-base text-emerald-600 font-mono">
                      $44.990 CLP
                    </span>
                  </div>
                </div>

                {/* Main PMV Action Button */}
                <button
                  type="button"
                  onClick={recoverFromWhatsApp}
                  className="w-full py-3 px-4 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] transition-all shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Recuperar Carrito con Envío Gratis ($44.990 CLP)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400">
                <span>18:15</span>
              </div>
            </div>
          </div>

          {/* Dynamic Follow-up Messages */}
          {messages.slice(1).map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`p-3.5 rounded-2xl shadow-sm max-w-md text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#d9fdd3] text-slate-900 rounded-tr-none'
                    : 'bg-white text-slate-900 rounded-tl-none border border-slate-200'
                }`}
              >
                <p>{msg.text}</p>
                <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 mt-1">
                  <span>{msg.time}</span>
                  {msg.sender === 'user' && (
                    <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Question Chips for Interactive Testing */}
        <div className="bg-slate-100/90 border-t border-slate-200 px-4 py-2.5 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 font-medium flex-shrink-0 text-[11px]">
            Respuestas Rápidas:
          </span>
          <button
            onClick={() => handleSendCustomMessage('¿Tienen garantía los productos?')}
            className="bg-white hover:bg-slate-50 text-slate-700 px-3 py-1 rounded-full border border-slate-300 font-medium whitespace-nowrap transition-colors"
          >
            🛡️ ¿Tienen garantía?
          </button>
          <button
            onClick={() => handleSendCustomMessage('¿Cuál es la ventana de entrega en Providencia?')}
            className="bg-white hover:bg-slate-50 text-slate-700 px-3 py-1 rounded-full border border-slate-300 font-medium whitespace-nowrap transition-colors"
          >
            ⏰ ¿Ventana de entrega?
          </button>
          <button
            onClick={() => handleSendCustomMessage('¿Cómo funciona el pago 1-click con Touch ID?')}
            className="bg-white hover:bg-slate-50 text-slate-700 px-3 py-1 rounded-full border border-slate-300 font-medium whitespace-nowrap transition-colors"
          >
            👆 ¿Cómo pago en 1-click?
          </button>
        </div>

        {/* WhatsApp Chat Footer Input */}
        <div className="bg-[#f0f2f5] px-4 py-3 flex items-center gap-3 border-t border-slate-300">
          <button className="text-slate-500 hover:text-slate-700">
            <Smile className="w-6 h-6" />
          </button>
          <button className="text-slate-500 hover:text-slate-700">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Escribe un mensaje a Retail XXX..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendCustomMessage();
            }}
            className="flex-1 bg-white px-4 py-2.5 rounded-full text-sm outline-none border border-slate-200 focus:border-emerald-600 transition-all text-slate-800"
          />
          {inputText.trim() ? (
            <button
              onClick={() => handleSendCustomMessage()}
              className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors shadow-sm"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          ) : (
            <button className="text-slate-500 hover:text-slate-700">
              <Mic className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
