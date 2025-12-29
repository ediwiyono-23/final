import { useEffect, useState } from "react";
import PublicLayout from "../layouts/PublicLayout";
import ProductCard from "../components/public/ProductCard";
import { API_URL } from "../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  // eslint-disable-next-line no-unused-vars
  const filteredProducts = products.filter((p) => {
    const name = (p?.name || "").toLowerCase();
    const cat = p?.category || "";
    const matchSearch = name.includes(search.toLowerCase());
    const matchCategory = category === "all" || cat === category;
    return matchSearch && matchCategory;
  });

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="bg-linear-to-r from-black to-gray-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Gadget Terbaik. Harga Masuk Akal.
          </h1>
          <p className="text-gray-300 max-w-xl mb-6">
            Produk teknologi pilihan, checkout langsung via WhatsApp.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* SEARCH & FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-3 rounded-xl w-full md:w-1/2 focus:ring-2 focus:ring-black outline-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-4 py-3 rounded-xl w-full md:w-1/4"
          >
            <option value="all">Semua Kategori</option>
            <option value="Headphone">Headphone</option>
            <option value="Laptop">Laptop</option>
            <option value="Accessory">Accessory</option>
          </select>
        </div>

        {/* PRODUK GRID */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products
              .filter((p) => {
                const name = (p?.name || "").toLowerCase();
                const cat = p?.category || "";
                const matchSearch = name.includes(search.toLowerCase());
                const matchCategory = category === "all" || cat === category;
                return matchSearch && matchCategory;
              })
              .length === 0 ? (
              <p>Tidak ada produk</p>
            ) : (
              products
                .filter((p) => {
                  const name = (p?.name || "").toLowerCase();
                  const cat = p?.category || "";
                  const matchSearch = name.includes(search.toLowerCase());
                  const matchCategory = category === "all" || cat === category;
                  return matchSearch && matchCategory;
                })
                .map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))
            )}
          </div>
        )}
      </main>
    </PublicLayout>
  );
}
