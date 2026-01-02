import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; 

export default function Navbar() {
  const { user, logout } = useAuth(); 

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/home" className="text-xl font-bold text-blue-400">BIJISTORE</Link>

      <div className="flex gap-6 items-center">
        <Link to="/home" className="hover:text-blue-400 text-sm">Home</Link>
        <Link to="/tentang" className="hover:text-blue-400 text-sm">Tentang</Link>
        <Link to="/kontak" className="hover:text-blue-400 text-sm">Kontak</Link>

        {user ? (
          <div className="flex items-center gap-4 border-l pl-6 ml-2">
            {(user?.user?.role === "admin" || user?.role === "admin") && (
              <Link to="/admin" className="text-xs bg-blue-600 px-3 py-1 rounded">Admin Panel</Link>
            )}
            <button onClick={logout} className="text-xs text-red-400 hover:underline">Logout</button>
          </div>
        ) : (
          <Link to="/login" className="bg-blue-600 px-4 py-1 rounded text-sm font-bold">Login</Link>
        )}
      </div>
    </nav>
  );
}