import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import { fetchGitHubUser } from './services/githubAPI';

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (username) => {
    try {
      setError('');
      const data = await fetchGitHubUser(username);
      setUser(data);
    } catch (err) {
      setUser(null);
      setError('User not found or API error');
    }
  };

  return (
    <div className="app">
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <UserCard user={user} />
    </div>
  );
}

export default App;
