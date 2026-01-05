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
    <header className="bg-white border-b px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link to="/admin" className="text-xl font-black text-red-600 tracking-tighter">
          ADMIN PANEL
        </Link>
        <div className="h-4 w-px bg-gray-300 mx-2 hidden md:block"></div>
        <span className="text-sm text-gray-500 hidden md:inline">
          Selamat bekerja, <span className="font-bold text-gray-800">{user?.user?.name || "Admin"}</span>
        </span>
      </div>

      <div className="flex gap-4 items-center">
        <Link 
          to="/home" 
          className="text-xs font-bold text-blue-600 hover:text-blue-800 transition uppercase tracking-wider"
        >
          Lihat Toko
        </Link>
        
        <button 
          onClick={handleLogout} 
          className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-black hover:bg-red-600 hover:text-white transition-all active:scale-95"
        >
          LOGOUT
        </button>
      </div>
    </header>
  );
}