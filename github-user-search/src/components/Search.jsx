import { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() && !location.trim() && !minRepos.trim()) return;

    setStatus('loading');
    try {
      // Build advanced search query
      let queryParts = [];
      if (username) queryParts.push(`${username} in:login`);
      if (location) queryParts.push(`location:${location}`);
      if (minRepos) queryParts.push(`repos:>=${minRepos}`);

      const query = queryParts.join(' ');
      const searchUrl = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=10`;

      const res = await axios.get(searchUrl);

      // Fetch extra details for each user (location, repos)
      const detailedUsers = await Promise.all(
        res.data.items.map(async (user) => {
          const detailRes = await axios.get(user.url);
          return {
            id: user.id,
            login: user.login,
            avatar_url: user.avatar_url,
            html_url: user.html_url,
            location: detailRes.data.location || 'N/A',
            public_repos: detailRes.data.public_repos,
          };
        })
      );

      setUsers(detailedUsers);
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setUsers([]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-lg"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <input
          type="number"
          placeholder="Min repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="w-32 border rounded-lg px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Loading / Error Messages */}
      {status === 'loading' && <p className="text-center mt-4">Loading...</p>}
      {status === 'error' && (
        <p className="text-red-500 text-center mt-4">Error fetching users.</p>
      )}

      {/* Results */}
      {status === 'success' && users.length > 0 && (
        <div className="grid gap-4 mt-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-lg shadow flex items-center gap-4"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-lg font-bold">{user.login}</h2>
                <p>📍 {user.location}</p>
                <p>📦 {user.public_repos} repos</p>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {status === 'success' && users.length === 0 && (
        <p className="text-center mt-4">No users found.</p>
      )}
    </div>
  );
};

export default Search;
