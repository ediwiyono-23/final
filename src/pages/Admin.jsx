import { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import DataTable from "../components/admin/DataTable";
import FormData from "../components/admin/FormData";
import { API_URL } from "../services/api";

export default function Admin() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <AdminLayout>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Input (Kiri) */}
          <div className="lg:col-span-1">
            <FormData onRefresh={fetchProducts} />
          </div>

          {/* Tabel Data (Kanan) */}
          <div className="lg:col-span-2">
            <DataTable
              products={products}
              onDeleteProduct={handleDeleteProduct}
            />
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}
