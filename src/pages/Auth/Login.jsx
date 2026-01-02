import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authService"; 
import { useAuth } from "../../hooks/useAuth"; 
import Button from "../../components/ui/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const result = loginUser(email, password);
    if (!result) {
      alert("Email atau password salah");
      return;
    }

    login(result); 
    if (result.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
        <header className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Selamat Datang</h2>
          <p className="text-sm text-gray-500">Silakan login ke akun BijiStore Anda</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="admin@mail.com"
              className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-black transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-black transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full py-3 mt-2">Login Sekarang</Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Belum punya akun? <Link to="/register" className="text-blue-600 font-bold hover:underline">Daftar Gratis</Link>
        </p>
      </div>
    </div>
  );
}
