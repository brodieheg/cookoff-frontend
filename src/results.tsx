import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Entry {
    name: string;
    votes: number;
    namevotes?: number;
}

function Results() {
    const [results, setResults] = useState<Record<string, Entry[]>>({});
    const [locked, setLocked] = useState(false);
    const [winners, setWinners] = useState<Entry[]>([]);
    const [nameWinners, setNameWinners] = useState<Entry[]>([]); // 🆕 State for name winners
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchResults = async () => {
        try {
            const res = await fetch('https://brodiehegin.pythonanywhere.com/live-results');
            const data = await res.json();

            if (data.locked) {
                setLocked(true);
                setWinners(data.winners);
                setNameWinners(data.name_winners || []);
            } else {
                setLocked(false);
                setResults(data.results);
                setNameWinners(data.name_winners || []);
            }
        } catch (err) {
            setError('Failed to load results.');
        }
    };

    useEffect(() => {
        fetchResults();
        const interval = setInterval(fetchResults, 5000); // refresh every 5s for live updates
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>{locked ? 'Final Results' : 'Live Results'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!locked ? (
                <>
                    {Object.entries(results).map(([category, entries]) => (
                        <div key={category}>
                            <h3>{category}</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {entries.map((entry) => (
                                    <li key={entry.name}>
                                        {entry.name} — {entry.votes} votes ({entry.namevotes ?? 0} name votes)
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {nameWinners.length > 0 && (
                        <div style={{ marginTop: '20px' }}>
                            <h3>Name</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {nameWinners.map((entry) => (
                                    <li key={entry.name}>
                                        {entry.name} — {entry.votes} votes
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div>
                        {winners.map((winner) => (
                            <p key={winner.name}>
                                🏅 {winner.name} — {winner.votes} votes
                            </p>
                        ))}
                    </div>

                    {nameWinners.length > 0 && (
                        <div style={{ marginTop: '20px' }}>
                            <h3>Name Winner</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {nameWinners.map((entry) => (
                                    <li key={entry.name}>
                                        🏅 {entry.name} — {entry.votes} votes
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}

            {/* Back to Home Button */}
            <button
                onClick={() => navigate('/')}
                style={{
                    marginTop: '20px',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Back to Home
            </button>
        </div>
    );
}

export default Results;
