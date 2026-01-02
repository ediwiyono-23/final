
import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function ProductCard({ product }) {
  if (!product) return null;

  const handleBuy = () => {
    const message = `Halo, saya mau beli ${product.name}`;
    window.open(
      `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4">
      <Link to={`/detail-produk/${product.id}`}>
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="h-48 w-full object-cover rounded cursor-pointer hover:opacity-90 transition"
        />
      </Link>

      <div className="flex items-center justify-between gap-2 mt-3">
        <h2 className="font-bold text-sm flex-1 line-clamp-2">{product.name}</h2>
        <Badge className="bg-blue-100 text-blue-800 text-xs whitespace-nowrap">{product.category}</Badge>
      </div>

      <p className="font-semibold mt-2 text-sm">
        Rp {Number(product.price || 0).toLocaleString("id-ID")}
      </p>import { Link } from "react-router-dom";

<Link
  to={`/detail-produk/${product.id}`}
  className="text-xs text-blue-600 hover:underline"
>
  Lihat Detail →
</Link>


      <div className="mt-3 flex flex-col gap-2">
        <Button onClick={handleBuy} className="w-full py-2 text-sm">
          Beli WhatsApp
        </Button>
        <Link
          to={`/detail-produk/${product.id}`}
          className="block text-center text-xs text-blue-600 hover:underline"
        >
          Lihat Detail →
        </Link>
      </div>
    </div>
  );
}
