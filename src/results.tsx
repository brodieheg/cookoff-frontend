import React, { useEffect, useState } from 'react';

interface Entry {
    name: string;
    votes: number;
    namevotes?: number;
}

function Results() {
    const [results, setResults] = useState<Record<string, Entry[]>>({});
    const [locked, setLocked] = useState(false);
    const [winners, setWinners] = useState<Entry[]>([]);
    const [error, setError] = useState('');

    const fetchResults = async () => {
        try {
            const res = await fetch('https://brodiehegin.pythonanywhere.com/live-results');
            const data = await res.json();
            if (data.locked) {
                setLocked(true);
                setWinners(data.winners);
            } else {
                setLocked(false);
                setResults(data.results);
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
                Object.entries(results).map(([category, entries]) => (
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
                ))
            ) : (
                <div>
                    {winners.map((winner) => (
                        <p key={winner.name}>
                            🏅 {winner.name} — {winner.votes} votes
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Results;
