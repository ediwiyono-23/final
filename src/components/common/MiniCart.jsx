import { useState } from "react";
import { useCart } from "../../context/CartContext";
import NotificationModal from "../ui/NotificationModal"; 

export default function MiniCart({ onClose }) {
  const { cart, increaseQty, decreaseQty, removeFromCart, totalPrice } = useCart();
  const [productToDelete, setProductToDelete] = useState(null);
  const containerClass = "w-[calc(100vw-2rem)] md:w-80 bg-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.45)] rounded-2xl p-5 text-black animate-cart";

  if (cart.length === 0) {
    return (
      <div className={containerClass}>
        <p className="text-sm text-gray-500 text-center py-4">Keranjang masih kosong</p>
      </div>
    );
  }

  const handleCheckout = () => {
    const message = `Halo BijiStore, saya mau checkout:\n\n${cart
      .map((item) => `- ${item.name} (${item.qty} x Rp ${item.price.toLocaleString("id-ID")})`)
      .join("\n")}\n\nTotal: Rp ${totalPrice.toLocaleString("id-ID")}`;

    window.open(`https://wa.me/6281362011079?text=${encodeURIComponent(message)}`, "_blank");
    onClose?.();
  };

  return (
    <>
      <NotificationModal
        isOpen={!!productToDelete}
        message={`Hapus "${productToDelete?.name}"?`}
        onClose={() => setProductToDelete(null)}
        onConfirm={() => {
          removeFromCart(productToDelete.id);
          setProductToDelete(null);
        }}/>

      <div className={containerClass}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-black text-xs uppercase tracking-widest text-gray-400">Keranjang</h3>
          <button onClick={onClose} className="md:hidden text-gray-400 text-xs">Tutup</button>
        </div>

        <div className="space-y-4 max-h-[40vh] md:max-h-60 overflow-y-auto pr-1">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-start text-sm gap-3 border-b border-gray-50 pb-3 last:border-0">
              <div className="flex-1">
                <p className="font-bold text-gray-900 leading-tight mb-1">{item.name}</p>
                <p className="text-blue-600 font-bold text-[10px]">Rp {item.price.toLocaleString("id-ID")}</p>

                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-gray-100 rounded-full px-2 py-1 bg-gray-50">
                    <button onClick={() => item.qty > 1 ? decreaseQty(item.id) : setProductToDelete(item)} className="w-5 h-5 flex items-center justify-center font-bold">-</button>
                    <span className="px-3 font-black text-xs">{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)} className="w-5 h-5 flex items-center justify-center font-bold">+</button>
                  </div>
                  <button onClick={() => setProductToDelete(item)} className="text-red-400 hover:text-red-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <span className="font-black text-[10px] text-gray-900">
                Rp {(item.price * item.qty).toLocaleString("id-ID")}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
          <div className="flex justify-between font-black text-lg mb-4">
            <span className="text-gray-400 text-[10px] uppercase self-center tracking-widest">Total</span>
            <span className="text-blue-600">Rp {totalPrice.toLocaleString("id-ID")}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-100 transition-transform active:scale-95">
            Checkout via WhatsApp
          </button>
        </div>
      </div>
    </>
  );
}