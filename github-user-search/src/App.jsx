import { useState } from 'react';
import './App.css';
import Search from './components/Search';
import { fetchUserData } from './services/githubService';

function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSearch = async (username) => {
    setStatus('loading');
    try {
      const userData = await fetchUserData(username);
      setUser(userData);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setUser(null);
    }
  };

  return (
    <div className="app">
      <h1>GitHub User Search</h1>
      <Search onSearch={handleSearch} />

      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p style={{ color: 'red' }}>Looks like we can't find the user.</p>}
      {status === 'success' && user && (
        <div className="user-result">
          <img src={user.avatar_url} alt={user.login} width="100" />
          <h2>{user.name || user.login}</h2>
          <p>
            <a href={user.html_url} target="_blank" rel="noreferrer">Visit GitHub Profile</a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
