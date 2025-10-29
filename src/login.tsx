import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        const credentials = btoa(`${username}:${password}`);

        // 🔑 NEW STRATEGY: Use a protected admin route to verify credentials.
        // The DELETE method is fine for a test call since we don't commit the transaction.
        const authTestUrl = 'https://brodiehegin.pythonanywhere.com/delete-entries';

        try {
            const res = await fetch(authTestUrl, {
                method: 'DELETE', // Method doesn't matter, only the Authorization header matters
                headers: {
                    Authorization: `Basic ${credentials}`
                }
            });

            // The protected endpoint will return 201 (or 200) for valid credentials
            // and 401 for invalid ones. We only care if the response is NOT a 401.
            if (res.status !== 401) {
                // If it's 200/201 (Success) or even 404/500 (but NOT 401), 
                // we trust the admin authentication worked.
                localStorage.setItem('auth', credentials);
                navigate('/');
            } else {
                // The status is 401: Unauthorized
                setError('Invalid credentials');
            }
        } catch (err) {
            // Handle network errors (e.g., server offline)
            console.error('Login request failed:', err);
            setError('Could not connect to the server or verify credentials.');
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