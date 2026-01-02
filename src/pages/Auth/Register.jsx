import { Link } from "react-router-dom";
import Button from "../../components/ui/Button"; 

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
        <header className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Buat Akun</h2>
          <p className="text-sm text-gray-500">Gabung dengan komunitas BijiStore</p>
        </header>

        <form className="space-y-4">
          <input type="text" placeholder="Nama Lengkap" className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-black transition" />
          <input type="email" placeholder="Email Anda" className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-black transition" />
          <input type="password" placeholder="Buat Password" className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-black transition" />
          
          <Button className="w-full py-3 mt-2">Daftar Akun</Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Sudah punya akun? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login di sini</Link>
        </p>
      </div>
    </div>
  );
}
