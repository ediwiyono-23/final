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
    <nav className="sticky top-0 z-50 w-full h-20 bg-black/75 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10">
      <div className="w-full h-full flex justify-between items-center px-10">
        
        <Link to="/home" className="text-2xl font-black tracking-tight text-white uppercase">
          OMKE<span className="text-amber-500">store.</span>
        </Link>

        <div className="flex items-center gap-10">
          
          <div className="hidden md:flex items-center gap-10">
            {["Home", "Tentang", "Kontak"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/home" : `/${item.toLowerCase()}`}
                className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400 hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="hidden md:block h-6 w-px bg-white/10" />
          <div className="relative group p-2">
            <button 
              type="button"
              onClick={() => setOpenCart((v) => !v)} 
              className="relative flex items-center justify-center focus:outline-none transition-transform active:scale-90"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors"
                strokeWidth="1.6"
                strokeLinecap="square"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
                <circle cx="9" cy="21" r="1" fill="currentColor" />
                <circle cx="20" cy="21" r="1" fill="currentColor" />
              </svg>

              {totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[11px] font-black h-5 min-w-5 px-1.5 flex items-center justify-center rounded-md">
                  {totalQty}
                </span>
              )}
            </button>

            {openCart && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-[calc(100%+20px)] w-80 bg-white rounded-2xl border border-slate-200 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.35)] overflow-hidden z-60"
              >
                <MiniCart onClose={() => setOpenCart(false)} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <button
                type="button"
                onClick={logout}
                className="text-sm font-bold tracking-widest text-red-400 hover:text-red-300 uppercase transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="text-sm font-bold tracking-widest text-white border border-white/20 px-5 py-2 rounded-full hover:bg-white hover:text-black transition-all uppercase"
              >
                Sign In
              </Link>
            )}

            {user?.user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-sm font-bold tracking-widest text-green-400 hover:text-green-300 uppercase border-l border-white/10 pl-6"
              >
                Admin Panel
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}