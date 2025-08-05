import { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  // ✅ fetchUserData now defined inside this file
  const fetchUserData = async (username) => {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setStatus('loading');
    try {
      const data = await fetchUserData(input.trim());
      setUser(data);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setUser(null);
    }
  };

  return (
    <div className="search-component">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>Looks like we cant find the user.</p>}
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
};

export default Search;
