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

const initialPlayers: Player[] = [
  { id: 1, name: "Natalie Anderson", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00016.png", role: 'Faithful', status: 'Banished' },
  { id: 2, name: "Yam Yam", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00024.png", role: 'Faithful', status: 'Murdered' },
  { id: 3, name: "Mark Ballas", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00013.png", role: 'Faithful', status: 'Remaining' },
  { id: 4, name: "Rob Cesternino", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00018.png", role: 'Faithful', status: 'Murdered' },
  { id: 5, name: "Stephen Colletti", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00021.png", role: 'Unknown', status: 'Eliminated' },
  { id: 6, name: "Candiace Dillard Bassett", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00003.png", role: 'Traitor', status: 'Banished' },
  { id: 7, name: "Ron Funches", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00020.png", role: 'Faithful', status: 'Banished' },
  { id: 8, name: "Maura Higgins", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00004.png", role: 'Faithful', status: 'Remaining' },
  { id: 9, name: "Donna Kelce", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00007.png", role: 'Traitor', status: 'Banished' },
  { id: 10, name: "Kristen Kish", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00012.png", role: 'Faithful', status: 'Murdered' },
  { id: 11, name: "Tara Lipinski", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00022.png", role: 'Faithful', status: 'Remaining' },
  { id: 12, name: "Dorinda Medley", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00008.png", role: 'Faithful', status: 'Murdered' },
  { id: 13, name: "Tiffany Mitchell", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00023.png", role: 'Faithful', status: 'Banished' },
  { id: 14, name: "Monet X Change", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00015.png", role: 'Faithful', status: 'Murdered' },
  { id: 15, name: "Eric Nam", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00009.png", role: 'Traitor', status: 'Remaining' },
  { id: 16, name: "Michael Rapaport", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00014.png", role: 'Faithful', status: 'Banished' },
  { id: 17, name: "Rob Rausch", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00019.png", role: 'Traitor', status: 'Remaining' },
  { id: 18, name: "Lisa Rinna", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00002.png", role: 'Traitor', status: 'Banished' },
  { id: 19, name: "Caroline Stanbury", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00005.png", role: 'Faithful', status: 'Murdered' },
  { id: 20, name: "Ian Terry", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00010.png", role: 'Faithful', status: 'Murdered' },
  { id: 21, name: "Colton Underwood", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00006.png", role: 'Faithful', status: 'Murdered' },
  { id: 22, name: "Johnny Weir", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00011.png", role: 'Faithful', status: 'Remaining' },
  { id: 23, name: "Porsha Williams", imageUrl: "/sites/peacock/files/styles/scale_600/public/2025/11/nup_209285_00017.png", role: 'Faithful', status: 'Banished' },
];

function App() {
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialPlayers;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  }, [players]);

  const cycleStatus = (id: number) => {
    setPlayers(players.map(p => {
      if (p.id === id) {
        const statuses: Player['status'][] = ['Remaining', 'Murdered', 'Banished'];
        const nextStatus = statuses[(statuses.indexOf(p.status) + 1) % statuses.length];
        return { ...p, status: nextStatus };
      }
      return p;
    }));
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
    if (window.confirm("Reset to current show standings? This will overwrite your local changes.")) {
      setPlayers(initialPlayers);
    }
  };

  const remaining = players.filter(p => p.status === 'Remaining');
  const eliminated = players.filter(p => p.status !== 'Remaining');

  return (
    <div className="dashboard">
      <header>
        <div className="header-content">
          <h1>The Traitors Season 4</h1>
          <div className="stats">
            <div className="stat-item"><Heart className="icon" /> {remaining.length} IN</div>
            <div className="stat-item"><Skull className="icon" /> {eliminated.length} OUT</div>
          </div>
        </div>
        <button className="reset-btn" onClick={resetData}>Sync to Show</button>
      </header>

      <main>
        <section className="player-grid">
          <h2>The Council Chamber</h2>
          <div className="grid">
            {remaining.map(player => (
              <div key={player.id} className={`player-card ${player.role.toLowerCase()}`}>
                <div className="image-container">
                  <img src={`${PEACOCK_BASE}${player.imageUrl}`} alt={player.name} />
                  <div className="role-badge" onClick={() => cycleRole(player.id)}>
                    {player.role === 'Faithful' && <Shield className="role-icon faithful" />}
                    {player.role === 'Traitor' && <Sword className="role-icon traitor" />}
                    {player.role === 'Unknown' && <Ghost className="role-icon unknown" />}
                  </div>
                </div>
                <div className="player-info">
                  <h3>{player.name}</h3>
                  <button className="status-btn" onClick={() => cycleStatus(player.id)}>Eliminate</button>
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
                    <div className="status-overlay">{player.status.toUpperCase()}</div>
                    <div className="role-reveal">
                      {player.role === 'Traitor' ? 'TRAITOR' : 'FAITHFUL'}
                    </div>
                  </div>
                  <div className="player-info">
                    <h3>{player.name}</h3>
                    <button className="status-btn" onClick={() => cycleStatus(player.id)}>Revive</button>
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
