import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import Button from "../ui/Button";

export default function FormData() {
  const { addProduct } = useProducts();
  
  const [form, setForm] = useState({ 
    name: "", 
    price: "",   
    stock: "",         
    category: "GADGETS", 
    image: "", 
    description: "" 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.price || !form.image || form.stock === "") {
      return alert("Nama, Harga, Stock, dan Link Foto wajib diisi!");
    }

    if (Number(form.stock) < 0) {
      return alert("Stock tidak boleh kurang dari 0");
    }
    
    await addProduct({ 
      ...form, 
      price: Number(form.price),
      stock: Number(form.stock), 
      category: form.category 
    });
    
    setForm({ 
      name: "", 
      price: "", 
      stock: "", 
      category: "GADGETS", 
      image: "", 
      description: "" 
    });

    alert("Produk Berhasil Ditambahkan!");
  };
  const inputClass = "w-full border-2 border-slate-800 bg-slate-950 p-3 rounded-xl outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 text-slate-200 transition-all placeholder:text-slate-700";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-800 space-y-4"
    >
      <h3 className="font-black text-white border-b border-slate-800 pb-3 mb-6 text-lg tracking-tight italic">
        TAMBAH PRODUK BARU
      </h3>
      
      <div className="space-y-4">

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
            Nama Produk
          </label>
          <input 
            type="text" 
            placeholder="iPhone 15 Pro" 
            className={inputClass} 
            value={form.name} 
            onChange={e => setForm({ ...form, name: e.target.value })} 
            required 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Harga (Rp)
            </label>
            <input 
              type="number" 
              placeholder="15000000" 
              className={inputClass} 
              value={form.price} 
              onChange={e => setForm({ ...form, price: e.target.value })} 
              required 
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Stock
            </label>
            <input 
              type="number" 
              min="0"
              placeholder="10" 
              className={inputClass} 
              value={form.stock} 
              onChange={e => setForm({ ...form, stock: e.target.value })} 
              required 
            />
          </div>

        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
            URL Foto Produk
          </label>
          <input 
            type="url" 
            placeholder="https://images.unsplash.com/..." 
            className={inputClass} 
            value={form.image} 
            onChange={e => setForm({ ...form, image: e.target.value })} 
            required 
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
            Deskripsi
          </label>
          <textarea 
            placeholder="deskripsi produk..." 
            className={`${inputClass} h-24 resize-none text-sm`}
            value={form.description} 
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
            Kategori
          </label>
          <select 
            className={`${inputClass} font-bold text-slate-400`}
            value={form.category} 
            onChange={e => setForm({ ...form, category: e.target.value })}
          >
            <option value="GADGETS" className="bg-slate-900">GADGETS</option>
            <option value="FASHION" className="bg-slate-900">FASHION</option>
            <option value="TOYS" className="bg-slate-900">TOYS</option>
          </select>
        </div>

      </div>

      <Button
        type="submit"
        className="w-full py-4 mt-2 font-black tracking-[0.2em] shadow-lg bg-red-600 hover:bg-red-700 text-white border-none transition-all active:scale-95"
      >
        SIMPAN KE DATABASE
      </Button>
    </form>
  );
}