import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-brand-dark/90 backdrop-blur-sm border-b border-brand-card">
      <nav className="container mx-auto px-6 py-4 flex gap-8 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
        {/* MONOGRAM LOGO KASTABOLA */}
        {/* <div className="w-9 h-9 bg-brand-card rounded-lg flex items-center justify-center border-2 border-brand-volt">
            <span className="font-sport font-black text-2xl text-brand-volt">K</span>
        </div> */}
        <Logo size={44} />
        <span className="font-sport font-bold text-xl tracking-wider text-brand-gold">KASTA<span className="text-brand-volt">BOLA</span><span className="text-white">.ID</span> </span>
        </Link>
        <div className="flex justify-between gap-1 md:gap-5">
        <Link href="/pricing" className="text-sm font-semibold text-white/90 hover:text-brand-volt transition-colors">
            Pricing
        </Link>
        <Link href="#" className="text-sm font-semibold text-white/90 hover:text-brand-volt transition-colors">
            Login
        </Link>
        </div>
      </nav>
    </header>
  );
}