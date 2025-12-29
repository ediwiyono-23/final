import { useEffect } from "react";

export default function Dialog({ open, onClose, title, children, onConfirm }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
      <div className="bg-white rounded-xl shadow-lg z-10 w-96 p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="mt-4">{children}</div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded border">Batal</button>
          <button onClick={onConfirm} className="px-3 py-1 rounded bg-red-600 text-white">Hapus</button>
        </div>
      </div>
    </div>
  );
}
