export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring"
          />

          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Daftar
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Sudah punya akun?{" "}
          <span className="text-blue-600 cursor-pointer">Login</span>
        </p>
      </div>
    </div>
  );
}
