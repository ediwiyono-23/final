import { useEffect, useState } from "react";
import ProductCard from "../components/public/ProductCard";
import { useProducts } from "../hooks/useProducts";

const categories = ["all", "Gadgets", "Fashion", "Toys"];

export default function Home() {
  // 🔥 PENTING: DEFAULT []
  const { data: products = [], gaskeunAmbilData } = useProducts();

  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectCategory, setSelectCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      await gaskeunAmbilData();
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((p) => {
    const name = (p?.name || "").toLowerCase();
    const cat = p?.category || "";

    const matchSearch = name.includes(search.toLowerCase());
    const matchTab = activeCategory === "all" || cat === activeCategory;
    const matchSelect = selectCategory === "all" || cat === selectCategory;

    return matchSearch && matchTab && matchSelect;
  });

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6">Produk</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </section>
  );
}
