import Button from "../../components/ui/Button";

export default function Contact() {
  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/6281362011079?text=Halo%20Admin%20BijiStore",
      "_blank"
    );
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200">
      <div className="max-w-5xl mx-auto py-24 px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h1 className="text-5xl font-black text-white mb-6">
              Hubungi Kami
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Punya pertanyaan seputar produk atau pesanan? Tim kami siap membantu
              Anda setiap hari pukul 09.00 - 21.00 WIB.
            </p>

            <div className="space-y-5">

              <div
                className="
                  flex items-center gap-5
                  p-5 rounded-2xl
                  bg-white/5 backdrop-blur
                  border border-white/10
                "
              >
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Alamat
                  </p>
                  <p className="text-sm font-semibold text-white">
                    yogyakarta, Jawa Tengah
                  </p>
                </div>
              </div>

              <div
                className="
                  flex items-center gap-5
                  p-5 rounded-2xl
                  bg-white/5 backdrop-blur
                  border border-white/10
                "
              >
                <span className="text-2xl">📧</span>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Email
                  </p>
                  <p className="text-sm font-semibold text-white">
                    support@omkestore.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="
              relative overflow-hidden
              rounded-3xl p-12
              bg-linear-to-b from-[#0b1220] to-[#020617]
              border border-white/10
              shadow-[0_30px_80px_rgba(0,0,0,0.7)]
            "
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(600px circle at top, rgba(251,191,36,0.12), transparent 45%)",
              }}
            />

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-4">
                Fast Response
              </h3>

              <p className="text-slate-400 text-sm mb-10 leading-relaxed">
                Klik tombol di bawah untuk chat langsung dengan admin via WhatsApp.
              </p>

              <Button
                onClick={handleWhatsApp}
                className="
                  w-full py-4
                  bg-linear-to-r from-amber-500 to-yellow-400
                  text-black font-semibold
                  border-none
                  rounded-xl
                  transition-all duration-300
                  hover:brightness-110
                  hover:shadow-[0_10px_30px_rgba(251,191,36,0.4)]
                  active:scale-[0.98]
                "
              >
                Chat via WhatsApp
              </Button>
              <p className="mt-6 text-xs text-slate-500 text-center tracking-wide">
                Admin online & siap membantu Anda
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
