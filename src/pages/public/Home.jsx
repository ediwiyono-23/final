import { useEffect, useMemo, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../../components/common/ProductCard";

export default function Home() {
  const { data: products = [], fetchProducts, loading } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = useMemo(() => {
    return [
      "ALL",
      ...new Set(
        products.map((p) => p.category?.toUpperCase()).filter(Boolean)
      ),
    ].sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory =
        category === "ALL" || item.category?.toUpperCase() === category;
      return matchSearch && matchCategory;
    });
  }, [products, search, category]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sort === "price-asc") return list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return list.sort((a, b) => b.price - a.price);
    return list;
  }, [filteredProducts, sort]);

  return (
    <div className="bg-[#020617] min-h-screen font-sans antialiased text-slate-200">
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-300">
              Official Store 2024
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
            BIJI<span className="text-indigo-500">STORE</span>
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-cyan-300 to-emerald-400 italic">
              Simple. Fast. Reliable.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto">
            Pengalaman belanja modern dengan{" "}
            <span className="text-white font-semibold">WhatsApp Checkout</span>
          </p>

          <button
            onClick={() =>
              document
                .getElementById("katalog")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition hover:scale-105"
          >
            Mulai Eksplorasi
          </button>
        </div>
      </section>

      <section
        id="katalog"
        className="relative py-24 -mt-20 bg-[#020617] text-slate-200 rounded-t-[4rem] z-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white">
                Katalog Produk
              </h2>
              <p className="text-slate-400 mt-2">
                Menampilkan {sortedProducts.length} produk
              </p>
            </div>

            <div className="flex flex-wrap gap-4 bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
              <input
                type="text"
                placeholder="Cari produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-5 py-3 rounded-xl bg-white/10 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/10 text-white font-semibold outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="text-black">
                    {cat}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
              >
                <option value="default">Urutkan</option>
                <option value="price-asc">Termurah</option>
                <option value="price-desc">Termahal</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-80 bg-white/10 rounded-3xl animate-pulse"
                />
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-24 bg-white/5 backdrop-blur rounded-3xl border border-white/10">
              <div className="text-7xl mb-4">🛒</div>
              <h3 className="text-2xl font-bold text-white">
                Produk tidak ditemukan
              </h3>
              <p className="text-slate-400 mt-2">Coba kata kunci lain</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedProducts.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
