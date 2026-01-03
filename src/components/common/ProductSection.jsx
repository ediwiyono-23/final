import { useEffect } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../../components/common/ProductCard";

export default function ProductSection() {
  const { data: products, fetchProducts, loading } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-black">Katalog BijiStore</h2>
        <p className="text-gray-500 mt-2">
          Produk pilihan terbaik untuk kebutuhan Anda.
        </p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </section>
  );
}
