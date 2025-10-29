import chili from './assets/download (1).jpeg';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';

function Home() {
  const navigate = useNavigate();
  const [lockMessage, setLockMessage] = useState('');

  const routeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const clickedElement = event.target as HTMLButtonElement;
    const elementId = clickedElement.id;
    navigate(`/${elementId}`);
  };

  const isAdmin = !!localStorage.getItem('auth');

  const lockResults = async () => {
    const auth = localStorage.getItem('auth');
    if (!auth) return;

    const res = await fetch('https://brodiehegin.pythonanywhere.com/lock-results', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + auth,
      },
    });

    if (res.ok) {
      setLockMessage('Results have been locked!');
    } else {
      setLockMessage('Failed to lock results.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <img src={chili} alt="Chili" style={{ width: '200px', borderRadius: '8px' }} />
      <br />
      <button onClick={routeChange} id="vote" style={{ marginBottom: '5px' }}>
        Vote
      </button><br />
      <button onClick={routeChange} id="submit" style={{ marginBottom: '5px' }}>
        Submit an Entry
      </button><br />
      <button onClick={routeChange} id="results" style={{ marginBottom: '5px' }}>
        Get Results
      </button><br />
      {!isAdmin && (
        <button onClick={() => navigate('/login')} style={{ marginBottom: '5px' }}>
          Admin Login
        </button>
      )}
      {isAdmin && (
        <>
          <button onClick={lockResults} style={{ marginBottom: '5px', backgroundColor: 'red', color: 'white' }}>
            Lock Results
          </button>
          {lockMessage && <p>{lockMessage}</p>}
        </>
      )}
    </div>
  );
}

export default Home;
