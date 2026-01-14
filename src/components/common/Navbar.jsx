import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login"); 
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
        
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-black text-blue-600 tracking-tighter italic">
              BIJI<span className="text-gray-900">STORE</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">About</Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/admin" className="text-sm font-bold text-gray-900 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200">Dashboard</Link>
                <button onClick={handleLogout} className="text-sm font-bold text-red-600 hover:text-red-700">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100">Login</Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-white border-t border-gray-50 animate-fadeIn`}>
        <div className="flex flex-col px-4 pt-2 pb-6 space-y-1">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)} 
            className="block py-3 px-4 text-base font-semibold text-gray-700 hover:bg-gray-50 rounded-xl">
            Home
          </Link>
          <Link 
            to="/about" 
            onClick={() => setIsOpen(false)} 
            className="block py-3 px-4 text-base font-semibold text-gray-700 hover:bg-gray-50 rounded-xl">
            About
          </Link>
          
          <div className="pt-4 border-t border-gray-50 mt-2">
            {user ? (
              <div className="space-y-2">
                <Link 
                  to="/admin" 
                  onClick={() => setIsOpen(false)} 
                  className="block py-3 px-4 text-base font-bold text-blue-600 bg-blue-50 rounded-xl">
                  Dashboard Admin
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left py-3 px-4 text-base font-bold text-red-600">
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)} 
                className="block w-full text-center py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}