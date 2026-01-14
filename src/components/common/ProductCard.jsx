import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Badge from "../ui/Badge";
import NotificationModal from "../ui/NotificationModal";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product) return null;

  const categoryDisplay = product.category?.trim() || "Lainnya";

  const handleConfirmAdd = () => {
    addToCart(product);
    setIsModalOpen(false);
  };

  const handleWhatsAppBuy = () => {
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
        message="Tambahkan produk ini ke keranjang?"
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAdd}
      />
      <article
        className="
          group relative flex flex-col
          rounded-3xl p-5
          bg-linear-to-b from-[#0b1220] to-[#020617]
          border border-white/10
          transition-all duration-500
          hover:-translate-y-1
          hover:border-amber-400/40
          hover:shadow-[0_0_0_1px_rgba(251,191,36,0.2),0_30px_80px_rgba(0,0,0,0.7)]
          overflow-hidden
        "
      >
        <div
          className="
            pointer-events-none absolute inset-0
            opacity-0 group-hover:opacity-100
            transition duration-500
            hidden md:block
          "
          style={{
            background:
              "radial-gradient(600px circle at top, rgba(251,191,36,0.12), transparent 40%)",
          }}
        />

        <div className="relative mb-5 h-60 rounded-2xl bg-white/5 overflow-hidden flex items-center justify-center">
          <Badge
            className="
              absolute top-3 left-3
              bg-black/70 text-amber-300
              text-[11px] font-semibold
              px-3 py-1 rounded-full
              tracking-wide
              border border-amber-400/20
              backdrop-blur
            "
          >
            {categoryDisplay}
          </Badge>

          <Link
            to={`/detail-produk/${product.id}`}
            className="w-full h-full flex items-center justify-center p-4"
          >
            <img
              src={product.image || "https://via.placeholder.com/300"}
              alt={product.name}
              loading="lazy"
              className="
                w-full h-full object-contain
                transition-transform duration-700
                group-hover:scale-110
              "
            />
          </Link>

          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col flex-1 px-1">
          <Link to={`/detail-produk/${product.id}`} className="mb-3">
            <h3
              className="
                text-lg font-semibold text-white
                leading-snug line-clamp-2
                group-hover:text-amber-300
                transition-colors
              "
            >
              {product.name}
            </h3>
          </Link>

          <div className="mt-auto flex items-end justify-between">
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-slate-400">
                Harga
              </span>
              <p className="text-xl font-extrabold text-white mt-1">
                <span className="text-sm font-normal text-slate-400 mr-1">
                  Rp
                </span>
                {Number(product.price).toLocaleString("id-ID")}
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="
                w-12 h-12 rounded-xl
                bg-white/5 text-amber-300
                border border-amber-400/20
                flex items-center justify-center
                transition-all duration-300
                hover:bg-amber-400/10
                hover:shadow-[0_0_20px_rgba(251,191,36,0.35)]
                active:scale-95
              "
              aria-label="Tambah ke keranjang"
            >
              🛒
            </button>
          </div>

          <button
            onClick={handleWhatsAppBuy}
            className="
              mt-5 w-full py-3 rounded-xl
              font-semibold text-sm
              bg-linear-to-r from-amber-500 to-yellow-400
              text-black
              transition-all duration-300
              hover:brightness-110
              hover:shadow-[0_10px_30px_rgba(251,191,36,0.4)]
              active:scale-[0.98]
            "
          >
            Beli via WhatsApp
          </button>
        </div>
      </article>
    </>
  );
}
