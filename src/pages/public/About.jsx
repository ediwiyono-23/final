export default function About() {
  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <header className="text-center mb-16">
        <h1 className="text-6xl font-black text-gray-900 tracking-tighter mb-4">
          Tentang <span className="text-blue-600">BijiStore.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Kami hadir untuk memberikan pengalaman belanja produk berkualitas dengan 
          keamanan dan kenyamanan nomor satu.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Visi Kami</h2>
          <p className="text-gray-600 leading-loose">
            Menjadi platform e-commerce pilihan utama bagi mereka yang mencari 
            produk-produk pilihan (curated) dengan layanan yang transparan dan cepat.
          </p>
        </div>

        <div className="bg-black text-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Misi Kami</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex gap-2">
              <span className="text-blue-400">✔</span> 
              Menyediakan produk original dan terjamin.
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">✔</span> 
              Sistem transaksi yang mudah dan aman.
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">✔</span> 
              Pelayanan admin yang responsif (Fast Response).
            </li>
          </ul>
        </div>
      </div>

      <footer className="mt-20 pt-10 border-t border-gray-100 text-center">
        <p className="text-gray-400 italic">
          "Belanja Bijak, Pilih BijiStore."
        </p>
      </footer>
    </main>
  );
}