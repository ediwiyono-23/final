import { useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../../components/common/ProductCard";

// ⬇️ HERO IMAGE
import heroImage from "../../assets/hero-phone.png";

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
    const matchSearch = (item.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory =
      category === "all" || item.category === category;
    return matchSearch && matchCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="w-full min-h-[85vh] bg-gradient-to-r from-black via-slate-900 to-blue-950 flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          {/* TEXT */}
          <div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Gadget Terbaik.
              <br />
              Harga Masuk Akal.
            </h1>
            <p className="text-gray-300 mt-5 text-lg max-w-lg">
              Produk teknologi pilihan, checkout langsung via WhatsApp
              tanpa ribet.
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("katalog")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="mt-10 px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition"
            >
              Belanja Sekarang
            </button>
          </div>

          {/* IMAGE */}
          <div className="hidden md:flex justify-center relative">
            <img
              src={heroImage}
              alt="Hero Product"
              className="
                w-[300px] lg:w-[380px]
                drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]
                hover:scale-105
                transition-transform duration-500
              "
            />

            {/* glow */}
            <div className="absolute -inset-16 bg-blue-500/20 blur-3xl rounded-full -z-10" />
          </div>
        </div>
      </section>

      {/* ===== TRANSISI HALUS (ANTI PUTIH) ===== */}
      <div className="w-full h-28 bg-gradient-to-b from-blue-950 to-[#f4f6fb]" />

      {/* ================= KATALOG ================= */}
      <section
        id="katalog"
        className="w-full bg-gradient-to-b from-[#f4f6fb] to-[#e9ecf5] py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-14 text-center">
            <h2 className="text-5xl font-black text-gray-900">
              Katalog BijiStore
            </h2>
            <p className="mt-4 text-gray-500 text-lg">
              Produk pilihan terbaik untuk kebutuhan Anda.
            </p>
          </header>

          {/* SEARCH + FILTER + SORT */}
          <div className="flex flex-col md:flex-row gap-4 mb-14">
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:flex-1 px-4 py-3 rounded-xl border bg-white"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full md:w-56 px-4 py-3 rounded-xl border bg-white"
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat === "all" ? "Semua Kategori" : cat}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full md:w-56 px-4 py-3 rounded-xl border bg-white"
            >
              <option value="default">Urutkan</option>
              <option value="price-asc">Harga Termurah</option>
              <option value="price-desc">Harga Termahal</option>
            </select>
          </div>

          {/* GRID */}
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : sortedProducts.length === 0 ? (
            <p className="text-center text-gray-500">
              Produk tidak ditemukan
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
