export default function About() {
  return (
    <main className="bg-[#020617] min-h-screen text-slate-200">
      <div className="max-w-5xl mx-auto py-24 px-6">

        <header className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-6">
            Tentang <span className="text-amber-400">omkeStore.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Kami hadir untuk memberikan pengalaman belanja produk berkualitas
            dengan keamanan dan kenyamanan nomor satu.
          </p>

          <p className="mt-4 text-sm text-slate-500 tracking-wide">
            Dibangun dengan prinsip transparansi, kepercayaan, dan pelayanan cepat.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-10 items-stretch">

          <div
            className="
              bg-white/5 backdrop-blur-xl
              p-8 rounded-3xl
              border border-white/10
              transition-all duration-500
              hover:-translate-y-1
              hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
            "
          >
            <h2 className="text-2xl font-bold mb-5 text-white">
              Visi Kami
            </h2>

            <p className="text-slate-400 leading-loose">
              Menjadi platform e-commerce pilihan utama bagi mereka yang mencari
              produk-produk pilihan (curated) dengan layanan yang transparan dan cepat.
            </p>

            <p className="mt-4 text-sm text-slate-500">
              Kami percaya bahwa kualitas dan kepercayaan adalah fondasi utama dalam setiap transaksi.
            </p>
          </div>

          <div
            className="
              bg-white/5 backdrop-blur-xl
              p-8 rounded-3xl
              border border-white/10
              transition-all duration-500
              hover:-translate-y-1
              hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
            "
          >
            <h2 className="text-2xl font-bold mb-5 text-white">
              Misi Kami
            </h2>

            <ul className="space-y-5 text-slate-400">
              <li className="flex items-start gap-4">
                <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 text-sm">
                  ✔
                </span>
                <span>
                  Menyediakan produk original dan terjamin.
                </span>
              </li>

              <li className="flex items-start gap-4">
                <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 text-sm">
                  ✔
                </span>
                <span>
                  Sistem transaksi yang mudah dan aman.
                </span>
              </li>

              <li className="flex items-start gap-4">
                <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 text-sm">
                  ✔
                </span>
                <span>
                  Pelayanan admin yang responsif (Fast Response).
                </span>
              </li>
            </ul>

            <p className="mt-6 text-sm text-slate-500">
              Setiap misi kami dirancang untuk memberikan pengalaman belanja yang tenang, aman, dan memuaskan.
            </p>
          </div>
        </div>

        <footer className="mt-24 pt-12 border-t border-white/10 text-center">
          <p className="text-slate-400 italic font-medium tracking-wide">
            “Belanja Bijak, Pilih BijiStore.”
          </p>
        </footer>
      </div>
    </main>
  );
}
