import { useEffect } from "react";
import Button from "./Button"; 

export default function Dialog({ open, onClose, title, children, onConfirm }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener("keydown", handler);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener("keydown", handler);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-2xl z-10 w-full max-w-md p-6 transform transition-all">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <div className="mt-4 text-gray-600">{children}</div>
        
        <div className="mt-8 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button variant="danger" onClick={onConfirm}>Ya, Hapus</Button>
        </div>
      </div>
    </div>
  );
}
