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
    navigate(result.user.role === "admin" ? "/admin" : "/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      
      {/* CARD */}
      <div className="w-full max-w-md rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_60px_-20px_rgba(79,70,229,0.25)] p-10 animate-fade-up">

        {/* HEADER */}
        <header className="text-center mb-10">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Selamat Datang 👋
          </h2>
          <p className="text-slate-500 mt-2">
            Silakan login ke akun <span className="font-semibold text-indigo-600">BijiStore</span> Anda
          </p>
        </header>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* EMAIL */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@mail.com"
              className="
                w-full px-4 py-3 rounded-xl
                bg-white border border-slate-200
                outline-none
                focus:border-indigo-500
                focus:ring-4 focus:ring-indigo-500/10
                transition
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="
                w-full px-4 py-3 rounded-xl
                bg-white border border-slate-200
                outline-none
                focus:border-indigo-500
                focus:ring-4 focus:ring-indigo-500/10
                transition
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* BUTTON */}
          <Button
            type="submit"
            className="
              w-full py-3 mt-2
              bg-gradient-to-r from-indigo-600 to-cyan-500
              text-white font-bold
              rounded-xl
              hover:brightness-110
              hover:shadow-[0_15px_40px_rgba(99,102,241,0.4)]
              transition-all
              active:scale-95
            "
          >
            Login Sekarang
          </Button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-slate-500 mt-8">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="font-bold text-indigo-600 hover:underline"
          >
            Daftar Gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
