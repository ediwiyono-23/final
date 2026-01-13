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

  const handleAskToCart = () => {
    setIsModalOpen(true); 
  };

  const handleConfirmAdd = () => {
    addToCart(product);
    setIsModalOpen(false);
  };

  const handleWhatsAppBuy = () => {
    const message = `Halo Bijistore, saya ingin memesan: *${product.name}*`;
    window.open(`https://wa.me/6281362011079?text=${encodeURIComponent(message)}`);
  };

  return (
    <>
      <NotificationModal 
        isOpen={isModalOpen}
        message="Apakah anda yakin ingin memasukkan produk ini ke keranjang?"
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAdd}
      />

      <div className="group relative flex flex-col bg-white rounded-3xl p-5 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-slate-100 h-full overflow-hidden">
        <div className="relative overflow-hidden rounded-2xl bg-slate-50 h-60 flex items-center justify-center mb-5 transition-all duration-500">
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-white/90 backdrop-blur-sm text-slate-900 font-bold text-xs px-2.5 py-1 rounded-full shadow-sm">
              {categoryDisplay}
            </Badge>
          </div>

          <Link 
            to={`/detail-produk/${product.id}`} 
            className="w-full h-full flex items-center justify-center p-4"
            aria-label={`Lihat detail ${product.name}`}
          >
            <img
              src={product.image || "https://via.placeholder.com/300"} 
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </Link>
        </div>

        <div className="flex-1 flex flex-col px-1">
          <Link to={`/detail-produk/${product.id}`} className="block mb-3">
            <h3 className="font-bold text-lg text-slate-800 leading-tight line-clamp-2 hover:text-blue-600 transition-colors duration-200">
              {product.name}
            </h3>
          </Link>

          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Harga</span>
              <p className="text-xl font-bold text-slate-900 mt-1">
                <span className="text-sm font-normal text-slate-500 mr-0.5">Rp</span>
                {Number(product.price).toLocaleString("id-ID")}
              </p>
            </div>

            <button
              onClick={handleAskToCart}
              aria-label={`Tambah ${product.name} ke keranjang`}
              className="w-12 h-12 rounded-xl bg-slate-900 text-white hover:bg-blue-600 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>

          <button
            onClick={handleWhatsAppBuy}
            aria-label={`Beli ${product.name} via WhatsApp`}
            className="w-full mt-5 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            Beli 
          </button>
        </div>
      </div>
    </>
  );
}