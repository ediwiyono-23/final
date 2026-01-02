import { useEffect } from "react";
import { useProducts } from "../../hooks/useProducts"; 
import ProductCard from "../../components/common/ProductCard"; 

export default function Home() {
  const { data: products, fetchProducts, loading } = useProducts(); 

  useEffect(() => {
    fetchProducts(); 
  }, [fetchProducts]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 w-full">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight">Katalog BijiStore</h1>
        <p className="mt-3 text-gray-500 text-lg">Produk pilihan terbaik untuk kebutuhan Anda.</p>
      </header>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 h-80 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </main>
  );
}