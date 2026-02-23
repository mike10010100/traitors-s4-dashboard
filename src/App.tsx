import { useState, useEffect } from 'react';
import './App.css';
import { Ghost, Heart, Shield, Skull, Sword } from 'lucide-react';

interface Player {
  id: number;
  name: string;
  imageUrl: string;
  role: 'Faithful' | 'Traitor' | 'Unknown';
  status: 'Remaining' | 'Eliminated' | 'Murdered' | 'Banished';
}

const PEACOCK_BASE = 'https://www.peacocktv.com';
const STORAGE_KEY = 'traitors_s4_state';
const MODE_KEY = 'traitors_mode';

const initialPlayers: Player[] = [
  { id: 1, name: "Natalie Anderson", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00016.png", role: 'Unknown', status: 'Remaining' },
  { id: 2, name: "Yam Yam", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00024.png", role: 'Unknown', status: 'Remaining' },
  { id: 3, name: "Mark Ballas", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00013.png", role: 'Unknown', status: 'Remaining' },
  { id: 4, name: "Rob Cesternino", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00018.png", role: 'Unknown', status: 'Remaining' },
  { id: 5, name: "Stephen Colletti", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00021.png", role: 'Unknown', status: 'Remaining' },
  { id: 6, name: "Candiace Dillard Bassett", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00003.png", role: 'Unknown', status: 'Remaining' },
  { id: 7, name: "Ron Funches", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00020.png", role: 'Unknown', status: 'Remaining' },
  { id: 8, name: "Maura Higgins", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00004.png", role: 'Unknown', status: 'Remaining' },
  { id: 9, name: "Donna Kelce", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00007.png", role: 'Unknown', status: 'Remaining' },
  { id: 10, name: "Kristen Kish", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00012.png", role: 'Unknown', status: 'Remaining' },
  { id: 11, name: "Tara Lipinski", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00022.png", role: 'Unknown', status: 'Remaining' },
  { id: 12, name: "Dorinda Medley", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00008.png", role: 'Unknown', status: 'Remaining' },
  { id: 13, name: "Tiffany Mitchell", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00023.png", role: 'Unknown', status: 'Remaining' },
  { id: 14, name: "Monet X Change", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00015.png", role: 'Unknown', status: 'Remaining' },
  { id: 15, name: "Eric Nam", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00009.png", role: 'Unknown', status: 'Remaining' },
  { id: 16, name: "Michael Rapaport", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00014.png", role: 'Unknown', status: 'Remaining' },
  { id: 17, name: "Rob Rausch", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00019.png", role: 'Unknown', status: 'Remaining' },
  { id: 18, name: "Lisa Rinna", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00002.png", role: 'Unknown', status: 'Remaining' },
  { id: 19, name: "Caroline Stanbury", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00005.png", role: 'Unknown', status: 'Remaining' },
  { id: 20, name: "Ian Terry", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00010.png", role: 'Unknown', status: 'Remaining' },
  { id: 21, name: "Colton Underwood", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00006.png", role: 'Unknown', status: 'Remaining' },
  { id: 22, name: "Johnny Weir", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00011.png", role: 'Unknown', status: 'Remaining' },
  { id: 23, name: "Porsha Williams", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00017.png", role: 'Unknown', status: 'Remaining' },
];

const SYNC_DATA: Record<number, Partial<Player>[]> = {
  1: [], 
  2: [
    { id: 20, status: 'Murdered', role: 'Faithful' }, // Ian Terry
    { id: 23, status: 'Banished', role: 'Faithful' }, // Porsha Williams
  ],
  3: [
    { id: 4, status: 'Murdered', role: 'Faithful' }, // Rob Cesternino
    { id: 9, status: 'Banished', role: 'Traitor' }, // Donna Kelce
  ],
  4: [
    { id: 19, status: 'Murdered', role: 'Faithful' }, // Caroline Stanbury
    { id: 13, status: 'Banished', role: 'Faithful' }, // Tiffany Mitchell
  ],
  5: [
    { id: 14, status: 'Murdered', role: 'Faithful' }, // Monét X Change
    { id: 16, status: 'Banished', role: 'Faithful' }, // Michael Rapaport
  ],
  6: [
    { id: 2, status: 'Murdered', role: 'Faithful' }, // Yam Yam
    { id: 7, status: 'Banished', role: 'Faithful' }, // Ron Funches
  ],
  7: [
    { id: 21, status: 'Murdered', role: 'Faithful' }, // Colton Underwood
    { id: 18, status: 'Banished', role: 'Traitor' }, // Lisa Rinna
  ],
  8: [
    { id: 12, status: 'Murdered', role: 'Faithful' }, // Dorinda Medley
    { id: 6, status: 'Banished', role: 'Traitor' }, // Candiace Dillard
  ],
  9: [
    { id: 10, status: 'Murdered', role: 'Faithful' }, // Kristen Kish
    { id: 5, status: 'Banished', role: 'Faithful' }, // Stephen Colletti
  ],
  10: [
    { id: 1, status: 'Banished', role: 'Faithful' }, // Natalie Anderson
  ],
};

type PlayMode = 'Detective' | 'Audience';

function App() {
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialPlayers;
  });

  const [episode, setEpisode] = useState(() => {
    return Number(localStorage.getItem('traitors_episode') || 1);
  });

  const [playMode, setPlayMode] = useState<PlayMode>(() => {
    return (localStorage.getItem(MODE_KEY) as PlayMode) || 'Detective';
  });

  const [animatingId, setAnimatingId] = useState<{id: number, type: 'murder' | 'banish'} | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('traitors_episode', episode.toString());
  }, [episode]);

  useEffect(() => {
    localStorage.setItem(MODE_KEY, playMode);
  }, [playMode]);

  const syncToEpisode = (targetEpisode: number, force = false) => {
    if (playMode === 'Detective' && !force) return;

    const newPlayers = initialPlayers.map(p => {
      let playerState: Player = { ...p, status: 'Remaining', role: 'Unknown' };
      
      // Apply eliminations BEFORE target episode
      for (let i = 1; i < targetEpisode; i++) {
        const episodeEliminations = SYNC_DATA[i] || [];
        const match = episodeEliminations.find(e => e.id === p.id);
        if (match) {
          playerState.status = match.status || playerState.status;
          playerState.role = match.role || playerState.role;
        }
      }

      // Role Reveals in Audience Mode
      if (playMode === 'Audience') {
        // Episode 2: Initial Traitors revealed (Candiace, Rob R, Lisa)
        if (targetEpisode >= 2) {
          if ([6, 17, 18].includes(p.id)) playerState.role = 'Traitor';
          else if (playerState.status === 'Remaining') playerState.role = 'Faithful';
        }
        // Episode 4: Donna revealed (After Ep 3 banishment)
        if (targetEpisode >= 4 && p.id === 9) playerState.role = 'Traitor';
        // Episode 10: Eric Nam revealed (After Ep 9 recruitment)
        if (targetEpisode >= 10 && p.id === 15) playerState.role = 'Traitor';
      }

      return playerState;
    });

    setPlayers(newPlayers);
  };

  const handleEpisodeChange = (newEp: number) => {
    setEpisode(newEp);
    if (playMode === 'Audience') {
      syncToEpisode(newEp);
    } else {
      if (window.confirm(`Sync dashboard to start of Episode ${newEp}? (Switches to Audience Mode)`)) {
        setPlayMode('Audience');
        syncToEpisode(newEp, true);
      }
    }
  };

  const toggleMode = () => {
    const nextMode = playMode === 'Detective' ? 'Audience' : 'Detective';
    if (nextMode === 'Audience') {
      if (window.confirm("Switch to Audience Mode? This will sync the board to the current show state.")) {
        setPlayMode(nextMode);
        syncToEpisode(episode, true);
      }
    } else {
      setPlayMode(nextMode);
    }
  };

  const updateStatus = (id: number, status: Player['status']) => {
    if (status !== 'Remaining') {
      setAnimatingId({ id, type: status === 'Murdered' ? 'murder' : 'banish' });
      setTimeout(() => {
        setPlayers(prev => prev.map(p => p.id === id ? { ...p, status } : p));
        setAnimatingId(null);
      }, 1200);
    } else {
      setPlayers(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    }
  };

  const cycleRole = (id: number) => {
    setPlayers(players.map(p => {
      if (p.id === id) {
        const roles: Player['role'][] = ['Unknown', 'Faithful', 'Traitor'];
        const nextRole = roles[(roles.indexOf(p.role) + 1) % roles.length];
        return { ...p, role: nextRole };
      }
      return p;
    }));
  };

  const resetData = () => {
    if (window.confirm("Reset all tracking data to blank?")) {
      setPlayers(initialPlayers);
      setEpisode(1);
      setPlayMode('Detective');
    }
  };

  const remaining = players.filter(p => p.status === 'Remaining');
  const eliminated = players.filter(p => p.status !== 'Remaining');

  return (
    <div className="dashboard">
      <header>
        <div className="header-content">
          <div className="title-row">
            <h1>The Traitors S4</h1>
            <div className="mode-toggle" onClick={toggleMode}>
              <div className={`toggle-track ${playMode.toLowerCase()}`}>
                <div className="toggle-thumb"></div>
              </div>
              <span>{playMode.toUpperCase()} MODE</span>
            </div>
            <div className="episode-controls">
              <div className={`episode-selector ${playMode === 'Detective' ? 'disabled' : ''}`}>
                <label>EPISODE</label>
                <select 
                  value={episode} 
                  onChange={(e) => handleEpisodeChange(Number(e.target.value))}
                  disabled={playMode === 'Detective'}
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="how-to">
            <p>
              {playMode === 'Detective' 
                ? "DETECTIVE MODE: Track suspicions yourself! Mark roles manually and smash cards as you watch."
                : "AUDIENCE MODE: Follow the show! The board syncs automatically to each episode's starting state."}
            </p>
          </div>
          <div className="stats">
            <div className="stat-item"><Heart className="icon" /> {remaining.length} IN</div>
            <div className="stat-item"><Skull className="icon" /> {eliminated.length} OUT</div>
          </div>
        </div>
        <button className="reset-btn" onClick={resetData}>Clear All</button>
      </header>

      <main>
        <section className="player-grid">
          <h2>The Council Chamber</h2>
          <div className="grid">
            {remaining.map(player => (
              <div 
                key={player.id} 
                className={`player-card ${player.role.toLowerCase()} ${animatingId?.id === player.id ? animatingId.type : ''}`}
              >
                {animatingId?.id === player.id && animatingId.type === 'murder' && (
                  <div className="shatter-container">
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`shard s${i+1}`} 
                        style={{ backgroundImage: `url(${PEACOCK_BASE}${player.imageUrl})` }}
                      ></div>
                    ))}
                  </div>
                )}
                <div className="image-container">
                  <img src={`${PEACOCK_BASE}${player.imageUrl}`} alt={player.name} />
                  <div className="role-badge" title="Cycle Role: Unknown (Ghost), Faithful (Shield), Traitor (Sword)" onClick={() => cycleRole(player.id)}>
                    {player.role === 'Faithful' && <Shield className="role-icon faithful" />}
                    {player.role === 'Traitor' && <Sword className="role-icon traitor" />}
                    {player.role === 'Unknown' && <Ghost className="role-icon unknown" />}
                  </div>
                </div>
                <div className="player-info">
                  <h3>{player.name}</h3>
                  <div className="action-buttons">
                    <button className="status-btn murder" onClick={() => updateStatus(player.id, 'Murdered')}>Murder</button>
                    <button className="status-btn banish" onClick={() => updateStatus(player.id, 'Banished')}>Banish</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {eliminated.length > 0 && (
          <section className="player-grid eliminated">
            <h2>The Graveyard</h2>
            <div className="grid">
              {eliminated.map(player => (
                <div key={player.id} className={`player-card gray ${player.role.toLowerCase()}`}>
                  <div className="image-container">
                    <img src={`${PEACOCK_BASE}${player.imageUrl}`} alt={player.name} />
                    <div className={`status-overlay ${player.status.toLowerCase()}`}>{player.status.toUpperCase()}</div>
                    <div className="role-reveal">
                      {player.role === 'Traitor' ? 'TRAITOR' : 'FAITHFUL'}
                    </div>
                  </div>
                  <div className="player-info">
                    <h3>{player.name}</h3>
                    <button className="status-btn revive" onClick={() => updateStatus(player.id, 'Remaining')}>Revive</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
