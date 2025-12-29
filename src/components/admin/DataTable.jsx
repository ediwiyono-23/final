import { API_URL } from "../../services/api";

export default function DataTable({ products, onRefresh }) {
  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      onRefresh(); // Panggil fungsi refresh yang dikirim dari Admin.jsx
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
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
          {products.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
              <td className="px-6 py-4 text-gray-600">{item.category}</td>
              <td className="px-6 py-4">Rp {Number(item.price).toLocaleString('id-ID')}</td>
              <td className="px-6 py-4">
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-900 font-semibold">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}