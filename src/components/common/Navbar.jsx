import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";
import MiniCart from "./MiniCart";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalQty } = useCart();
  const [openCart, setOpenCart] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full h-20 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="w-full h-full flex justify-between items-center px-6 md:px-10">
        <Link to="/home" className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase">
          Biji<span className="text-blue-500">store.</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-10">
          <div className="hidden lg:flex items-center gap-10">
            {["Home", "Tentang", "Kontak"].map((item) => (
              <Link 
                key={item} 
                to={item === "Home" ? "/home" : `/${item.toLowerCase()}`} 
                className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block h-6 w-px bg-white/10" />
          <div className="relative">
            <button onClick={() => setOpenCart((v) => !v)} className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="1.6">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
                <circle cx="9" cy="21" r="1" fill="currentColor" />
                <circle cx="20" cy="21" r="1" fill="currentColor" />
              </svg>
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-black h-4 min-w-4 flex items-center justify-center rounded-full">
                  {totalQty}
                </span>
              )}
            </button>
            {openCart && (
              <div className="absolute right-[-20px] md:right-0 top-[calc(100%+20px)] z-[70]">
                <MiniCart onClose={() => setOpenCart(false)} />
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                {user?.user?.role === "admin" && (
                  <Link to="/admin" className="text-[10px] font-black tracking-widest text-green-400 uppercase">Admin</Link>
                )}
                <button onClick={handleLogout} className="text-[10px] font-black tracking-widest text-red-400 uppercase">Sign Out</button>
              </>
            ) : (
              <Link to="/login" className="text-[10px] font-black tracking-widest text-white border border-white/20 px-5 py-2 rounded-full hover:bg-white hover:text-black transition-all uppercase">Sign In</Link>
            )}
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white p-2 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-black border-b border-white/10 px-10 py-10 flex flex-col gap-8 animate-fadeIn shadow-2xl">
          {["Home", "Tentang", "Kontak"].map((item) => (
            <Link 
              key={item} 
              to={item === "Home" ? "/home" : `/${item.toLowerCase()}`} 
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-black uppercase tracking-[0.4em] text-slate-400 active:text-white">
              {item}
            </Link>
          ))}
          <div className="h-px bg-white/10 w-full" />
          {user ? (
            <div className="flex flex-col gap-6 text-left">
              {user?.user?.role === "admin" && (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-sm font-black text-green-400 uppercase tracking-widest">Admin Panel</Link>
              )}
              <button onClick={handleLogout} className="text-left text-sm font-black text-red-400 uppercase tracking-widest">Sign Out</button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-sm font-black text-blue-500 uppercase tracking-widest">Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
}