// src/app/page.tsx
import Link from 'next/link';
import FadeIn from "@/components/styles/FadeIn";

// Komponen Card Kecil untuk Preview Leaderboard
const TeamRankCard = ({ rank, name, points }: { rank: number; name: string; points: number }) => (
  <div className="flex items-center justify-between bg-brand-card p-4 rounded-lg border border-transparent hover:border-brand-volt transition-all duration-300">
    <div className="flex items-center gap-4">
      {/* Peringkat 1-3 menggunakan warna Emas Juara (brand-gold) */}
      <div className={`font-sport font-black text-2xl w-8 text-center ${rank <= 3 ? 'text-brand-gold' : 'text-brand-muted'}`}>
        #{rank}
      </div>
      <div className="w-10 h-10 rounded-full bg-brand-dark border border-brand-volt flex items-center justify-center font-bold text-xs text-brand-muted">
        LOGO
      </div>
      <div className="font-semibold text-white tracking-wide uppercase">{name}</div>
    </div>
    <div className="flex items-center gap-2">
      <div className="font-sport text-xl text-white">{points} pts</div>
      <div className="text-brand-volt text-xs">▲</div>
    </div>
  </div>
);

export default function Home() {
  // Nomor WhatsApp Admin KastaBola
  const whatsappNumber = "6287769675686"; 
  const whatsappBaseUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="flex flex-col min-h-screen bg-brand-dark">
      {/* 1. Header (Navigation) */}
      <header className="sticky top-0 z-50 bg-brand-dark/90 backdrop-blur-sm border-b border-brand-card">
        <nav className="container mx-auto px-6 py-4 flex gap-8 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {/* MONOGRAM LOGO KASTABOLA */}
            <div className="w-9 h-9 bg-brand-card rounded-lg flex items-center justify-center border-2 border-brand-volt">
              <span className="font-sport font-black text-2xl text-brand-volt">K</span>
            </div>
            <span className="font-sport font-bold text-xl tracking-wider text-white">KASTA<span className="text-brand-volt">BOLA</span>.ID</span>
          </Link>
          <div className="flex justify-between gap-1 md:gap-5">
            <Link href="#cta" className="text-sm font-semibold text-white/90 hover:text-brand-volt transition-colors">
              Hubungi Admin
            </Link>
            <Link href="#" className="text-sm font-semibold text-white/90 hover:text-brand-volt transition-colors">
              Login
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <section className="relative bg-brand-dark py-24 md:py-32 overflow-hidden">
          {/* Efek Garis Jaring Lapangan (Menggunakan Stadium Steel #161B22) */}
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: `linear-gradient(#161B22 1px, transparent 1px), linear-gradient(90deg, #161B22 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
          
          <div className="container mx-auto px-6 relative z-10 text-center">
            <FadeIn delay={100}>
              <h1 className="font-sport font-black text-6xl md:text-8xl uppercase leading-none tracking-tighter text-white mb-6">
                TENTUKAN <span className="text-brand-gold">KASTA</span> TIM KAMU!.
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 mb-12 leading-relaxed">
                Sparing amatir rasa Liga Profesional dengan statistik abadi, peringkat resmi regional, dan dokumentasi media premium berbasis <span className="text-brand-volt font-semibold">FIFA Elo Rating</span>.
              </p>
            </FadeIn>
            {/* Tombol CTA Utama menggunakan Electric Volt Neon */}

            <FadeIn delay={300}>
              <Link href="#cta" className="inline-block bg-brand-volt text-brand-dark font-black text-xl px-12 py-5 rounded-full uppercase tracking-wider hover:scale-105 transition-transform duration-300 shadow-lg shadow-brand-volt/20">
                Amankan Slot Free Trial Timmu
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* 3. Features (Comparison) */}
        <section className="bg-brand-card py-20 border-t border-brand-card">
          <div className="container mx-auto px-6">
            <h2 className="font-sport font-bold text-4xl text-white text-center uppercase tracking-tight mb-16">
              Mengapa KastaBola?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

            <FadeIn delay={400}>
              {/* Sparing Biasa (Kiri) */}
              <div className="bg-brand-dark p-8 rounded-2xl border border-red-900/30 opacity-60">
                <div className="text-red-500 text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span>❌</span> SPARING AMATIR BIASA
                </div>
                <ul className="space-y-5 text-brand-muted">
                  <li>• Tidak ada papan score digital</li>
                  <li>• Skor Terlupakan Setelah Lapangan Tutup</li>
                  <li>• Ego Pemain Terpendam Tanpa Bukti</li>
                  <li>• Koefisien Koefisien Koefisien... Apa itu?</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={600}>
              {/* KastaBola Premium (Kanan) */}
              <div className="bg-brand-dark p-8 rounded-2xl border-2 border-brand-volt shadow-xl shadow-brand-volt/5 relative">
                <div className="absolute -top-3 right-6 bg-brand-gold text-brand-dark text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">PREMIUM</div>
                <div className="text-brand-volt text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span>✅</span> EKOSISTEM KASTABOLA
                </div>
                <ul className="space-y-5 text-white">
                  <li>• Feature Papan Skor digital</li>
                  <li>• Statistik & Rekor Abadi tersimpan</li>
                  <li>• Validasi Performa dan Statistik</li>
                  <li>• <span className="font-bold text-brand-gold">Peringkat Kasta Resmi berbasis FIFA Elo</span></li>
                </ul>
              </div>
            </FadeIn>
            </div>
          </div>
        </section>

        {/* 4. Preview: Leaderboard Mockup */}
        <FadeIn delay={700}>
          <section className="bg-brand-dark py-20">
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="p-6 md:p-8 rounded-3xl border border-brand-card bg-gradient-to-br from-brand-card to-brand-dark">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-card">
                  <h3 className="font-sport font-black text-3xl md:text-4xl text-white uppercase tracking-tighter">
                    KASTA UTAMA REGIONAL
                  </h3>
                  <div className="text-brand-muted text-xs font-medium tracking-wider">JUNI 2026</div>
                </div>
                
                <div className="space-y-4">
                  <TeamRankCard rank={1} name="GARUDA FC" points={1850} />
                  <TeamRankCard rank={2} name="BEKASI JAYA" points={1790} />
                  <TeamRankCard rank={3} name="BINGUNG FC" points={1600} /> 
                  <TeamRankCard rank={4} name="BINTANG MUDA" points={1580} />
                  <TeamRankCard rank={5} name="PUTRA DAERAH" points={1420} />
                  <TeamRankCard rank={6} name="NGGA BINGUNG FC" points={1320} />
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* 5. CTA (WA Form) Section */}
        <section id="cta" className="bg-brand-card py-24 border-t border-brand-card">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-sport font-black text-5xl md:text-7xl text-brand-gold uppercase leading-none tracking-tighter mb-6">
              SLOT TRIAL MEI TERBATAS.
            </h2>
            <p className="max-w-xl mx-auto text-lg text-white mb-12">
              Tim Anda berhak mendapatkan uji coba <span className="font-bold text-brand-volt">GRATIS 1 BULAN</span> penuh akses KastaBola. Kunci slot pendaftaran tim Anda sekarang sebelum kuota penuh.
            </p>
            
            {/* Teks bergaya Mad Libs Form */}
            <div className="max-w-xl mx-auto bg-brand-dark p-8 rounded-2xl border border-brand-card mb-12 text-left text-brand-muted leading-relaxed font-sans shadow-inner">
              Halo Admin KastaBola, saya Kapten Tim <span className="font-semibold text-white border-b-2 border-brand-volt inline-block w-40 text-center">[ NAMA TIM ]</span> yang berbasis di <span className="font-semibold text-white border-b-2 border-brand-volt inline-block w-48 text-center">[ WILAYAH ]</span>. Kami ingin mengunci slot pendaftaran <span className="font-bold text-brand-gold">FREE TRIAL MEI</span>. Tolong segera verifikasi tim kami.
            </div>

            <Link href={`${whatsappBaseUrl}?text=Halo%20KastaBola%2C%20saya%20Kapten%20Tim%20%5B NAMA TIM %5D%20yang%20berbasis%20di%20%5B WILAYAH %5D.%20Kami%20ingin%20mengunci%20slot%20pendaftaran%20FREE%20TRIAL%20MEI.`} target="_blank" className="inline-block bg-brand-volt text-brand-dark font-black text-xl px-12 py-5 rounded-full uppercase tracking-wider hover:bg-white transition-all duration-300">
              Kunci Slot Tim Kami via WhatsApp
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark py-8 border-t border-brand-card">
        <div className="container mx-auto px-6 text-center text-brand-muted text-xs tracking-wider">
          © 2026 kastabola.id Part of Julu Coffee & Snacks Ecosystem.
        </div>
      </footer>
    </div>
  );
}