import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(() => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const found = products.find((p) => p.id === id);
    return found || null;
  });

  if (form === null) return (
    <AdminLayout>
      <main className="max-w-4xl mx-auto px-6 py-20">Loading...</main>
    </AdminLayout>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const updated = products.map((p) =>
      p.id === id ? { ...form } : p
    );
    localStorage.setItem("products", JSON.stringify(updated));
    navigate("/admin");
  };

  return (
    <AdminLayout>
      <main className="max-w-4xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-lg font-bold mb-6">Edit Produk: {form.name}</h2>

          <div>
            <label className="block text-sm font-medium mb-1">Nama Produk</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Harga (Rp)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Kategori</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">URL Gambar</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Deskripsi</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-black"
              rows="4"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Simpan Perubahan
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="flex-1 px-4 py-2 rounded border hover:bg-gray-50 transition"
            >
              Batal
            </button>
          </div>
        </form>
      </main>
    </AdminLayout>
  );
}
