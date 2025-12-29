import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PublicLayout from "../layouts/PublicLayout";
import { API_URL } from "../services/api";

export default function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((r) => r.json())
      .then((d) => setProduct(d))
      .catch(() => setProduct(null));
  }, [id]);

  if (!product) return (
    <PublicLayout>
      <main className="max-w-4xl mx-auto px-6 py-20">
        <p>Loading...</p>
      </main>
    </PublicLayout>
  );

  const handleBuy = () => {
    const message = `Halo, saya mau beli ${product.name} seharga Rp ${Number(product.price).toLocaleString('id-ID')}`;
    window.open(
      `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`
    );
  };

  return (
    <PublicLayout>
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Gambar */}
            <div>
              <img
                src={product.image || "https://via.placeholder.com/500"}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Detail */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-4">
                {product.category}
              </p>

              <p className="text-2xl font-semibold text-black mb-4">
                Rp {Number(product.price).toLocaleString('id-ID')}
              </p>

              <p className="text-gray-700 mb-6">{product.description}</p>

              <button
                onClick={handleBuy}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
              >
                Beli via WhatsApp
              </button>

              <a
                href="/"
                className="block text-center mt-4 text-blue-600 hover:underline"
              >
                ← Kembali ke Katalog
              </a>
            </div>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
