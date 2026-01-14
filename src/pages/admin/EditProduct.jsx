
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import Button from "../../components/ui/Button";
import { API_URL } from "../../services/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateProduct } = useProducts();

  const [form, setForm] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) =>
        setForm({
          ...data,
          stock: data.stock ?? 0, 
        })
      )
      .catch(() => navigate("/admin"));
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await updateProduct(id, {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });

    if (success) {
      alert("Update Berhasil!");
      navigate("/admin");
    }
  };

  if (!form) {
    return (
      <div className="p-20 text-center text-gray-500 font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-black mb-6 text-gray-900">
        Edit Produk
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* NAMA */}
        <div className="space-y-1">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
            Nama Produk
          </label>
          <input
            type="text"
            value={form.name}
            className="w-full border p-3 rounded-xl outline-none focus:border-black transition"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
            Harga (Rp)
          </label>
          <input
            type="number"
            value={form.price}
            className="w-full border p-3 rounded-xl outline-none focus:border-black transition"
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
            Stok
          </label>
          <input
            type="number"
            min="0"
            value={form.stock}
            className="w-full border p-3 rounded-xl outline-none focus:border-black transition"
            onChange={(e) =>
              setForm({ ...form, stock: e.target.value })
            }
            required
          />
          <p className="text-[11px] text-gray-400">
            Jika stok = 0, produk akan otomatis dianggap habis
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
            Deskripsi
          </label>
          <textarea
            value={form.description}
            className="w-full border p-3 rounded-xl outline-none focus:border-black transition h-28 resize-none"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1 py-3 font-black">
            SIMPAN
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1 py-3"
            onClick={() => navigate("/admin")}
          >
            BATAL
          </Button>
        </div>
      </form>
    </div>
  );
}