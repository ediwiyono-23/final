import { useEffect } from "react";
import { useProducts } from "../../hooks/useProducts";
import DataTable from "../../components/admin/DataTable";
import FormData from "../../components/admin/FormData";

export default function Dashboard() {
  const { data: products, fetchProducts, loading } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 border-l-4 border-red-600 pl-6">
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">Manajemen Inventaris</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Dashboard kontrol katalog dan stok produk.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 sticky top-28">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
              <h2 className="text-white font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Input Data Produk
              </h2>
              <FormData />
            </div>
          </div>

          <div className="lg:col-span-8">
            {loading && products.length === 0 ? (
              <div className="bg-slate-900 p-16 rounded-2xl border border-slate-800 text-center shadow-inner">
                <div className="text-slate-500 animate-pulse font-bold tracking-widest text-xs uppercase">
                  Menghubungkan ke Server...
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center">
                  <h2 className="text-sm font-black uppercase tracking-widest text-slate-300">
                    Daftar Produk 
                    <span className="ml-3 px-2 py-0.5 bg-slate-800 text-red-500 rounded text-xs">{products.length} Items</span>
                  </h2>
                </div>
                
                <div className="p-4 bg-slate-900">
                  <DataTable products={products} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}