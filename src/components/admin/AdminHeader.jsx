export default function AdminHeader() {
  return (
    <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-red-600">Admin Panel</h1>
      <a
        href="/"
        className="text-sm hover:underline text-blue-500"
      >
        Kembali ke Toko
      </a>
    </header>
  );
}
