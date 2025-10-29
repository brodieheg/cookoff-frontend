import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // 🎯 FIX APPLIED HERE: Changed e: React.FormEvent to e: React.FormEvent<HTMLFormElement>
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        const credentials = btoa(`${username}:${password}`);

        // Strategy: Use a protected admin route to verify credentials.
        const authTestUrl = 'https://brodiehegin.pythonanywhere.com/test-credentials';

        try {
            const res = await fetch(authTestUrl, {
                method: 'GET',
                headers: {
                    Authorization: `Basic ${credentials}`
                }
            });

            if (res.status !== 401) {
                // Credentials valid
                localStorage.setItem('auth', credentials);
                navigate('/');
            } else {
                // Credentials invalid
                setError('Invalid credentials');
            }
        } catch (err) {
            console.error('Login request failed:', err);
            setError('Could not connect to the server or verify credentials.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <h2>Admin Login</h2>
            {/* The onSubmit handler is correctly attached to the form element */}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                /><br /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br /><br />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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

export default Login;