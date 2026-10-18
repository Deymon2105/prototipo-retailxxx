import React from 'react';
import { X, Copy, Check, Database, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface StateInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StateInspectorModal: React.FC<StateInspectorModalProps> = ({ isOpen, onClose }) => {
  const { state, resetDemo } = useCart();
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(state, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="bg-slate-900 text-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-700 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center border border-blue-500/40">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">
                Estado en LocalStorage
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Clave: <code className="text-blue-300">retail_xxx_cart_state</code>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 my-4 overflow-y-auto bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-blue-300">
          <pre>{jsonString}</pre>
        </div>

        <div className="pt-2 flex items-center justify-between gap-3 text-xs">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">¡Copiado al portapapeles!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar JSON</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              resetDemo();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 font-medium flex items-center gap-1.5 transition-colors border border-rose-800/40"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Resetear a Estado Inicial</span>
          </button>
        </div>
      </div>
    </div>
  );
};
