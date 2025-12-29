import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-white"
      : "text-gray-400 hover:text-white";

  return (
    <nav className="bg-linear-to-r from-black to-gray-900 px-8 py-4 flex justify-between items-center">
      {/* LOGO */}
      <Link to="/" className="text-2xl font-extrabold text-white tracking-wide">
        Biji<span className="text-blue-400">Store</span>
      </Link>

      {/* MENU */}
      <div className="flex items-center gap-6">
        <Link to="/" className={isActive("/")}>
          Home
        </Link>

        <Link
          to="/admin"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Admin Dashboard
        </Link>
      </div>
    </nav>
  );
}
