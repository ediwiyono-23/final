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
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Inventaris</h1>
        <p className="text-gray-500 text-sm">Tambah, edit, atau hapus produk dari katalog toko.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 sticky top-24">
          <FormData />
        </div>
        <div className="lg:col-span-8">
          {loading && products.length === 0 ? (
            <div className="bg-white p-10 rounded-xl border text-center animate-pulse text-gray-400 font-medium">
              Sedang memuat data inventaris...
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Daftar Produk ({products.length})</h2>
              <DataTable products={products} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
