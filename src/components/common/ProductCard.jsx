import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Badge from "../ui/Badge";
import NotificationModal from "../ui/NotificationModal";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmAdd = useCallback(() => {
    addToCart(product);
    setIsModalOpen(false);
  }, [product, addToCart]);

  if (!product) return null;

  const categoryDisplay = product.category?.trim() || "Lainnya";
  const formattedPrice = Number(product.price).toLocaleString("id-ID");

  const handleWhatsAppBuy = (e) => {
    e.preventDefault();
    const message = `Halo Bijistore 👋, saya ingin memesan *${product.name}*`;
    window.open(
      `https://wa.me/6281362011079?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <>
      <NotificationModal
        isOpen={isModalOpen}
        message={`Tambahkan ${product.name} ke keranjang belanja Anda?`}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAdd}
      />

      <article className="group relative flex flex-col h-full rounded-3xl p-5 bg-linear-to-b from-[#0b1220] to-[#020617] border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
          style={{
            background: "radial-gradient(circle at top, rgba(245,158,11,0.1), transparent 70%)",
          }} 
        />
        <div className="relative mb-4 h-60 rounded-2xl bg-white/3 flex items-center justify-center overflow-hidden border border-white/5">
          <div className="absolute top-3 left-3 z-30">
            <Badge className="bg-black/80 backdrop-blur-md text-amber-400 text-[9px] font-black tracking-[0.2em] px-3 py-1.5 rounded-lg border border-white/10 shadow-xl uppercase italic">
              {categoryDisplay}
            </Badge>
          </div>

          <Link
            to={`/detail-produk/${product.id}`}
            className="relative z-10 w-full h-full flex items-center justify-center p-6"
          >
            <img
              src={product.image || "https://via.placeholder.com/300"}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </Link>
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent z-20 pointer-events-none" />
        </div>

        <div className="flex flex-col flex-1 relative z-10">
          <Link to={`/detail-produk/${product.id}`} className="mb-3">
            <h3 className="text-sm md:text-base font-bold text-white leading-snug line-clamp-2 group-hover:text-amber-400 transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-[0.3em] text-slate-500 font-black mb-1">
                Price
              </span>
              <p className="text-lg font-black text-white tracking-tight">
                <span className="text-xs font-medium text-amber-500 mr-1">Rp</span>
                {formattedPrice}
              </p>
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-11 h-11 rounded-2xl bg-white/5 text-amber-400 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-amber-500 hover:text-black hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-90"
              aria-label="Tambah ke keranjang"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>
          </div>

          <button
            onClick={handleWhatsAppBuy}
            className="mt-5 w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] bg-linear-to-r from-amber-600 to-orange-500 text-black transition-all duration-300 hover:brightness-110 hover:shadow-[0_10px_20px_rgba(234,88,12,0.3)] active:scale-[0.97]"
          >
            Beli via WhatsApp
          </button>
        </div>
      </article>
    </>
  );
}