
export default function ProductCard({ product }) {
  if (!product) return null;

  const handleBuy = () => {
    const message = `Halo, saya mau beli ${product.name}`;
    window.open(
      `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`
    );
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
        className="h-48 w-full object-cover rounded"
      />

      <h2 className="font-bold mt-2">{product.name}</h2>
      <p className="text-sm text-gray-500">{product.category}</p>

      <p className="font-semibold">
        Rp {Number(product.price || 0).toLocaleString()}
      </p>

      <button
        onClick={handleBuy}
        className="mt-3 w-full bg-black text-white py-2 rounded"
      >
        Checkout WhatsApp
      </button>
    </div>
  );
}
