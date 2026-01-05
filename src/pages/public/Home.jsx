import { useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../../components/common/ProductCard";

export default function Home() {
  const { data: products = [], fetchProducts, loading } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || item.category === category;
    return matchSearch && matchCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="bg-[#020617] min-h-screen font-sans antialiased text-slate-200">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden text-center px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute  left-1/2 -translate-x-1/2 w-150 h-150 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-9">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mx-auto">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">
               Terlaris 2024
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white leading-[0.9]">
            bijistore
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-300 to-emerald-400">
              ayo belanja sekarang!
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Belanja berbagai produk terbaru dengan sistem checkout WhatsApp yang cepat,
            aman, dan tanpa ribet. Semua produk original & terpercaya.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6">
            <button
              onClick={() =>
                document
                  .getElementById("katalog")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="group relative px-14 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:pr-20"
            >
              <span className="relative z-10">Mulai Belanja</span>
              <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
                →
              </span>
            </button>

            <div className="flex items-center gap-6 text-xs font-medium text-slate-500 tracking-widest uppercase">
              <span className="hover:text-white transition">● Original</span>
              <span className="hover:text-white transition">● Fast</span>
              <span className="hover:text-white transition">● Secure</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="katalog"
        className="relative py-32 bg-white text-slate-900 rounded-t-[50px] lg:rounded-t-[80px]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight">
                Eksplorasi barang kami
              </h2>
              <p className="text-slate-500 max-w-md">
                Pilih produk terbaik sesuai kebutuhan Anda.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Cari produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-5 py-3 bg-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 w-64"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-3 bg-slate-100 rounded-2xl font-medium text-slate-600"
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat === "all" ? "Semua" : cat}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-3 bg-slate-100 rounded-2xl font-medium text-slate-600"
              >
                <option value="default">Urutkan</option>
                <option value="price-asc">Termurah</option>
                <option value="price-desc">Termahal</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-400 font-medium">
                Menyiapkan katalog terbaik...
              </p>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-40 border-2 border-dashed border-slate-200 rounded-[40px]">
              <p className="text-2xl font-bold text-slate-300">
                Produk tidak ditemukan
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                }}
                className="mt-4 text-blue-600 font-bold underline"
              >
                Lihat semua produk
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
              {sortedProducts.map((item) => (
                <div
                  key={item.id}
                  className="transition-transform duration-500 hover:-translate-y-2"
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
