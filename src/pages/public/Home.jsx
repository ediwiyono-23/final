import { useEffect, useState } from "react";
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

  const categories = ["ALL", ...new Set(
    products
      .map(p => p.category?.toUpperCase())
      .filter(cat => cat && cat !== "ALL") 
  )].sort(); 

  const filteredProducts = products.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = 
      category === "ALL" || 
      item.category?.toUpperCase() === category;
    return matchSearch && matchCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="bg-[#020617] min-h-screen font-sans antialiased text-slate-200">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-bounce" style={{ animationDuration: '8s' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-300">
               Official Store 2024
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-none">
            BIJI<span className="text-blue-500">STORE</span>
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-300 to-emerald-400 italic">
              Simple. Fast. Reliable.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Temukan koleksi eksklusif dengan pengalaman belanja <span className="text-white font-medium">WhatsApp Checkout</span> yang revolusioner.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <button
              onClick={() => document.getElementById("katalog").scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all hover:scale-105 hover:shadow-[0_20px_50px_rgba(37,99,235,0.3)]"
            >
              Mulai Eksplorasi
            </button>
            <div className="flex gap-4">
               {['Premium', 'Original', 'Secure'].map((tag) => (
                 <span key={tag} className="text-[10px] tracking-widest uppercase py-2 px-4 rounded-lg border border-white/5 bg-white/5 text-slate-500">
                   {tag}
                 </span>
               ))}
            </div>
          </div>
        </div>
      </section>

      <section id="katalog" className="relative py-24 bg-slate-50 text-slate-900 rounded-t-[40px] md:rounded-t-[100px] -mt-20 z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-8">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
                Katalog Produk
              </h2>
              <p className="text-slate-500 font-medium">Menampilkan {sortedProducts.length} produk terbaik untukmu.</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 p-2 bg-white rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100">
              <input
                type="text"
                placeholder="Cari sesuatu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-6 py-3 bg-transparent outline-none w-full md:w-64 border-r border-slate-100"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-3 bg-transparent font-semibold text-slate-600 outline-none cursor-pointer min-w-30"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-3 bg-slate-900 text-white rounded-3xl font-medium outline-none cursor-pointer hover:bg-slate-800 transition"
              >
                <option value="default">Urutkan</option>
                <option value="price-asc">Termurah</option>
                <option value="price-desc">Termahal</option>
              </select>
            </div>
          </div>

          {loading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {[1,2,3,4].map(i => <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-3xl" />)}
             </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-400">Wah, barangnya nggak ada nih...</h3>
              <button 
                onClick={() => { setSearch(""); setCategory("ALL"); setSort("default"); }} 
                className="mt-4 text-blue-600 font-bold hover:text-blue-700"
              >
                Reset Pencarian
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {sortedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}