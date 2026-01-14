import { createPortal } from "react-dom";

export default function NotificationModal({ isOpen, message, onClose, onConfirm }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      <div className="relative bg-[#0b1220] border border-amber-500/20 p-8 rounded-4xl max-w-85 w-full shadow-[0_25px_50px_-12px_rgba(245,158,11,0.25)] scale-in-center">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-4 border border-amber-500/20">
            <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          
          <h3 className="text-white font-black text-xl uppercase tracking-tighter mb-2">
            Konfirmasi
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            {message}
          </p>
          
          <div className="flex gap-3 w-full">
            <button 
              onClick={onClose}
              className="flex-1 py-3.5 rounded-2xl bg-white/5 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5"
            >
              Batal
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-3.5 rounded-2xl bg-linear-to-r from-orange-600 to-amber-500 text-black text-xs font-black uppercase tracking-widest hover:brightness-110 shadow-lg shadow-orange-600/20 transition-all"
            >
              iya
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body 
  );
}