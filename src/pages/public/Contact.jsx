import Button from "../../components/ui/Button"; 

export default function Contact() {
  const handleWhatsApp = () => {
    window.open("https://wa.me/6281362011079?text=Halo%20Admin%20BijiStore", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 max-w-4xl mx-auto py-20 px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-6">Hubungi Kami</h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Punya pertanyaan seputar produk atau pesanan? Tim kami siap membantu Anda setiap hari pukul 09.00 - 21.00 WIB.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Alamat</p>
                  <p className="text-sm font-semibold">yogyakarta, Jawa Tengah</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Email</p>
                  <p className="text-sm font-semibold">support@bijistore.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 text-white p-10 rounded-3xl shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Fast Response</h3>
            <p className="text-gray-400 text-sm mb-8">Klik tombol di bawah untuk chat langsung dengan admin via WhatsApp.</p>
            <Button 
              onClick={handleWhatsApp} 
              className="w-full py-4 bg-green-500 hover:bg-green-600 border-none"
            >
              Chat via WhatsApp
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}