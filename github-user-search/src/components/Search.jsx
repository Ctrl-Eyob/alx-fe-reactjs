import { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const buildQuery = () => {
    let queryParts = [];
    if (username) queryParts.push(`${username} in:login`);
    if (location) queryParts.push(`location:${location}`);
    if (minRepos) queryParts.push(`repos:>=${minRepos}`);
    return queryParts.join(' ');
  };

  const fetchUsers = async (pageToFetch = 1, append = false) => {
    const query = buildQuery();
    if (!query) return;

    setStatus('loading');
    try {
      const searchUrl = `https://api.github.com/search/users?q=${encodeURIComponent(
        query
      )}&per_page=10&page=${pageToFetch}`;

      const res = await axios.get(searchUrl);

      // Fetch detailed info for each user
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

      setUsers((prevUsers) =>
        append ? [...prevUsers, ...detailedUsers] : detailedUsers
      );
      setHasMore(res.data.total_count > pageToFetch * 10);
      setStatus('success');
      setPage(pageToFetch);
    } catch (error) {
      console.error(error);
      setStatus('error');
      if (!append) setUsers([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUsers(1, false); // new search resets to page 1, no append
  };

  const loadMore = () => {
    fetchUsers(page + 1, true);
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
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

      {status === 'loading' && <p className="text-center mt-4">Loading...</p>}
      {status === 'error' && (
        <p className="text-red-500 text-center mt-4">Error fetching users.</p>
      )}

      {status === 'success' && users.length > 0 && (
        <>
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
          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMore}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}

      {status === 'success' && users.length === 0 && (
        <p className="text-center mt-4">No users found.</p>
      )}
    </div>
  );
};

export default Search;
