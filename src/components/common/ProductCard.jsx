/* eslint-disable react-hooks/rules-of-hooks */
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function ProductCard({ product }) {
  if (!product) return null;

  const { addToCart } = useCart();

  const handleBuy = () => {
    const message = `Halo, saya mau beli ${product.name} dengan harga Rp ${Number(
      product.price
    ).toLocaleString("id-ID")}`;
    window.open(
      `https://wa.me/6281362011079?text=${encodeURIComponent(message)}`
    );
  };

  return (
    <div className="bg-[#6f7072] text-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col">
      <Link to={`/detail-produk/${product.id}`} className="flex justify-center">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="h-56 object-contain hover:scale-105 transition"
        />
      </Link>

      <div className="mt-5 flex-1">
        <div className="flex justify-between items-start gap-2">
          <h2 className="font-bold text-lg uppercase leading-snug">
            {product.name}
          </h2>
          <Badge className="bg-white/10 text-white text-xs">
            {product.category}
          </Badge>
        </div>

        <p className="font-bold mt-4 text-xl text-yellow-400">
          Rp {Number(product.price).toLocaleString("id-ID")}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <Button
          onClick={() => addToCart(product)}
          className="w-full bg-black hover:bg-gray-900 text-white rounded-xl"
        >
          + Keranjang
        </Button>

        <Button
          onClick={handleBuy}
          className="w-full bg-green-600 hover:bg-green-700 rounded-xl"
        >
          Beli WhatsApp
        </Button>

        <Link
          to={`/detail-produk/${product.id}`}
          className="block text-center text-sm text-blue-400 hover:underline font-medium"
        >
          Lihat Detail →
        </Link>
      </div>
    </div>
  );
}
