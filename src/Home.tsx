// Fixing the asset import by using a placeholder URL since external file paths cannot be resolved.
import chili from './assets/download (1).jpeg';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [lockMessage, setLockMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [confirmingDelete, setConfirmingDelete] = useState(false);

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

  const unlockResults = async () => {
    const auth = localStorage.getItem('auth');
    if (!auth) return;

    const res = await fetch('https://brodiehegin.pythonanywhere.com/unlock-results', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + auth,
      },
    });

    if (res.ok) {
      setLockMessage('Results have been unlocked!');
    } else {
      setLockMessage('Failed to unlock results.');
    }
  };

  const deleteAllData = async () => {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      setDeleteMessage('Authentication token missing.');
      return;
    }

    setDeleteMessage('Attempting to delete all data...');
    setConfirmingDelete(false);

    try {
      const res = await fetch('https://brodiehegin.pythonanywhere.com/delete-entries', {
        method: 'DELETE',
        headers: {
          Authorization: 'Basic ' + auth,
        },
      });

      if (res.ok) {
        setDeleteMessage('All data entries have been successfully deleted!');
      } else {
        setDeleteMessage('Failed to delete data. Check server logs.');
      }
    } catch (error) {
      setDeleteMessage('Network error occurred during deletion.');
      console.error('Delete request failed:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/');
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
          {/* Lock Results */}
          <button
            onClick={lockResults}
            style={{ marginBottom: '5px', backgroundColor: 'red', color: 'white', marginRight: '10px' }}
          >
            Lock Results
          </button>

          {/* Unlock Results */}
          <button
            onClick={unlockResults}
            style={{ marginBottom: '5px', backgroundColor: 'green', color: 'white', marginRight: '10px' }}
          >
            Unlock Results
          </button><br />

          {lockMessage && <p>{lockMessage}</p>}

          {/* Delete All Data */}
          {!confirmingDelete ? (
            <button
              onClick={() => { setConfirmingDelete(true); setDeleteMessage(''); setLockMessage(''); }}
              style={{ marginBottom: '5px', backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
            >
              Delete All Data
            </button>
          ) : (
            <div
              style={{
                marginBottom: '5px',
                border: '1px solid red',
                padding: '5px',
                borderRadius: '5px',
                display: 'inline-block',
                marginLeft: '10px'
              }}
            >
              <span
                style={{
                  marginRight: '10px',
                  color: 'red',
                  fontWeight: 'bold'
                }}
              >
                ARE YOU SURE?
              </span>
              <button
                onClick={deleteAllData}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  marginRight: '5px'
                }}
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirmingDelete(false)}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '3px'
                }}
              >
                Cancel
              </button>
            </div>
          )}

          {deleteMessage && (
            <p
              style={{
                color:
                  deleteMessage.includes('Failed') ||
                    deleteMessage.includes('Network')
                    ? 'red'
                    : 'green'
              }}
            >
              {deleteMessage}
            </p>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{
              marginTop: '10px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '5px 15px',
              borderRadius: '5px'
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Home;
