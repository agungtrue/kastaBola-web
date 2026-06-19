'use client';

import { useState, useEffect } from 'react';

interface Player {
  id: number;
  number: number;
  name: string;
  goals: number;
  assists: number;
  yellowCard: boolean;
  redCard: boolean;
}

interface GoalEvent {
  id: string;
  playerName: string;
  minute: number;
  team: 'home' | 'away';
}

export default function DigitalScoreboard() {
  // 1. Core State Pertandingan & Tim
  const [homeTeam, setHomeTeam] = useState({ name: 'BINGUNG FC', score: 0, logoLetter: 'G' });
  const [awayTeam, setAwayTeam] = useState({ name: 'LUTHFI & FRIEND', score: 0, logoLetter: 'B' });

  // State untuk List Pencetak Gol Kronologis
  const [goalEvents, setGoalEvents] = useState<GoalEvent[]>([]);

  // 2. State Live Match Timer (FE Only Engine)
  const [seconds, setSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isTimerActive && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    //   clearInterval(interval)
    };
  }, [isTimerActive]);

  // Format hitungan detik ke format standar MM:SS
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Ambil menit saat ini untuk penanda waktu gol (misal: detik ke-75 berarti menit ke-2)
  const getCurrentMatchMinute = () => {
    return Math.floor(seconds / 60) + 1;
  };

  // 3. Mock Data Line-up
  const [homeLineup, setHomeLineup] = useState<Player[]>([
    { id: 1, number: 1, name: 'Budi Utomo (GK)', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 2, number: 5, name: 'Andi Wijaya', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 3, number: 10, name: 'Dani Setiawan', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 4, number: 7, name: 'Eko Prasetyo', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 5, number: 9, name: 'Feri Fadilah', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 6, number: 17, name: 'SDA', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 14, number: 14, name: 'Ulis', goals: 0, assists: 0, yellowCard: false, redCard: false },

  ]);

  const [awayLineup, setAwayLineup] = useState<Player[]>([
    { id: 6, number: 12, name: 'Rendra (GK)', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 7, number: 4, name: 'Hendra Saputra', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 8, number: 8, name: 'Gilang Ramadhan', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 9, number: 11, name: 'Irfan Bachdim', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 10, number: 20, name: 'Joko Susilo', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 11, number: 20, name: 'Arba Eci', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 12, number: 20, name: 'Luthfi Ibnu', goals: 0, assists: 0, yellowCard: false, redCard: false },
  ]);

  const [selectedPlayer, setSelectedPlayer] = useState<{ player: Player; team: 'home' | 'away' } | null>(null);

  // 4. Logic Aksi Kejadian Lapangan
  const handlePlayerAction = (action: 'goal' | 'assist' | 'yellow' | 'red') => {
    if (!selectedPlayer) return;

    const isHome = selectedPlayer.team === 'home';
    const lineup = isHome ? homeLineup : awayLineup;
    const setLineup = isHome ? setHomeLineup : setAwayLineup;

    const updatedLineup = lineup.map((p) => {
      if (p.id === selectedPlayer.player.id) {
        switch (action) {
          case 'goal':
            if (isHome) setHomeTeam(prev => ({ ...prev, score: prev.score + 1 }));
            else setAwayTeam(prev => ({ ...prev, score: prev.score + 1 }));
            
            // Masukkan data ke list pencetak gol secara real-time
            setGoalEvents(prev => [
              ...prev, 
              { 
                id: Math.random().toString(), 
                playerName: p.name, 
                minute: getCurrentMatchMinute(), 
                team: selectedPlayer.team 
              }
            ]);
            return { ...p, goals: p.goals + 1 };
          case 'assist':
            return { ...p, assists: p.assists + 1 };
          case 'yellow':
            return { ...p, yellowCard: !p.yellowCard };
          case 'red':
            return { ...p, redCard: !p.redCard };
          default:
            return p;
        }
      }
      return p;
    });

    setLineup(updatedLineup);
    setSelectedPlayer(null);
  };

  const handleAnnulGoal = (eventId: string) => {
  // 1. Cari tahu detail event gol yang mau dianulir
  const eventToAnnul = goalEvents.find((e) => e.id === eventId);
  if (!eventToAnnul) return;

  const isHome = eventToAnnul.team === 'home';
  const lineup = isHome ? homeLineup : awayLineup;
  const setLineup = isHome ? setHomeLineup : setAwayLineup;

  // 2. Rollback skor utama tim (-1)
  if (isHome) {
    setHomeTeam((prev) => ({ ...prev, score: Math.max(0, prev.score - 1) }));
  } else {
    setAwayTeam((prev) => ({ ...prev, score: Math.max(0, prev.score - 1) }));
  }

  // 3. Rollback jumlah gol personal pemain di line-up (-1)
  const updatedLineup = lineup.map((p) => {
    if (p.name === eventToAnnul.playerName) {
      return { ...p, goals: Math.max(0, p.goals - 1) };
    }
    return p;
  });
  setLineup(updatedLineup);

  // 4. Hapus event gol dari list kronologis
  setGoalEvents((prev) => prev.filter((e) => e.id !== eventId));
};

  return (
    <div className="bg-[#0B0E11] min-h-screen text-white font-sans p-6 select-none">
      
      {/* STATUS BAR UTAMA */}
      <div className="text-center mb-8">
        <span className="bg-[#CCFF00] text-[#0B0E11] font-mono font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">
          MATCH LOG ENGINE: LIVE UPDATING
        </span>
      </div>

      {/* PAPAN SKOR UTAMA UTAMA */}
      <div className="bg-[#14181F] border border-gray-800 rounded-3xl p-8 max-w-4xl mx-auto shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          
          {/* Tim Rumah (Logo + Nama + Skor) */}
          <div className="flex flex-col items-center flex-1 text-center">
            {/* Shield Logo Team Placeholder */}
            <div className="w-16 h-16 bg-[#1A1F26] border-2 border-[#FFA800] rounded-2xl flex items-center justify-center font-black text-xl text-[#FFA800] mb-3 shadow-md">
              {homeTeam.logoLetter}
            </div>
            <h2 className="font-bold text-lg md:text-xl tracking-wide text-white mb-2">{homeTeam.name}</h2>
            <div className="text-6xl font-black text-[#FFA800] font-mono">{homeTeam.score}</div>
          </div>
          
          {/* KONTROL MENIT PERTANDINGAN LIVE (DI TENGAH) */}
          <div className="flex flex-col items-center justify-center px-6 border-y md:border-y-0 md:border-x border-gray-800 py-4 md:py-0 min-w-[200px]">
            <span className="font-mono text-gray-400 font-bold tracking-widest text-xs mb-1">
              {seconds >= 2700 ? 'BABAK II' : 'BABAK I'}
            </span>
            {/* Waktu Digital */}
            <div className="text-4xl font-black font-mono tracking-wider text-[#CCFF00] bg-[#0B0E11] px-4 py-2 rounded-xl border border-gray-800 min-w-[120px] text-center shadow-inner">
              {formatTime(seconds)}
            </div>
            {/* Tombol Kontrol Timer FE */}
            <button 
              onClick={() => setIsTimerActive(!isTimerActive)}
              className={`mt-3 px-4 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider border transition-colors ${
                isTimerActive 
                  ? 'bg-red-600/10 border-red-500 text-red-500 hover:bg-red-600/20' 
                  : 'bg-[#CCFF00]/10 border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00]/20'
              }`}
            >
              {isTimerActive ? '⏸ Pause Clock' : '▶ Start Clock'}
            </button>
          </div>

          {/* Tim Tamu (Skor + Nama + Logo) */}
          <div className="flex flex-col items-center flex-1 text-center">
            {/* Shield Logo Team Placeholder */}
            <div className="w-16 h-16 bg-[#1A1F26] border-2 border-gray-600 rounded-2xl flex items-center justify-center font-black text-xl text-gray-300 mb-3 shadow-md">
              {awayTeam.logoLetter}
            </div>
            <h2 className="font-bold text-lg md:text-xl tracking-wide text-white mb-2">{awayTeam.name}</h2>
            <div className="text-6xl font-black text-white font-mono">{awayTeam.score}</div>
          </div>

        </div>

        {/* SECTION NAMA PENCETAK GOAL (DI BAWAH KONTROL SKOR) */}
        <div className="border-t border-gray-800/80 mt-8 pt-6 grid grid-cols-2 gap-6 text-xs font-mono text-gray-300">
        
        {/* Gol Tim Rumah (Rata Kiri) */}
        <div className="space-y-2 border-r border-gray-800/50 pr-4">
            {goalEvents.filter(e => e.team === 'home').map(event => (
            <div key={event.id} className="flex items-center justify-between bg-[#1A1F26]/40 px-3 py-1.5 rounded-lg group border border-transparent hover:border-red-500/30 transition-colors">
                <div className="flex items-center gap-2">
                <span className="text-[#FFA800]">⚽</span>
                <span className="font-medium text-white">{event.playerName}</span>
                <span className="text-[#CCFF00]">({event.minute}')</span>
                </div>
                {/* Tombol Anulir Gol */}
                <button 
                onClick={() => handleAnnulGoal(event.id)}
                className="text-gray-500 hover:text-red-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity ml-2 px-1"
                title="Anulir Gol"
                >
                ✕
                </button>
            </div>
            ))}
            {goalEvents.filter(e => e.team === 'home').length === 0 && (
            <p className="text-gray-600 italic text-[11px] pl-3">Belum ada gol terdaftar</p>
            )}
        </div>

        {/* Gol Tim Tamu (Rata Kanan) */}
        <div className="space-y-2 pl-4">
            {goalEvents.filter(e => e.team === 'away').map(event => (
            <div key={event.id} className="flex items-center justify-between bg-[#1A1F26]/40 px-3 py-1.5 rounded-lg group border border-transparent hover:border-red-500/30 transition-colors direction-rtl">
                {/* Tombol Anulir Gol */}
                <button 
                onClick={() => handleAnnulGoal(event.id)}
                className="text-gray-500 hover:text-red-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity mr-2 px-1"
                title="Anulir Gol"
                >
                ✕
                </button>
                <div className="flex items-center gap-2 justify-end w-full">
                <span className="text-[#CCFF00]">({event.minute}')</span>
                <span className="font-medium text-white">{event.playerName}</span>
                <span>⚽</span>
                </div>
            </div>
            ))}
            {goalEvents.filter(e => e.team === 'away').length === 0 && (
            <p className="text-gray-600 italic text-[11px] w-full text-right pr-3">Belum ada gol terdaftar</p>
            )}
        </div>

        </div>

      </div>

      {/* PANEL MANAGEMENT LINE-UP TIM */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mt-12">
        {/* LINE-UP HOME */}
        <div className="bg-[#14181F]/50 border border-gray-800 p-6 rounded-2xl">
          <div className="border-l-4 border-[#FFA800] pl-3 mb-6">
            <h3 className="font-bold text-lg text-[#FFA800] tracking-wide">LINE-UP {homeTeam.name}</h3>
          </div>
          <div className="space-y-3">
            {homeLineup.map((player) => (
              <div 
                key={player.id}
                onClick={() => setSelectedPlayer({ player, team: 'home' })}
                className="bg-[#1A1F26] hover:bg-[#232933] border border-gray-800/60 p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-[#0B0E11] text-gray-300 flex items-center justify-center font-mono font-bold text-sm border border-gray-700">
                    {player.number}
                  </span>
                  <span className="font-semibold text-white/90 text-sm">{player.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  {player.goals > 0 && <span className="bg-[#FFA800]/10 text-[#FFA800] px-2 py-0.5 rounded">⚽ {player.goals}</span>}
                  {player.assists > 0 && <span className="bg-[#CCFF00]/10 text-[#CCFF00] px-2 py-0.5 rounded">🎯 {player.assists}</span>}
                  {player.yellowCard && <span className="w-3 h-4 bg-yellow-400 rounded-sm inline-block"></span>}
                  {player.redCard && <span className="w-3 h-4 bg-red-600 rounded-sm inline-block"></span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LINE-UP AWAY */}
        <div className="bg-[#14181F]/50 border border-gray-800 p-6 rounded-2xl">
          <div className="border-l-4 border-white pl-3 mb-6">
            <h3 className="font-bold text-lg text-white tracking-wide">LINE-UP {awayTeam.name}</h3>
          </div>
          <div className="space-y-3">
            {awayLineup.map((player) => (
              <div 
                key={player.id}
                onClick={() => setSelectedPlayer({ player, team: 'away' })}
                className="bg-[#1A1F26] hover:bg-[#232933] border border-gray-800/60 p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-[#0B0E11] text-gray-300 flex items-center justify-center font-mono font-bold text-sm border border-gray-700">
                    {player.number}
                  </span>
                  <span className="font-semibold text-white/90 text-sm">{player.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  {player.goals > 0 && <span className="bg-[#FFA800]/10 text-[#FFA800] px-2 py-0.5 rounded">⚽ {player.goals}</span>}
                  {player.assists > 0 && <span className="bg-[#CCFF00]/10 text-[#CCFF00] px-2 py-0.5 rounded">🎯 {player.assists}</span>}
                  {player.yellowCard && <span className="w-3 h-4 bg-yellow-400 rounded-sm inline-block"></span>}
                  {player.redCard && <span className="w-3 h-4 bg-red-600 rounded-sm inline-block"></span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTEXTUAL MODAL MENU */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-4">
          <div className="bg-[#14181F] border border-gray-800 w-full max-w-md rounded-t-3xl md:rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
              <div>
                <span className="text-xs font-mono text-gray-400 uppercase">Mencatat Menit ke-{getCurrentMatchMinute()}</span>
                <h4 className="font-bold text-lg text-white mt-1">#{selectedPlayer.player.number} - {selectedPlayer.player.name}</h4>
              </div>
              <button onClick={() => setSelectedPlayer(null)} className="text-gray-400 hover:text-white font-mono">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handlePlayerAction('goal')} className="flex flex-col items-center justify-center p-5 bg-[#1A1F26] hover:bg-[#FFA800] text-white hover:text-[#0B0E11] border border-gray-800 rounded-2xl transition-all font-bold gap-2">
                <span className="text-2xl">⚽</span><span className="text-sm">Cetak Gol</span>
              </button>
              <button onClick={() => handlePlayerAction('assist')} className="flex flex-col items-center justify-center p-5 bg-[#1A1F26] hover:bg-[#CCFF00] text-white hover:text-[#0B0E11] border border-gray-800 rounded-2xl transition-all font-bold gap-2">
                <span className="text-2xl">🎯</span><span className="text-sm">Assist</span>
              </button>
              <button onClick={() => handlePlayerAction('yellow')} className="flex flex-col items-center justify-center p-5 bg-[#1A1F26] hover:bg-yellow-500/10 border border-yellow-500/30 rounded-2xl transition-all font-bold gap-2">
                <span className="w-5 h-7 bg-yellow-400 rounded-sm"></span><span className="text-sm text-yellow-400">Kartu Kuning</span>
              </button>
              <button onClick={() => handlePlayerAction('red')} className="flex flex-col items-center justify-center p-5 bg-[#1A1F26] hover:bg-red-600/10 border border-red-600/30 rounded-2xl transition-all font-bold gap-2">
                <span className="w-5 h-7 bg-red-600 rounded-sm"></span><span className="text-sm text-red-500">Kartu Merah</span>
              </button>
            </div>
            <button 
                onClick={() => setSelectedPlayer(null)}
                className="w-full text-center mt-6 py-3 border border-gray-800 rounded-xl font-medium text-sm text-gray-400 hover:text-white transition-colors"
              >
                Kembali ke Papan Skor
              </button>
          </div>
        </div>
      )}

      {/* SUBMIT BUTTON */}
      <div className="max-w-6xl mx-auto text-right mt-12 border-t border-gray-900 pt-6">
        <button className="w-full md:w-auto bg-[#CCFF00] text-[#0B0E11] font-black uppercase tracking-wider py-4 px-8 rounded-xl hover:bg-white transition-all text-sm shadow-md">
          Selesaikan Pertandingan ➔
        </button>
      </div>

    </div>
  );
}