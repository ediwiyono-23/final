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

  const renderStock = (stock) => {
    if (stock === 0) {
      return (
        <span className="px-3 py-1 rounded-lg bg-red-500/10 text-red-500 text-[10px] font-black uppercase border border-red-500/20">
          Habis
        </span>
      );
    }

    if (stock <= 5) {
      return (
        <span className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase border border-amber-500/20">
          Sisa {stock}
        </span>
      );
    }

    return (
      <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase border border-emerald-500/20">
        Stok: {stock}
      </span>
    );
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
      <div className="max-h-125 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-800/50 backdrop-blur-md text-[10px] uppercase text-slate-500 font-black tracking-[0.2em] sticky top-0 z-10 border-b border-slate-700">
            <tr>
              <th className="px-6 py-5">Nama Produk</th>
              <th className="px-6 py-5">Harga</th>
              <th className="px-6 py-5 text-center">Status Stok</th>
              <th className="px-6 py-5 text-center">Kontrol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-20 text-center text-slate-600 italic font-medium">
                  Database kosong. Belum ada produk tersinkronasi.
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-indigo-500/5 transition-all duration-200 group"
                >
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-200 group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-slate-400 font-mono text-sm group-hover:text-indigo-400 transition-colors italic">
                      Rp {Number(item.price).toLocaleString("id-ID")}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    {renderStock(item.stock ?? 0)}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-6">
                      <Link
                        to={`/admin/edit/${item.id}`}
                        className="text-blue-500 font-black hover:text-blue-400 transition-all text-[10px] tracking-widest uppercase hover:scale-110">
                        EDIT
                      </Link>
                      <button
                        onClick={() => setSelectedId(item.id)}
                        className="text-red-600 font-black hover:text-red-500 transition-all text-[10px] tracking-widest uppercase hover:scale-110">
                        HAPUS
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Dialog
        open={!!selectedId}
        onClose={() => setSelectedId(null)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Produk?"
      >
        <div className="text-slate-400 text-sm leading-relaxed">
          Apakah Anda yakin ingin menghapus data ini? Tindakan ini akan 
          menghapus data secara permanen dari <span className="text-red-500 font-bold tracking-tighter">CLOUD DATABASE</span>.
        </div>
      </Dialog>
    </div>
  );
}