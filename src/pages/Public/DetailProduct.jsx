import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../../services/api"; 
import Navbar from "../../components/common/Navbar"; 
import Footer from "../../components/common/Footer"; 
import Button from "../../components/ui/Button"; 

export default function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`) 
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return (
    <div className="h-screen flex items-center justify-center font-bold text-gray-400">
      Loading Product Detail...
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto p-8 grid md:grid-cols-2 gap-16 items-start">
        <div className="sticky top-24">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full rounded-3xl shadow-2xl border aspect-square object-cover"
          />
        </div>
        
        <div className="py-4">
          <span className="bg-black text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest">
            {product.category}
          </span>
          <h1 className="text-5xl font-black text-gray-900 mt-4 leading-tight">{product.name}</h1>
          <p className="text-3xl font-medium text-gray-900 mt-4 italic">
            Rp {Number(product.price).toLocaleString("id-ID")}
          </p>
          
          <div className="my-8 border-t border-b py-6">
            <h3 className="font-bold text-gray-800 mb-2">Deskripsi Produk</h3>
            <p className="text-gray-500 leading-relaxed text-lg">
              {product.description || "Tidak ada deskripsi untuk produk ini."}
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button className="flex-1 py-5 text-lg shadow-lg shadow-gray-200">Beli Sekarang</Button>
            <Link to="/home" className="flex-1 border-2 text-center py-5 rounded-xl font-bold hover:bg-gray-50 transition">
              Kembali
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
