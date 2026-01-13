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

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
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
      <div className="h-screen flex items-center justify-center bg-white">
        <p className="text-sm font-black tracking-[0.3em] text-gray-900 animate-pulse">
          MEMUAT PRODUK...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NotificationModal 
        isOpen={isModalOpen}
        message={`Tambahkan ${product.name} ke keranjang belanja?`}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAdd}
      />

      <main className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <Link
            to="/home"
            className="inline-block text-xs font-bold tracking-widest text-gray-400 hover:text-black mb-4 transition-colors"
          >
            ← KEMBALI KE TOKO
          </Link>

          <div className="bg-gray-50 rounded-[40px] p-8 md:p-16 border border-gray-100 group overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto max-h-125 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center lg:pl-10 space-y-8">
          <div className="space-y-2">
            <p className="text-blue-600 font-black text-xs tracking-[0.2em] uppercase">
              {product.category}
            </p>
            <h1 className="text-5xl font-black tracking-tighter leading-[0.95] text-gray-900">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-4xl font-black text-gray-900">
              Rp {Number(product.price).toLocaleString("id-ID")}
            </span>
            <div className="h-8 w-0.5 bg-gray-200" />
            <span className="text-green-600 font-bold text-sm">
              Tersedia
            </span>
          </div>

          <p className="text-gray-500 text-lg leading-relaxed border-l-4 border-blue-600 pl-6 py-2 bg-blue-50/30 rounded-r-xl">
            {product.description ||
              "Produk pilihan terbaik dari BijiStore. Kami menjamin kualitas dan keaslian setiap item yang kami kirimkan ke tangan Anda."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 py-6 bg-black text-white text-xs font-black tracking-widest rounded-2xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] transition-all active:scale-95">
              TAMBAH KERANJANG
            </Button>

            <Button
              onClick={handleBuyWA}
              className="flex-1 py-6 bg-green-500 text-white text-xs font-black tracking-widest rounded-2xl hover:bg-green-600 hover:shadow-[0_20px_40px_-15px_rgba(34,197,94,0.3)] transition-all active:scale-95">
              BELI VIA WHATSAPP
            </Button>
          </div>

          <div className="pt-10 grid grid-cols-2 gap-8 border-t border-gray-100">
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-2xl border-2 border-black flex items-center justify-center transition-all group-hover:bg-black group-hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4M12 5l7 7-7 7-7-7 7-7z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Authentic</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Jaminan Produk<br />Original 100%</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center transition-all group-hover:bg-blue-600 group-hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Priority</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Pengiriman<br />Cepat & Aman</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}