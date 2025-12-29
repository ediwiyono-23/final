import { useEffect, useState } from "react";
import { API_URL } from "../services/api";
import AdminHeader from "../components/admin/AdminHeader";
import DataTable from "../components/admin/DataTable";
import FormData from "../components/admin/FormData";

export default function Admin() {
  const [products, setProducts] = useState([]);

  // Fungsi untuk ambil data
  const fetchProducts = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Input (Kiri) */}
          <div className="lg:col-span-1">
            <FormData onRefresh={fetchProducts} />
          </div>

          {/* Tabel Data (Kanan) */}
          <div className="lg:col-span-2">
            <DataTable products={products} onRefresh={fetchProducts} />
          </div>
        </div>
      </main>
    </div>
  );
}
