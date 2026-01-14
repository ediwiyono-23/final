import { useState } from "react";
import { useCart } from "../../context/CartContext";
import NotificationModal from "../ui/NotificationModal"; 

export default function MiniCart({ onClose }) {
  const { cart, increaseQty, decreaseQty, removeFromCart, totalPrice } = useCart();
  const [productToDelete, setProductToDelete] = useState(null);

  if (cart.length === 0) {
    return (
      <div className="w-80 bg-white shadow-2xl rounded-2xl p-5 text-sm text-gray-500 animate-cart">
        Keranjang masih kosong
      </div>
    );
  }

  const handleCheckout = () => {
    const message = `Halo, saya mau checkout:\n\n${cart
      .map(
        (item) =>
          `- ${item.name} (${item.qty} x Rp ${item.price.toLocaleString(
            "id-ID"
          )})`
      )
      .join("\n")}\n\nTotal: Rp ${totalPrice.toLocaleString("id-ID")}`;

    window.open(
      `https://wa.me/6281362011079?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    onClose?.();
  };

  return (
    <>
      <NotificationModal
        isOpen={!!productToDelete}
        message={`Apakah Anda yakin ingin menghapus "${productToDelete?.name}" dari keranjang?`}
        onClose={() => setProductToDelete(null)}
        onConfirm={() => {
          removeFromCart(productToDelete.id);
          setProductToDelete(null);
        }}
      />

      <div className="w-80 bg-white shadow-2xl rounded-2xl p-5 text-black animate-cart">
        <h3 className="font-bold mb-4 text-base">Keranjang</h3>

        <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-start text-sm gap-3 border-b border-gray-50 pb-3 last:border-0">
              <div className="flex-1">
                <p className="font-semibold line-clamp-2">{item.name}</p>
                <p className="text-gray-500 text-xs mt-1">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.qty > 1) {
                        decreaseQty(item.id);
                      } else {
                        setProductToDelete(item);
                      }
                    }}
                    className="w-7 h-7 flex items-center justify-center border rounded-full hover:bg-gray-100 transition"
                  >
                    −
                  </button>

                  <span className="font-semibold min-w-4 text-center">
                    {item.qty}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      increaseQty(item.id);
                    }}
                    className="w-7 h-7 flex items-center justify-center border rounded-full hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => setProductToDelete(item)}
                    className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded-lg transition"
                    title="Hapus item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <span className="font-semibold whitespace-nowrap">
                Rp {(item.price * item.qty).toLocaleString("id-ID")}
              </span>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="flex justify-between font-bold mb-4">
          <span>Total</span>
          <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
        </div>

        <button
          type="button"
          onClick={handleCheckout}
          className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2.5 rounded-xl text-sm font-semibold"
        >
          Checkout via WhatsApp
        </button>
      </div>
    </>
  );
}