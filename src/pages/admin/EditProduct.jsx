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
      .then((data) => setForm(data))
      .catch(() => navigate("/admin"));
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateProduct(id, { ...form, price: Number(form.price) });
    if (success) {
      alert("Update Berhasil!");
      navigate("/admin");
    }
  };

  if (!form) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border">
      <h2 className="text-2xl font-bold mb-6">Edit Produk</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          value={form.name} 
          className="w-full border p-3 rounded-xl"
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
        />
        <input 
          type="number" 
          value={form.price} 
          className="w-full border p-3 rounded-xl"
          onChange={(e) => setForm({ ...form, price: e.target.value })} 
        />
        <input 
          type="text" 
          value={form.description} 
          className="w-full border p-3 rounded-xl"
          onChange={(e) => setForm({ ...form, description: e.target.value })} 
        />
        <div className="flex gap-4">
          <Button type="submit" className="flex-1">Simpan</Button>
          <Button variant="outline" className="flex-1" onClick={() => navigate("/admin")}>Batal</Button>
        </div>
      </form>
    </div>
  );
}
