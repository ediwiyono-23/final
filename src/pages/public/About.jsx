export default function About() {
  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto py-20 px-6">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-black text-gray-900 tracking-tighter mb-4">
            Tentang <span className="text-blue-600">BijiStore.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Kami hadir untuk memberikan pengalaman belanja produk berkualitas dengan 
            keamanan dan kenyamanan nomor satu.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Visi Kami</h2>
            <p className="text-gray-600 leading-loose">
              Menjadi platform e-commerce pilihan utama bagi mereka yang mencari 
              produk-produk pilihan (curated) dengan layanan yang transparan dan cepat.
            </p>
          </div>

          {/* Kartu Misi - Sekarang Putih (Sebelumnya Hitam) */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Misi Kami</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-sm">✔</span> 
                Menyediakan produk original dan terjamin.
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-sm">✔</span> 
                Sistem transaksi yang mudah dan aman.
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-sm">✔</span> 
                Pelayanan admin yang responsif (Fast Response).
              </li>
            </ul>
          </div>
        </div>

        <footer className="mt-20 pt-10 border-t border-gray-100 text-center">
          <p className="text-gray-400 italic font-medium">
            "Belanja Bijak, Pilih BijiStore."
          </p>
        </footer>
      </div>
    </main>
  );
}