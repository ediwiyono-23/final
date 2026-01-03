import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";
import MiniCart from "./MiniCart";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalQty } = useCart();
  const [openCart, setOpenCart] = useState(false);

  return (
    <nav className="bg-black text-white px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* LOGO */}
      <Link
        to="/home"
        className="font-bold text-blue-400 text-sm sm:text-base lg:text-lg"
      >
        BIJISTORE
      </Link>

      {/* MENU */}
      <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 relative text-xs sm:text-sm lg:text-base">
        <Link to="/home" className="hover:text-blue-400">
          Home
        </Link>
        <Link to="/tentang" className="hover:text-blue-400">
          Tentang
        </Link>
        <Link to="/kontak" className="hover:text-blue-400">
          Kontak
        </Link>

        {/* 🛒 KERANJANG */}
        <button
          type="button"
          onClick={() => setOpenCart((v) => !v)}
          className="relative flex items-center hover:text-blue-400"
        >
          {/* icon */}
          <span className="text-sm sm:text-base lg:text-lg">🛒</span>

          {/* badge */}
          {totalQty > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] sm:text-[10px] lg:text-xs px-1.5 rounded-full">
              {totalQty}
            </span>
          )}
        </button>

        {/* MINI CART */}
        {openCart && (
          <div
            className="absolute right-0 top-full mt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <MiniCart onClose={() => setOpenCart(false)} />
          </div>
        )}

        {/* AUTH */}
        {user ? (
          <button
            onClick={logout}
            className="text-red-400 hover:underline text-[10px] sm:text-xs lg:text-sm ml-1"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 px-2 sm:px-3 py-1 rounded text-[10px] sm:text-xs lg:text-sm font-bold"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
