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
  scorerName: string;
  assistantName: string | null;
  minute: number;
  team: 'home' | 'away';
}

interface CardEvent {
  id: string;
  playerName: string;
  minute: number;
  team: 'home' | 'away';
  cardType: 'yellow' | 'red';
}

export default function IntegratedScoreboard() {
  const [homeTeam, setHomeTeam] = useState({ name: 'BINGUNG FC', score: 0, logoLetter: 'BFC' });
  const [awayTeam, setAwayTeam] = useState({ name: 'LUTHFI & FRIENDS JAYA', score: 0, logoLetter: 'LAF' });

  const [goalEvents, setGoalEvents] = useState<GoalEvent[]>([]);
  const [cardEvents, setCardEvents] = useState<CardEvent[]>([]);

  // Live Match Timer (FE Engine)
  const [seconds, setSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const [selectedPlayer, setSelectedPlayer] = useState<{ player: Player; team: 'home' | 'away' } | null>(null);
  const [modalStep, setModalStep] = useState<'select_action' | 'select_assist'>('select_action');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerActive) {
      interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    } else if (!isTimerActive && interval) {
      clearInterval(interval);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isTimerActive]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentMatchMinute = () => Math.floor(seconds / 60) + 1;

  // Mock Data Line-up
  const [homeLineup, setHomeLineup] = useState<Player[]>([
    { id: 1, number: 1, name: 'SDA (GK)', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 2, number: 3, name: 'ULIS', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 3, number: 101, name: 'DONS', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 4, number: 8, name: 'ZEKAI', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 5, number: 84, name: 'SUNNY', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 6, number: 88, name: 'INS', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 14, number: 12, name: 'MR', goals: 0, assists: 0, yellowCard: false, redCard: false },
  ]);

  const [awayLineup, setAwayLineup] = useState<Player[]>([
    { id: 7, number: 12, name: 'Rendra (GK)', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 8, number: 4, name: 'Hendra Saputra', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 9, number: 8, name: 'Gilang Ramadhan', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 10, number: 11, name: 'Irfan Bachdim', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 11, number: 20, name: 'Joko Susilo', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 12, number: 21, name: 'Arba', goals: 0, assists: 0, yellowCard: false, redCard: false },
    { id: 13, number: 22, name: 'LUTHFI IBNU', goals: 0, assists: 0, yellowCard: false, redCard: false },
  ]);

  // 1. Trigger Langkah Pertama di Modal (Gol / Kartu)
  const handleInitialAction = (action: 'trigger_goal' | 'yellow' | 'red') => {
    if (!selectedPlayer) return;

    const isHome = selectedPlayer.team === 'home';
    const lineup = isHome ? homeLineup : awayLineup;
    const setLineup = isHome ? setHomeLineup : setAwayLineup;

    if (action === 'trigger_goal') {
      setModalStep('select_assist');
      return;
    }

    // Eksekusi Logika Status Kartu
    const updatedLineup = lineup.map((p) => {
      if (p.id === selectedPlayer.player.id) {
        if (action === 'yellow') return { ...p, yellowCard: !p.yellowCard };
        if (action === 'red') return { ...p, redCard: !p.redCard };
      }
      return p;
    });

    setLineup(updatedLineup);
    setCardEvents(prev => [...prev, {
      id: Math.random().toString(),
      playerName: selectedPlayer.player.name,
      minute: getCurrentMatchMinute(),
      team: selectedPlayer.team,
      cardType: action
    }]);
    closeModal();
  };

  // 2. Finalisasi GOL + ASSIST
  const handleFinalizeGoal = (assistantPlayer: Player | null) => {
    if (!selectedPlayer) return;

    const isHome = selectedPlayer.team === 'home';
    const lineup = isHome ? homeLineup : awayLineup;
    const setLineup = isHome ? setHomeLineup : setAwayLineup;

    if (isHome) setHomeTeam(prev => ({ ...prev, score: prev.score + 1 }));
    else setAwayTeam(prev => ({ ...prev, score: prev.score + 1 }));

    const updatedLineup = lineup.map((p) => {
      if (p.id === selectedPlayer.player.id) return { ...p, goals: p.goals + 1 };
      if (assistantPlayer && p.id === assistantPlayer.id) return { ...p, assists: p.assists + 1 };
      return p;
    });

    setLineup(updatedLineup);
    setGoalEvents(prev => [...prev, {
      id: Math.random().toString(),
      scorerName: selectedPlayer.player.name,
      assistantName: assistantPlayer ? assistantPlayer.name : null,
      minute: getCurrentMatchMinute(),
      team: selectedPlayer.team
    }]);

    closeModal();
  };

  const closeModal = () => {
    setSelectedPlayer(null);
    setModalStep('select_action');
  };

  const handleAnnulGoal = (eventId: string) => {
    const event = goalEvents.find(e => e.id === eventId);
    if (!event) return;

    const isHome = event.team === 'home';
    const lineup = isHome ? homeLineup : awayLineup;
    const setLineup = isHome ? setHomeLineup : setAwayLineup;

    if (isHome) setHomeTeam(prev => ({ ...prev, score: Math.max(0, prev.score - 1) }));
    else setAwayTeam(prev => ({ ...prev, score: Math.max(0, prev.score - 1) }));

    const rolledBackLineup = lineup.map((p) => {
      if (p.name === event.scorerName) return { ...p, goals: Math.max(0, p.goals - 1) };
      if (event.assistantName && p.name === event.assistantName) return { ...p, assists: Math.max(0, p.assists - 1) };
      return p;
    });

    setLineup(rolledBackLineup);
    setGoalEvents(prev => prev.filter(e => e.id !== eventId));
  };

  // Fitur Tambahan: Menggugurkan Hukuman Kartu jika salah input
  const handleAnnulCard = (eventId: string) => {
    const event = cardEvents.find(e => e.id === eventId);
    if (!event) return;

    const isHome = event.team === 'home';
    const lineup = isHome ? homeLineup : awayLineup;
    const setLineup = isHome ? setHomeLineup : setAwayLineup;

    const rolledBackLineup = lineup.map((p) => {
      if (p.name === event.playerName) {
        if (event.cardType === 'yellow') return { ...p, yellowCard: false };
        if (event.cardType === 'red') return { ...p, redCard: false };
      }
      return p;
    });

    setLineup(rolledBackLineup);
    setCardEvents(prev => prev.filter(e => e.id !== eventId));
  };

  return (
    <div className="bg-[#0B0E11] min-h-screen text-white font-sans p-6 select-none">
      <div className="text-center mb-8">
        <span className="bg-[#CCFF00] text-[#0B0E11] font-mono font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">
          MATCH LOG ENGINE: LIVE UPDATING
        </span>
      </div>
      
      {/* PAPAN SKOR UTAMA */}
      <div className="bg-[#14181F] border border-gray-800 rounded-3xl p-8 max-w-4xl mx-auto shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          {/* Home */}
          <div className="flex flex-col items-center flex-1 text-center">
            <div className="w-16 h-16 bg-[#1A1F26] border-2 border-[#FFA800] rounded-2xl flex items-center justify-center font-black text-xl text-[#FFA800] mb-3">{homeTeam.logoLetter}</div>
            <h2 className="font-bold text-lg md:text-xl text-white mb-2">{homeTeam.name}</h2>
            <div className="text-6xl font-black text-[#FFA800] font-mono">{homeTeam.score}</div>
          </div>
          
          {/* Timer */}
          <div className="flex flex-col items-center justify-center px-6 border-y md:border-y-0 md:border-x border-gray-800 py-4 md:py-0 min-w-[200px]">
            <span className="font-mono text-gray-400 font-bold tracking-widest text-xs mb-1">{seconds >= 2700 ? 'BABAK II' : 'BABAK I'}</span>
            <div className="text-4xl font-black font-mono tracking-wider text-[#CCFF00] bg-[#0B0E11] px-4 py-2 rounded-xl border border-gray-800 min-w-[120px] text-center">{formatTime(seconds)}</div>
            <button onClick={() => setIsTimerActive(!isTimerActive)} className={`mt-3 px-4 py-1.5 rounded-lg text-xs font-mono font-bold uppercase border transition-colors ${isTimerActive ? 'bg-red-600/10 border-red-500 text-red-500' : 'bg-[#CCFF00]/10 border-[#CCFF00] text-[#CCFF00]'}`}>{isTimerActive ? '⏸ Pause' : '▶ Start'}</button>
          </div>

          {/* Away */}
          <div className="flex flex-col items-center flex-1 text-center">
            <div className="w-16 h-16 bg-[#1A1F26] border-2 border-gray-600 rounded-2xl flex items-center justify-center font-black text-xl text-gray-300 mb-3">{awayTeam.logoLetter}</div>
            <h2 className="font-bold text-lg md:text-xl text-white mb-2">{awayTeam.name}</h2>
            <div className="text-6xl font-black text-white font-mono">{awayTeam.score}</div>
          </div>
        </div>

        {/* DISPLAY TIMELINE UTAMA (DIPERBARUI: GOL & KARTU KINI MERANDING SEJAJAR) */}
        <div className="border-t border-gray-800/80 mt-8 pt-6 grid grid-cols-2 gap-6 text-xs font-mono text-gray-300">
          {/* Home Timeline Column */}
          <div className="space-y-2 border-r border-gray-800/50 pr-4">
            {/* Gol */}
            {goalEvents.filter(e => e.team === 'home').map(event => (
              <div key={event.id} className="flex items-center justify-between bg-[#1A1F26]/40 px-3 py-2 rounded-lg group border border-transparent hover:border-red-500/30">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[#FFA800]">⚽</span>
                  <span className="font-bold text-white">{event.scorerName}</span>
                  {event.assistantName && <span className="text-gray-400 text-[11px]">🎯 {event.assistantName}</span>}
                  <span className="text-[#CCFF00] font-bold">({event.minute})</span>
                </div>
                <button onClick={() => handleAnnulGoal(event.id)} className="text-gray-500 hover:text-red-500 font-bold opacity-0 group-hover:opacity-100 px-1">✕</button>
              </div>
            ))}
            {/* Kartu */}
            {cardEvents.filter(e => e.team === 'home').map(event => (
              <div key={event.id} className="flex items-center justify-between bg-[#1A1F26]/20 px-3 py-2 rounded-lg group border border-transparent hover:border-red-500/30">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-3.5 rounded-sm inline-block ${event.cardType === 'yellow' ? 'bg-yellow-400' : 'bg-red-600'}`}></span>
                  <span className="text-gray-300">{event.playerName}</span>
                  <span className="text-gray-500">({event.minute})</span>
                </div>
                <button onClick={() => handleAnnulCard(event.id)} className="text-gray-500 hover:text-red-500 font-bold opacity-0 group-hover:opacity-100 px-1">✕</button>
              </div>
            ))}
          </div>

          {/* Away Timeline Column */}
          <div className="space-y-2 pl-4">
            {/* Gol */}
            {goalEvents.filter(e => e.team === 'away').map(event => (
              <div key={event.id} className="flex items-center justify-between bg-[#1A1F26]/40 px-3 py-2 rounded-lg group border border-transparent hover:border-red-500/30">
                <button onClick={() => handleAnnulGoal(event.id)} className="text-gray-500 hover:text-red-500 font-bold opacity-0 group-hover:opacity-100 px-1">✕</button>
                <div className="flex items-center gap-1.5 flex-wrap justify-end w-full text-right">
                  <span className="text-[#CCFF00] font-bold">({event.minute})</span>
                  {event.assistantName && <span className="text-gray-400 text-[11px]">🎯 {event.assistantName}</span>}
                  <span className="font-bold text-white">{event.scorerName}</span>
                  <span className="text-[#FFA800]">⚽</span>
                </div>
              </div>
            ))}
            {/* Kartu */}
            {cardEvents.filter(e => e.team === 'away').map(event => (
              <div key={event.id} className="flex items-center justify-between bg-[#1A1F26]/20 px-3 py-2 rounded-lg group border border-transparent hover:border-red-500/30">
                <button onClick={() => handleAnnulCard(event.id)} className="text-gray-500 hover:text-red-500 font-bold opacity-0 group-hover:opacity-100 px-1">✕</button>
                <div className="flex items-center gap-1.5 justify-end w-full text-right">
                  <span className="text-gray-500">({event.minute})</span>
                  <span className="text-gray-300">{event.playerName}</span>
                  <span className={`w-2.5 h-3.5 rounded-sm inline-block ${event.cardType === 'yellow' ? 'bg-yellow-400' : 'bg-red-600'}`}></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RENDER LINE-UP UTAMA (FIXED: KARTU KINI DIRENDER DI SINI) */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mt-12">
        {/* Home UI */}
        <div className="bg-[#14181F]/50 border border-gray-800 p-6 rounded-2xl">
          <h3 className="font-bold text-sm text-[#FFA800] tracking-wide mb-4 uppercase">LINE-UP {homeTeam.name}</h3>
          <div className="space-y-2">
            {homeLineup.map(p => (
              <div key={p.id} onClick={() => { setSelectedPlayer({ player: p, team: 'home' }); setModalStep('select_action'); }} className="bg-[#1A1F26] hover:bg-[#232933] border border-gray-800/60 p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all active:scale-[0.99]">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-[#0B0E11] text-gray-300 flex items-center justify-center font-mono font-bold text-sm border border-gray-700">
                    {p.number}
                  </span>
                  <span className="font-semibold text-white/90 text-sm">{p.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  {p.goals > 0 && <span className="bg-[#FFA800]/10 text-[#FFA800] px-2 py-0.5 rounded">⚽ {p.goals}</span>}
                  {p.assists > 0 && <span className="bg-[#CCFF00]/10 text-[#CCFF00] px-2 py-0.5 rounded">🎯 {p.assists}</span>}
                  {p.yellowCard && <span className="w-3 h-4 bg-yellow-400 rounded-sm inline-block"></span>}
                  {p.redCard && <span className="w-3 h-4 bg-red-600 rounded-sm inline-block"></span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Away UI */}
        <div className="bg-[#14181F]/50 border border-gray-800 p-6 rounded-2xl">
          <h3 className="font-bold text-sm text-white tracking-wide mb-4 uppercase">LINE-UP {awayTeam.name}</h3>
          <div className="space-y-2">
            {awayLineup.map(p => (
              <div key={p.id} onClick={() => { setSelectedPlayer({ player: p, team: 'away' }); setModalStep('select_action'); }} className="bg-[#1A1F26] hover:bg-[#232933] border border-gray-800/60 p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all active:scale-[0.99]">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-[#0B0E11] text-gray-300 flex items-center justify-center font-mono font-bold text-sm border border-gray-700">
                    {p.number}
                  </span>
                  <span className="font-semibold text-white/90 text-sm">{p.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  {p.goals > 0 && <span className="bg-[#FFA800]/10 text-[#FFA800] px-2 py-0.5 rounded">⚽ {p.goals}</span>}
                  {p.assists > 0 && <span className="bg-[#CCFF00]/10 text-[#CCFF00] px-2 py-0.5 rounded">🎯 {p.assists}</span>}
                  {p.yellowCard && <span className="w-3 h-4 bg-yellow-400 rounded-sm inline-block"></span>}
                  {p.redCard && <span className="w-3 h-4 bg-red-600 rounded-sm inline-block"></span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MULTI-STEP MODAL ENGINE */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-4">
          <div className="bg-[#14181F] border border-gray-800 w-full max-w-md rounded-t-3xl md:rounded-3xl p-6 shadow-2xl">
            
            {/* LANGKAH 1: PILIH AKSI (FIXED: TOMBOL KARTU MERAH SEKARANG TERSEDIA) */}
            {modalStep === 'select_action' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-white">#{selectedPlayer.player.number} - {selectedPlayer.player.name}</h4>
                  <button onClick={closeModal} className="text-gray-400 font-mono">✕</button>
                </div>
                {/* Diubah menjadi grid-cols-3 agar tata letak tombol proporsional */}
                <div className="grid grid-cols-3 gap-3">
                  <button onClick={() => handleInitialAction('trigger_goal')} className="flex flex-col items-center justify-center p-4 bg-[#1A1F26] hover:bg-[#FFA800] text-white hover:text-[#0B0E11] border border-gray-800 rounded-xl font-bold gap-2 text-xs uppercase tracking-wider">
                    <span className="text-xl">⚽</span><span>Goal</span>
                  </button>
                  <button onClick={() => handleInitialAction('yellow')} className="flex flex-col items-center justify-center p-4 bg-[#1A1F26] hover:bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-xl font-bold gap-2 text-xs uppercase tracking-wider">
                    <span className="w-3.5 h-5 bg-yellow-400 rounded-sm shadow-sm"></span><span>Kuning</span>
                  </button>
                  {/* FIX: TOMBOL KARTU MERAH AKTIF */}
                  <button onClick={() => handleInitialAction('red')} className="flex flex-col items-center justify-center p-4 bg-[#1A1F26] hover:bg-red-600/10 border border-red-600/20 text-red-500 rounded-xl font-bold gap-2 text-xs uppercase tracking-wider">
                    <span className="w-3.5 h-5 bg-red-600 rounded-sm shadow-sm"></span><span>Merah</span>
                  </button>
                </div>
              </div>
            )}

            {/* LANGKAH 2: PILIH ASSIST */}
            {modalStep === 'select_assist' && (
              <div>
                <div className="mb-4">
                  <span className="text-[11px] font-mono text-[#CCFF00] uppercase tracking-widest block mb-1">Langkah 2: Validasi Assist</span>
                  <h4 className="font-bold text-white">Siapa yang memberi umpan kepada <span className="text-[#FFA800]">{selectedPlayer.player.name}</span>?</h4>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1 my-4">
                  {(selectedPlayer.team === 'home' ? homeLineup : awayLineup)
                    .filter(p => p.id !== selectedPlayer.player.id)
                    .map(teammate => (
                      <button key={teammate.id} onClick={() => handleFinalizeGoal(teammate)} className="w-full text-left bg-[#1A1F26] hover:bg-[#CCFF00] text-white hover:text-[#0B0E11] p-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-3">
                        <span className="w-6 h-6 rounded bg-[#0B0E11]/40 text-xs font-mono flex items-center justify-center font-bold">{teammate.number}</span>
                        {teammate.name}
                      </button>
                    ))}
                </div>
                <button onClick={() => handleFinalizeGoal(null)} className="w-full bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider border border-gray-800">
                  🚫 Gol Mandiri / Tanpa Assist
                </button>
              </div>
            )}

            <button onClick={closeModal} className="w-full text-center mt-6 py-2.5 border border-gray-800 rounded-xl font-medium text-xs text-gray-400 hover:text-white transition-colors uppercase tracking-wider">
              Kembali ke Papan Skor
            </button>

          </div>
        </div>
      )}

    </div>
  );
}