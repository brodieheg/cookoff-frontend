import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Try a simple authenticated call to /live-results (any admin route works)
        const res = await fetch('https://brodiehegin.pythonanywhere.com/live-results', {
            headers: {
                Authorization: 'Basic ' + btoa(`${username}:${password}`)
            }
        });

        if (res.status === 200) {
            localStorage.setItem('auth', btoa(`${username}:${password}`));
            navigate('/');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <h2>Admin Login</h2>
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
        </div>
    );
}

export default Login;
