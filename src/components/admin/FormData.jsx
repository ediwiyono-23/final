import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import Button from "../ui/Button";

export default function FormData() {
  const { addProduct } = useProducts();
  
  const [form, setForm] = useState({ 
    name: "", 
    price: "",   
    category: "", 
    image: "", 
    description: "" 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.price || !form.image) {
      return alert("Nama, Harga, dan Link Foto wajib diisi!");
    }
    
    await addProduct({ ...form, price: Number(form.price) });
    
    setForm({ name: "", price: "", category: "Gadgets", image: "", description: "" });
    alert("Produk Berhasil Ditambahkan!");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-4">
      <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4 text-lg">Tambah Produk Baru</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Produk</label>
            <input 
              type="text" 
              placeholder="iPhone 15 Pro" 
              className="w-full border-2 border-gray-50 bg-gray-50 p-3 rounded-xl outline-none focus:bg-white focus:border-black transition-all" 
              value={form.name} 
              onChange={e => setForm({...form, name: e.target.value})} 
              required 
            />
          </div> 

          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Harga (Rp)</label>
            <input 
              type="number" 
              placeholder="15000000" 
              className="w-full border-2 border-gray-50 bg-gray-50 p-3 rounded-xl outline-none focus:bg-white focus:border-black transition-all" 
              value={form.price} 
              onChange={e => setForm({...form, price: e.target.value})} 
              required 
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">URL Foto Produk</label>
          <input 
            type="url" 
            placeholder="https://images.unsplash.com/..." 
            className="w-full border-2 border-gray-50 bg-gray-50 p-3 rounded-xl outline-none focus:bg-white focus:border-black transition-all" 
            value={form.image} 
            onChange={e => setForm({...form, image: e.target.value})} 
            required 
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Deskripsi</label>
          <textarea 
            placeholder="deskripsi produk..." 
            className="w-full border-2 border-gray-50 bg-gray-50 p-3 rounded-xl outline-none focus:bg-white focus:border-black transition-all h-24 resize-none text-sm" 
            value={form.description} 
            onChange={e => setForm({...form, description: e.target.value})}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kategori</label>
          <select 
            className="w-full border-2 border-gray-50 bg-gray-50 p-3 rounded-xl outline-none focus:bg-white focus:border-black transition-all font-medium text-gray-600" 
            value={form.category} 
            onChange={e => setForm({...form, category: e.target.value})}>
            <option value="Gadgets">Gadgets</option>
            <option value="Fashion">Fashion</option>
            <option value="Toys">Toys</option>
          </select>
        </div>
      </div>

      <Button type="submit" className="w-full py-4 mt-2 font-black tracking-widest shadow-lg shadow-gray-200">
        SIMPAN KE DATABASE
      </Button>
    </form>
  );
}
