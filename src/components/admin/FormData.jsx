import { useState } from "react";
import { API_URL } from "../../services/api";

export default function FormData({ onRefresh }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Headphone",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    // Reset form setelah sukses
    setForm({ name: "", price: "", category: "Headphone", image: "" });
    onRefresh(); // Refresh data di tabel
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-lg font-bold mb-4">Tambah Produk Baru</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nama Produk
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-1 w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Harga (Angka)
        </label>
        <input
          type="number"
          required
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="mt-1 w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Kategori
        </label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="mt-1 w-full border p-2 rounded-lg outline-none"
        >
          <option value="Headphone">Headphone</option>
          <option value="Laptop">Laptop</option>
          <option value="Accessory">Accessory</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          URL Gambar (Opsional)
        </label>
        <input
          type="text"
          placeholder="https://..."
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="mt-1 w-full border p-2 rounded-lg outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Simpan Produk
      </button>
    </form>
  );
}
