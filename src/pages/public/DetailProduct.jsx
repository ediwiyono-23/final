
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../../services/api";
import { useCart } from "../../context/CartContext";
import Button from "../../components/ui/Button";
import NotificationModal from "../../components/ui/NotificationModal";

export default function DetailProduct() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchProduct = () => {
      fetch(`${API_URL}/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    };

    fetchProduct();
    window.addEventListener("stock-updated", fetchProduct);

    return () => {
      window.removeEventListener("stock-updated", fetchProduct);
    };
  }, [id]);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#020617]">
        <p className="text-xs font-black tracking-[0.4em] text-slate-400 animate-pulse">
          MEMUAT PRODUK...
        </p>
      </div>
    );
  }

  const isOut = product.stock === 0;
  const isLow = product.stock > 0 && product.stock <= 5;
  const handleConfirmAdd = async () => {
    if (isOut || isUpdating) {
      alert("❌ Stok produk sudah habis");
      return;
    }

    setIsUpdating(true);
    await addToCart(product); 
    setIsUpdating(false);
    setIsModalOpen(false);
  };

  const handleBuyWA = () => {
    if (isOut) {
      alert("❌ Stok produk sudah habis");
      return;
    }

    const message =
      `Halo admin, saya mau beli produk berikut:%0A%0A` +
      `📦 *${product.name}*%0A` +
      `💰 Harga: Rp ${Number(product.price).toLocaleString("id-ID")}%0A` +
      `📊 Stok tersedia: ${product.stock}`;

    window.open(`https://wa.me/6281362011079?text=${message}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200">
      <NotificationModal
        isOpen={isModalOpen}
        message={`Tambahkan ${product.name} ke keranjang belanja?`}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAdd}
      />

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-20">
        <div className="space-y-6">
          <Link
            to="/home"
            className="inline-block text-xs font-bold tracking-widest text-slate-400 hover:text-white transition"
          >
            ← KEMBALI KE TOKO
          </Link>

          <div className="relative rounded-[3rem] p-10 md:p-16 bg-linear-to-br from-[#0b1220] to-[#020617] border border-white/10 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain transition-transform duration-700 hover:scale-110"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-10">
          <div>
            <p className="text-indigo-400 text-xs font-black tracking-[0.3em] uppercase mb-2">
              {product.category}
            </p>
            <h1 className="text-5xl xl:text-6xl font-black tracking-tight text-white">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <span className="text-4xl font-black text-white">
              Rp {Number(product.price).toLocaleString("id-ID")}
            </span>

            {isOut ? (
              <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-sm font-bold">
                Stok Habis
              </span>
            ) : isLow ? (
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-bold">
                Sisa {product.stock}
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-bold">
                Tersedia ({product.stock})
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-5 pt-6">
            <Button
              disabled={isOut || isUpdating}
              onClick={() => setIsModalOpen(true)}
              className={`flex-1 py-6 text-xs font-black tracking-widest rounded-2xl transition-all
                ${
                  isOut
                    ? "bg-white/5 text-slate-500 cursor-not-allowed"
                    : "bg-white/10 text-white hover:bg-white/20 active:scale-95"
                }`}
            >
              TAMBAH KERANJANG
            </Button>

            <Button
              disabled={isOut}
              onClick={handleBuyWA}
              className={`flex-1 py-6 text-xs font-black tracking-widest rounded-2xl transition-all
                ${
                  isOut
                    ? "bg-emerald-500/20 text-emerald-200 cursor-not-allowed"
                    : "bg-linear-to-r from-emerald-500 to-green-400 text-black hover:brightness-110 active:scale-95"
                }`}
            >
              BELI VIA WHATSAPP
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}