import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
      {/* LOGO */}
      <Link to="/" className="text-xl font-bold text-blue-400">
        BijiStore
      </Link>

      {/* MENU */}
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>

        <Link to="/tentang" className="hover:text-blue-400">
          Tentang Kami
        </Link>

        <Link to="/kontak" className="hover:text-blue-400">
          Kontak
        </Link>

        <Link
          to="/login"
          className="border border-blue-500 px-4 py-1 rounded hover:bg-blue-500"
        >
          Login
        </Link>

        <Link
          to="/admin"
          className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
        >
          Admin Dashboard
        </Link>
      </div>
    </nav>
  );
}
