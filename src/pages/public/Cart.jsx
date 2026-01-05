import { useCart } from "../../context/CartContext";

export default function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Keranjang Kosong</h2>
        <p className="text-gray-500">Belum ada produk</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black mb-8">Keranjang Belanja</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border p-4 rounded-xl"
          >
            <div>
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-gray-500">
                Rp {item.price.toLocaleString("id-ID")}
              </p>

              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-3 py-1 border rounded"
                >
                  −
                </button>
                <span className="font-bold">{item.qty}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:underline"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Total: Rp {totalPrice.toLocaleString("id-ID")}
        </h2>

        <a
          href={`https://wa.me/6281362011079?text=${encodeURIComponent(
            `Halo, saya mau checkout dengan total Rp ${totalPrice}`
          )}`}
          className="bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          Checkout WhatsApp
        </a>
      </div>
    </div>
  );
}
