import Link from 'next/link';
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FadeIn from "@/components/styles/FadeIn";

export default function PricingPage() {
  // Hubungkan langsung ke formulir WhatsApp admin
  const whatsappNumber = "6287769675686"; 
  const whatsappBaseUrl = `https://wa.me/${whatsappNumber}`;
  const templateChat = encodeURIComponent("Halo Admin KastaBola, saya ingin aktivasi paket KASTA PRO untuk tim kami.");

  return (
    <>
      <Header/>
      <div className="bg-brand-dark min-h-screen text-white font-sans py-20 md:py-28">
        <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="font-sport font-black text-5xl md:text-7xl uppercase tracking-tighter mb-6">
            INVESTASI <span className="text-brand-volt">KASTA</span> TIM KAMU.
          </h1>
          <p className="text-lg text-brand-muted leading-relaxed">
            Tinggalkan pencatatan manual di grup WA. Kelola tim, hitung koefisien tim, dan kunci rekam jejak performa digital tim amatir Anda dengan sistem langganan paling transparan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          <FadeIn delay={200}>
            <div className="bg-brand-card/40 border border-brand-card p-8 rounded-3xl flex flex-col justify-between relative opacity-80">
                <div>
                <span className="text-xs font-mono tracking-widest text-brand-muted uppercase bg-brand-card px-3 py-1 rounded-full">
                    Uji Coba Pertama
                </span>
                <h3 className="font-sport font-bold text-3xl uppercase mt-4 mb-2">Free Trial</h3>
                <p className="text-sm text-brand-muted mb-6">Cocok untuk mencoba papan skor digital pertandingan pertama.</p>
                
                <div className="mb-8">
                    <span className="font-sport font-black text-5xl text-white">IDR 0</span>
                    <span className="text-xs text-brand-muted font-mono ml-2">/ 30 HARI</span>
                </div>

                <div className="border-t border-brand-card/60 pt-6 mb-8">
                    <ul className="space-y-4 text-sm text-white/90">
                    {/* <li className="flex items-center gap-2">
                        <span className="text-brand-volt">✓</span> Gratis 1 pertandingan Premium Akses
                    </li> */}
                    <li className="flex items-center gap-2">
                        <span className="text-brand-volt">✓</span> Fitur Papan skor Digital (Terbatas)
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-brand-volt">✓</span> Pencatatan Hasil Pertandingan (Terbatas)
                    </li>
                    {/* <li className="flex items-center gap-2">
                        <span className="text-brand-volt">✓</span> Halaman Profil Tim Publik Tidak Tersedia
                    </li> */}
                    <li className="text-brand-muted/50 line-through flex items-center gap-2">
                        Halaman Profil Tim Publik
                    </li>
                    </ul>
                </div>
                </div>

                <Link href={`${whatsappBaseUrl}?text=Halo%20KastaBola%2C%20saya%20ingin%20klaim%20FREE%20TRIAL%2030%20Hari.`} target="_blank" className="w-full text-center bg-brand-card hover:bg-brand-card/80 border border-brand-muted/20 text-white font-bold py-4 px-6 rounded-xl transition-colors uppercase tracking-wider text-sm">
                Ambil Slot Trial
                </Link>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="bg-brand-card border-2 border-brand-volt p-8 rounded-3xl flex flex-col justify-between relative shadow-xl shadow-brand-volt/5">
                <div className="absolute -top-3.5 right-6 bg-brand-gold text-brand-dark font-sport font-black text-xs px-4 py-1 rounded-full uppercase tracking-widest">
                Pilihan Utama Tim
                </div>
                
                <div>
                <span className="text-xs font-mono tracking-widest text-brand-volt uppercase bg-brand-dark/50 px-3 py-1 rounded-full">
                    Full Akses
                </span>
                <h3 className="font-sport font-bold text-3xl uppercase mt-4 mb-2 text-brand-volt">Kasta Pro</h3>
                <p className="text-sm text-brand-muted mb-6">Akses penuh ekosistem kompetisi, validasi riwayat anti-manipulasi, dan profil publik tim.</p>
                
                <div className="mb-4">
                    <span className="font-sport font-black text-5xl text-white">IDR 199.000</span>
                    <span className="text-xs text-brand-muted font-mono ml-2">/ TIM / SEBULAN</span>
                </div>

                {/* SPESIFIKASI VALUE MATRIKS PATUNGAN (PRICE ANCHORING) */}
                <div className="bg-brand-dark px-4 py-3 rounded-xl border border-brand-card mb-8">
                    <p className="text-xs text-brand-gold leading-relaxed font-medium">
                    💡 <span className="font-bold">Analogi Patungan:</span> Hanya senilai <span className="text-white font-bold">Rp 19.000 per bulan per pemain</span> (Asumsi 10 pemain aktif dalam 1 tim). Lebih murah dari biaya parkir dan konsumsi lapangan!
                    </p>
                </div>

                <div className="border-t border-brand-card/80 pt-6 mb-8">
                    <ul className="space-y-4 text-sm text-white">
                    <li className="flex items-center gap-2">
                        <span className="text-brand-volt">✓</span> Papan Klasemen Regional Real-time (per Season)
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-brand-volt">✓</span> Input & Verifikasi Pertandingan Tanpa Batas
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-brand-volt">✓</span> Hak Masuk ke Event Secara Otomatis (S&K Berlaku)
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-brand-volt">✓</span> Halaman Profil Tim Publik
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="text-brand-volt">✓</span> Arsip Jejak Statistik & Top Skor Pemain
                    </li>
                    </ul>
                </div>
                </div>

                <Link href={`${whatsappBaseUrl}?text=${templateChat}`} target="_blank" className="w-full text-center bg-brand-volt text-brand-dark font-black py-4 px-6 rounded-xl hover:bg-white transition-all duration-300 uppercase tracking-wider text-sm shadow-md shadow-brand-volt/20">
                Aktivasi Kasta Pro Tim
                </Link>
            </div>
          </FadeIn>
        </div>

        {/* Footnote Transparansi Keuangan */}
        <div className="mt-16 text-center max-w-xl mx-auto">
          <p className="text-xs text-brand-muted leading-relaxed">
            * Tidak ada biaya tersembunyi. Pendaftaran pemain baru di tengah musim kasta tidak dikenakan biaya tambahan tambahan. Satu harga untuk kejayaan reputasi tim Anda.
          </p>
        </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}