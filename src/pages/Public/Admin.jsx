import { useEffect } from "react";
import { useProducts } from "../../hooks/useProducts"; 
import DataTable from "../../components/admin/DataTable";
import FormData from "../../components/admin/FormData";
import AdminHeader from "../../components/admin/AdminHeader";

export default function Admin() {
  const { data: products, fetchProducts } = useProducts(); 

  useEffect(() => {
    fetchProducts(); 
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <FormData />
          </div>
          
          <div className="lg:col-span-8">
            <DataTable products={products} />
          </div>
        </div>
      </main>
    </div>
  );
}
