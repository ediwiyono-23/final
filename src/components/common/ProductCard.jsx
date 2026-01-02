import { Link } from "react-router-dom";
import Badge from "../ui/Badge"; 
import Button from "../ui/Button"; 

export default function ProductCard({ product }) {
  if (!product) return null;

  const handleBuy = () => {
    const message = `Halo, saya mau beli ${product.name}`;
    window.open(`https://wa.me/6281362011079?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 border flex flex-col h-full">
      <Link to={`/detail-produk/${product.id}`}>
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="h-48 w-full object-cover rounded hover:opacity-90 transition"
        />
      </Link>

      <div className="mt-4 flex-1">
        <div className="flex justify-between items-start gap-2">
          <h2 className="font-bold text-sm line-clamp-2">{product.name}</h2>
          <Badge className="bg-blue-100 text-blue-800">{product.category}</Badge>
        </div>
        <p className="font-bold mt-2 text-lg text-gray-900">
          Rp {Number(product.price).toLocaleString("id-ID")}
        </p>
      </div>

      <div className="mt-4 space-y-2">
        <Button onClick={handleBuy} className="w-full text-xs">Beli WhatsApp</Button>
        <Link
          to={`/detail-produk/${product.id}`}
          className="block text-center text-xs text-blue-600 hover:underline font-medium">
          Lihat Detail →
        </Link>
      </div>
    </div>
  );
}
