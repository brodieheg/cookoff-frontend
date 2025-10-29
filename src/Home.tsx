import { useState } from 'react';
import { useNavigate } from "react-router-dom";
// NOTE: Replaced the local asset import with a public URL to fix the compilation error.
const CHILI_IMAGE_URL = 'https://placehold.co/200x200/f6ad55/FFFFFF?text=CHILI';
// Assuming the global CSS (App.css) provides default button styles

const baseUrl = 'https://brodiehegin.pythonanywhere.com';

function Home() {
  const navigate = useNavigate();
  const [lockMessage, setLockMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  // Use the same type of event object as the original code
  const routeChange = (event: any) => {
    const clickedElement = event.target;
    const elementId = clickedElement.id;
    navigate(`/${elementId}`);
  };

  // Admin check based on local storage
  const isAdmin = !!localStorage.getItem('auth');

  // Existing function for locking results
  const lockResults = async () => {
    const auth = localStorage.getItem('auth');
    if (!auth) return;

    setLockMessage('Locking...');
    setDeleteMessage(''); // Clear any delete messages

    try {
      const res = await fetch(`${baseUrl}/lock-results`, {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + auth,
        },
      });

      if (res.ok) {
        setLockMessage('Results have been locked! 🔒');
      } else {
        setLockMessage('Failed to lock results. Check server logs.');
      }
    } catch (error) {
      console.error('Locking error:', error);
      setLockMessage('Error communicating with the API.');
    }
  };

  // New function for deleting all entries
  const deleteAllEntries = async () => {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      setDeleteMessage('Not authorized to delete.');
      setIsConfirmingDelete(false);
      return;
    }

    setDeleteMessage('Deleting...');
    setIsConfirmingDelete(false); // Reset confirmation state immediately

    try {
      const res = await fetch(`${baseUrl}/delete-entries`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Basic ' + auth,
        },
      });

      if (res.ok) {
        setDeleteMessage('✅ All entries and votes have been successfully deleted!');
      } else {
        const errorText = await res.text();
        setDeleteMessage(`❌ Failed to delete data: ${res.status} - ${errorText.substring(0, 100)}`);
      }
    } catch (error) {
      console.error('Deletion error:', error);
      setDeleteMessage('❌ An unexpected error occurred during deletion.');
    }
  };

  // Removed adminButtonStyle helper object to simplify code

  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={CHILI_IMAGE_URL}
        alt="Chili"
        style={{ width: '200px', borderRadius: '8px', marginBottom: '10px' }}
      />
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
        <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #ccc' }}>
          <h4 style={{ color: '#c53030', marginBottom: '10px', fontSize: '1rem' }}>Admin Actions</h4>

          {/* Lock Results Button */}
          <button
            onClick={lockResults}
            style={{
              marginBottom: lockMessage ? '0' : '5px',
              backgroundColor: '#e53e3e', // Red
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Lock Results
          </button>
          {lockMessage && <p style={{ fontSize: '0.8rem', color: lockMessage.startsWith('F') ? '#c53030' : '#38a169', margin: '5px 0 10px 0' }}>{lockMessage}</p>}


          {/* Delete All Data UI */}
          {!isConfirmingDelete ? (
            <button
              onClick={() => {
                setDeleteMessage('');
                setIsConfirmingDelete(true);
              }}
              style={{
                marginBottom: '5px',
                backgroundColor: '#9b2c2c', // Darker Red
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                marginLeft: '10px'
              }}
            >
              Delete All Data
            </button>
          ) : (
            <div style={{
              padding: '10px',
              border: '1px solid #c53030',
              borderRadius: '4px',
              backgroundColor: '#fef2f2',
              marginTop: '10px',
              marginBottom: '5px',
            }}>
              <p style={{ margin: '0 0 10px 0', color: '#9b2c2c', fontWeight: 'bold', fontSize: '0.9rem' }}>
                ARE YOU SURE? (Irreversible)
              </p>
              <button
                onClick={deleteAllEntries}
                style={{
                  backgroundColor: '#c53030', // Final confirmation red
                  color: 'white',
                  marginRight: '10px',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                YES, DELETE
              </button>
              <button
                onClick={() => {
                  setIsConfirmingDelete(false);
                  setDeleteMessage('Deletion cancelled.');
                }}
                style={{
                  backgroundColor: '#cbd5e0',
                  color: '#2d3748',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          )}
          {deleteMessage && <p style={{ fontSize: '0.8rem', color: deleteMessage.startsWith('❌') ? '#c53030' : '#38a169', margin: '5px 0' }}>{deleteMessage}</p>}
        </div>
      )}
    </div>
  );
}

export default Home;
