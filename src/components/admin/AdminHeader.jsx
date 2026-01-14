import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; 

export default function AdminHeader() {
  const { logout, user } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-2xl">
      <div className="flex items-center gap-4">
        <Link to="/admin" className="group">
          <span className="text-xl font-black text-white tracking-tighter">
            ADMIN<span className="text-red-500 group-hover:text-red-400 transition-colors">PRO</span>
          </span>
        </Link>
        <div className="h-5 w-px bg-slate-700 mx-2 hidden md:block"></div>
        <span className="text-sm text-slate-400 hidden md:inline font-medium">
          Sesi: <span className="text-slate-100 font-bold">{user?.user?.name || "Administrator"}</span>
        </span>
      </div>

      <div className="flex gap-4 items-center">
        <Link 
          to="/home" 
          className="text-[11px] font-bold text-slate-400 hover:text-white transition uppercase tracking-[0.15em] border border-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-800"
        >
          Lihat Toko
        </Link>
        
        <button 
          onClick={handleLogout} 
          className="bg-red-500/10 text-red-500 border border-red-500/20 px-5 py-2 rounded-lg text-xs font-black hover:bg-red-600 hover:text-white transition-all active:scale-95 shadow-lg shadow-red-500/5"
        >
          LOGOUT
        </button>
      </div>
    </header>
  );
}