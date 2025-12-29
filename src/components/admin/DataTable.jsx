import { useState } from "react";
import { Link } from "react-router-dom";
import Dialog from "../ui/Dialog";

export default function DataTable({ products, onDeleteProduct }) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const confirmDelete = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleDelete = () => {
    if (!selectedId) return;
    onDeleteProduct(selectedId);
    setOpen(false);
    setSelectedId(null);
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Produk</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Harga</th>
              <th className="px-6 py-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  Tidak ada produk
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.category}</td>
                  <td className="px-6 py-4">
                    Rp {Number(item.price).toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <Link
                      to={`/admin/edit/${item.id}`}
                      className="text-blue-600 hover:underline text-sm font-semibold"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => confirmDelete(item.id)}
                      className="text-red-600 hover:text-red-900 text-sm font-semibold"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Konfirmasi Hapus"
        onConfirm={handleDelete}
      >
        <p>Yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.</p>
      </Dialog>
    </div>
  );
}