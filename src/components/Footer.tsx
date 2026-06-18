import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-card text-white font-sans">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-brand-card rounded-lg flex items-center justify-center border-2 border-brand-volt group-hover:bg-brand-volt transition-colors duration-300">
                <span className="font-sport font-black text-2xl text-brand-volt group-hover:text-brand-dark">K</span>
              </div>
              <span className="font-sport font-bold text-xl tracking-wider">KASTA<span className="text-brand-volt">BOLA</span>.ID</span>
            </Link>
            <p className="text-sm text-brand-muted leading-relaxed">
              Platform data, statistik, dan hierarki peringkat resmi sepak bola amatir regional berbasis sistem kalkulasi FIFA Elo Rating.
            </p>
            {/* Live Data Badge Indicator */}
            {/* <div className="inline-flex items-center gap-2 bg-brand-card border border-brand-card px-3 py-1.5 rounded-full w-fit mt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-volt opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-volt"></span>
              </span>
              <span className="text-[11px] font-mono tracking-wider text-brand-muted uppercase">ELO Engine: Online</span>
            </div> */}
          </div>

          <div>
            <h4 className="font-sport font-bold text-sm tracking-widest text-brand-gold uppercase mb-6">
              Sistem Kasta
            </h4>
            <ul className="space-y-3.5 text-sm text-brand-muted">
              <li>
                <Link href="#leaderboard" className="hover:text-brand-volt transition-colors duration-200 flex items-center gap-1">
                  <span>🏆</span> Kasta Elit <span className="text-[10px] text-brand-gold font-mono">(1800+ pts)</span>
                </Link>
              </li>
              <li>
                <Link href="#leaderboard" className="hover:text-brand-volt transition-colors duration-200 flex items-center gap-1">
                  <span>⚡</span> Kasta Utama <span className="text-[10px] text-white font-mono">(1400-1799)</span>
                </Link>
              </li>
              <li>
                <Link href="#leaderboard" className="hover:text-brand-volt transition-colors duration-200 flex items-center gap-1">
                  <span>🛡️</span> Kasta Semenjana <span className="text-[10px] text-brand-muted font-mono">(1000-1399)</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-sport font-bold text-sm tracking-widest text-white uppercase mb-6">
              Fitur & Korporasi
            </h4>
            <ul className="space-y-3.5 text-sm text-brand-muted font-medium">
              <li>
                <Link href="#features" className="hover:text-brand-volt transition-colors duration-200">
                  Papan Skor Digital
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-brand-volt transition-colors duration-200">
                  Arsip Statistik Tim
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-brand-volt transition-colors duration-200">
                  Dokumentasi Media HD
                </Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-brand-volt transition-colors duration-200 text-brand-volt/90 font-semibold">
                  Turnamen Resmi & Event 
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-sport font-bold text-sm tracking-widest text-white uppercase mb-6">
              Find Us & Media
            </h4>
            <p className="text-sm text-brand-muted mb-4 leading-relaxed">

            </p>
            <div className="flex items-center gap-3">
              <Link href="https://x.com/kastabolaid" target="_blank" className="w-10 h-10 bg-brand-card rounded-lg flex items-center justify-center text-brand-muted hover:text-brand-volt hover:border hover:border-brand-volt transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              <Link href="https://instagram.com/kastabola_" target="_blank" className="w-10 h-10 bg-brand-card rounded-lg flex items-center justify-center text-brand-muted hover:text-brand-volt hover:border hover:border-brand-volt transition-all duration-300">
                <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="https://youtube.com/@kasta_bola" target="_blank" className="w-10 h-10 bg-brand-card rounded-lg flex items-center justify-center text-brand-muted hover:text-brand-volt hover:border hover:border-brand-volt transition-all duration-300">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-brand-card/30 border-t border-brand-card py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-wider text-brand-muted">
          <div>
            © 2026 <span className="font-semibold text-white/90">Kastabola.id</span>. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>⚡ Proudly part of</span>
            <Link href="https://julucoffee.com" target="_blank" className="text-white hover:text-brand-volt font-bold transition-colors">
              Julu Coffee & Snacks
            </Link>
            <span>Ecosystem</span>
          </div>
        </div>
      </div>
    </footer>
  );
}