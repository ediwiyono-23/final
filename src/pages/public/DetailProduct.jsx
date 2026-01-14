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
  const [activeTrust, setActiveTrust] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  const handleConfirmAdd = () => {
    addToCart(product);
    setIsModalOpen(false);
  };

  const handleBuyWA = () => {
    const message = `Halo admin, saya mau beli produk berikut:%0A%0A📦 *${product.name}*%0A💰 Harga: Rp ${Number(
      product.price
    ).toLocaleString("id-ID")}`;
    window.open(`https://wa.me/6281362011079?text=${message}`, "_blank");
  };

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#020617]">
        <p className="text-xs font-black tracking-[0.4em] text-slate-400 animate-pulse">
          MEMUAT PRODUK...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200">
      <NotificationModal
        isOpen={isModalOpen}
        message={`Tambahkan ${product.name} ke keranjang belanja?`}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAdd}
      />

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-20">

        {/* IMAGE */}
        <div className="space-y-6">
          <Link
            to="/home"
            className="inline-block text-xs font-bold tracking-widest text-slate-400 hover:text-white transition"
          >
            ← KEMBALI KE TOKO
          </Link>

          <div className="relative rounded-[3rem] p-10 md:p-16 bg-gradient-to-br from-[#0b1220] to-[#020617] border border-white/10 overflow-hidden group">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
            </div>

            <img
              src={product.image}
              alt={product.name}
              className="relative z-10 w-full h-auto object-contain transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col justify-center space-y-10">
          <div>
            <p className="text-indigo-400 text-xs font-black tracking-[0.3em] uppercase mb-2">
              {product.category}
            </p>
            <h1 className="text-5xl xl:text-6xl font-black tracking-tight text-white">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-4xl font-black text-white">
              Rp {Number(product.price).toLocaleString("id-ID")}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-bold">
              Tersedia
            </span>
          </div>

          <div className="relative pl-6">
            <span className="absolute left-0 top-0 h-full w-1 rounded-full bg-gradient-to-b from-indigo-500 to-cyan-400" />
            <p className="text-slate-400 text-lg leading-relaxed">
              {product.description ||
                "Produk pilihan terbaik dari BijiStore. Kami menjamin kualitas dan keaslian setiap item yang kami kirimkan ke tangan Anda."}
            </p>
          </div>

          {/* ACTION — GLOW BALIK */}
          <div className="relative pt-6">

            {/* AMBIENT GLOW */}
            <div className="pointer-events-none absolute inset-x-0 -top-6 flex justify-center gap-20">
              <div className="w-64 h-24 bg-white/10 blur-[80px]" />
              <div className="w-64 h-24 bg-emerald-500/30 blur-[80px]" />
            </div>

            <div className="relative flex flex-col sm:flex-row gap-5">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="
                  flex-1 py-6
                  bg-white/10 text-white
                  text-xs font-black tracking-widest
                  rounded-2xl
                  hover:bg-white/20
                  hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)]
                  transition-all
                  active:scale-95
                "
              >
                TAMBAH KERANJANG
              </Button>

              <Button
                onClick={handleBuyWA}
                className="
                  flex-1 py-6
                  bg-gradient-to-r from-emerald-500 to-green-400
                  text-black
                  text-xs font-black tracking-widest
                  rounded-2xl
                  hover:brightness-110
                  hover:shadow-[0_20px_60px_rgba(34,197,94,0.6)]
                  transition-all
                  active:scale-95
                "
              >
                BELI VIA WHATSAPP
              </Button>
            </div>
          </div>

          {/* TRUST */}
          <div className="pt-12 grid grid-cols-2 gap-12 border-t border-white/10">
            <button
              onClick={() =>
                setActiveTrust(activeTrust === "authentic" ? null : "authentic")
              }
              className="group flex items-center gap-5 text-left transition-all"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
                  activeTrust === "authentic"
                    ? "bg-indigo-500 text-white border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.6)]"
                    : "bg-indigo-500/10 text-indigo-400 border-indigo-400/30 animate-soft-glow"
                }`}
              >
                ✔
              </div>
              <div>
                <h4 className="text-sm font-black tracking-widest uppercase text-white">
                  Authentic
                </h4>
                <p className="text-xs text-slate-400 uppercase">
                  Produk Original 100%
                </p>
              </div>
            </button>

            <button
              onClick={() =>
                setActiveTrust(activeTrust === "priority" ? null : "priority")
              }
              className="group flex items-center gap-5 text-left transition-all"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
                  activeTrust === "priority"
                    ? "bg-amber-400 text-black border-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.7)]"
                    : "bg-amber-400/10 text-amber-300 border-amber-400/30"
                }`}
              >
                ⚡
              </div>
              <div>
                <h4 className="text-sm font-black tracking-widest uppercase text-white">
                  Priority
                </h4>
                <p className="text-xs text-slate-400 uppercase">
                  Pengiriman Cepat & Aman
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
