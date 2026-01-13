import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts"; 
import Dialog from "../ui/Dialog"; 


  export default function DataTable({ products }) {
    const { deleteProduct } = useProducts();
    const [selectedId, setSelectedId] = useState(null);
    const handleDeleteConfirm = async () => {
      if (selectedId) {
        await deleteProduct(selectedId); 
        setSelectedId(null); 
      }
    };

  return (
    <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-[10px] uppercase text-gray-400 font-bold tracking-widest border-b">
          <tr>
            <th className="px-6 py-4">Nama Produk</th>
            <th className="px-6 py-4">Harga</th>
            <th className="px-6 py-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y text-sm">
          {products.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-6 py-12 text-center text-gray-400 italic">
                Belum ada data produk tersedia di MockAPI.
              </td>
            </tr>
          ) : (
            products.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-700">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  Rp {Number(item.price).toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-4">
                    <Link 
                      to={`/admin/edit/${item.id}`} 
                      className="text-blue-600 font-bold hover:text-blue-800 transition text-xs">
                      EDIT
                    </Link>
                    <button 
                      onClick={() => setSelectedId(item.id)} 
                      className="text-red-500 font-bold hover:text-red-700 transition text-xs">
                      HAPUS
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Dialog 
        open={!!selectedId} 
        onClose={() => setSelectedId(null)} 
        onConfirm={handleDeleteConfirm}
        title="Hapus Produk?"
      >
        <p className="text-sm">
          Apakah Anda yakin ingin menghapus produk ini? <br />
          Data yang sudah dihapus dari <strong>MockAPI</strong> tidak dapat dikembalikan.
        </p>
      </Dialog>
    </div>
  );
}