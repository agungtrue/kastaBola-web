import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function LogoAlternative({ className = '', size = 48 }: LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 1. Latar Belakang Kotak Panel Sepak Bola Hexagonal (Hitam Karbon) */}
      <polygon 
        points="100,15 175,55 175,145 100,185 25,145 25,55" 
        fill="#0B0E11" 
        stroke="#1F242C" 
        strokeWidth="4"
      />
      
      {/* 2. Garis Grid Data / Indikator Level Kasta (Matriks Statistik) */}
      <line x1="45" y1="140" x2="155" y2="140" stroke="#1F242C" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="55" y1="100" x2="145" y2="100" stroke="#1F242C" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="65" y1="60" x2="135" y2="60" stroke="#1F242C" strokeWidth="2" strokeDasharray="4 4" />

      {/* 3. Huruf "K" yang Dibentuk dari 3 Balok Data Indikator Naik Kasta */}
      
      {/* Tiang Utama K: Diwakili Balok Grafik Tegak (Vibrant Orange) */}
      <path 
        d="M55 50L75 45V155L55 150V50Z" 
        fill="#FFA800" 
      />

      {/* Sayap Atas K: Melambangkan Kasta Elit / Target Puncak (Electric Stabilo) */}
      {/* Dibuat meruncing ke kanan atas menyerupai anak panah pertumbuhan */}
      <path 
        d="M85 95L145 45L165 52L95 110H85V95Z" 
        fill="#CCFF00" 
      />

      {/* Sayap Bawah K: Melambangkan Pondasi Komunitas / Kasta Semenjana (Putih Bersih) */}
      {/* Memberikan efek kontras "Clean & Sporty" agar logo terlihat premium */}
      <path 
        d="M85 105H95L155 152L135 158L85 115V105Z" 
        fill="#FFFFFF" 
      />

      {/* 4. Apex Node: Titik Koordinat Tertinggi / Target Poin ELO Max */}
      <circle cx="155" cy="48" r="5" fill="#CCFF00" />
      <circle cx="155" cy="48" r="11" stroke="#CCFF00" strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}