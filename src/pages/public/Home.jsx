import { useEffect, useMemo, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../../components/common/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

export default function Home() {
  const { data: products = [], fetchProducts, loading } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("SEMUA");
  const [sort, setSort] = useState("default");

  const heroImages = [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
  ];

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = useMemo(() => {
    const rawCategories = products
      .map((p) => p.category?.trim().toUpperCase())
      .filter(Boolean);
    const uniqueCategories = [...new Set(rawCategories)];
    return ["SEMUA", ...uniqueCategories].sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const itemCategory = item.category?.trim().toUpperCase();
      const selectedCategory = category.toUpperCase();
      const matchCategory = 
        selectedCategory === "SEMUA" || 
        selectedCategory === "ALL" || 
        itemCategory === selectedCategory;
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
    <div className="bg-[#020617] min-h-screen text-white overflow-x-hidden font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-25%] left-[5%] w-150 h-100 bg-orange-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[-15%] right-[-5%] w-125 h-100 bg-amber-500/10 rounded-full blur-[100px]" />
      </div>
      <section className="relative pt-6 md:pt-10 pb-6 px-6 z-10">
        <div className="max-w-375 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-start order-2 lg:order-1 mt-6 lg:mt-0">
            <span className="bg-linear-to-r from-orange-600 to-amber-500 text-[9px] font-black tracking-[0.5em] px-4 py-1.5 mb-4 rounded-full uppercase italic shadow-lg">
              Premium Collection
            </span>
            <h1 className="text-[12vw] lg:text-[7.5rem] font-black leading-[0.75] tracking-tighter uppercase italic">
              OMKE<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-amber-100 to-yellow-500">
                STORE
              </span>
            </h1>
            <p className="max-w-md mt-4 text-slate-400 text-base leading-snug font-medium">
              Eksplorasi koleksi <span className="text-amber-500">Fashion</span>, Gadget, dan Mainan terbaik dengan standar kualitas premium.
            </p>
            <div className="mt-6 flex items-center gap-4 opacity-50">
              <div className="h-px w-10 bg-amber-500" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Est. 2026</span>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative w-full h-87.5 md:h-120">
             <div className="absolute -inset-2 bg-amber-500/10 blur-2xl rounded-[3rem]"></div>
             <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className="w-full h-full rounded-[2.5rem] border border-white/10 shadow-2xl"
             >
                {heroImages.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="relative w-full h-full bg-slate-900">
                      <img 
                        src={img} 
                        alt={`Slide ${idx}`} 
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#020617]/80 via-transparent to-transparent"></div>
                    </div>
                  </SwiperSlide>
                ))}
             </Swiper>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-40 py-2 px-4 md:px-10 mt-4">
        <div className="max-w-350 mx-auto backdrop-blur-3xl bg-black/40 border border-amber-500/20 flex flex-col md:flex-row items-stretch md:items-center overflow-hidden rounded-2xl shadow-xl">
          <div className="flex-1 flex items-center px-6 py-4 border-b md:border-b-0 md:border-r border-amber-500/10">
            <span className="mr-4 text-amber-500 opacity-60 font-black">/</span>
            <input
              type="text"
              placeholder="CARI PRODUK..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent w-full text-sm font-bold tracking-widest outline-none placeholder:text-slate-700 uppercase"
            />
          </div>
          
          <div className="flex flex-col md:flex-row">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent px-8 py-5 text-[10px] font-black tracking-[0.2em] uppercase border-b md:border-b-0 md:border-r border-amber-500/10 cursor-pointer outline-none transition-colors appearance-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#020617] text-white">{cat}</option>
              ))}
            </select>
            
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-linear-to-r from-orange-600 to-amber-500 px-10 py-5 text-[10px] font-black tracking-[0.2em] uppercase cursor-pointer hover:brightness-110 outline-none text-black"
            >
              <option value="default">SORTIR</option>
              <option value="price-asc">MURAH</option>
              <option value="price-desc">MAHAL</option>
            </select>
          </div>
        </div>
      </section>

      <main className="relative z-10 py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-450 mx-auto">
          <div className="flex items-center gap-6 mb-10">
            <h2 className="text-xl font-black italic tracking-tighter uppercase text-amber-500">Official Catalogue</h2>
            <div className="h-px flex-1 bg-linear-to-r from-amber-500/30 to-transparent" />
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-4/5 bg-white/5 animate-pulse rounded-3xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-6 gap-y-12">
              {sortedProducts.map((item, index) => (
                <div key={item.id} className="reveal-animation h-full" style={{ animationDelay: `${index * 50}ms` }}>
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}