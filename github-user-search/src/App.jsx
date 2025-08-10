// src/App.jsx
import { useState } from "react";
import Search from "./components/Search";
import { searchUsers } from "./services/githubService";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (criteria) => {
    setLoading(true);
    setError("");
    try {
      const results = await searchUsers(criteria);
      const detailedUsers = await Promise.all(
        results.items.map(async (user) => {
          const res = await fetch(user.url);
          const detail = await res.json();
          return {
            id: user.id,
            login: user.login,
            avatar_url: user.avatar_url,
            html_url: user.html_url,
            location: detail.location || "N/A",
            public_repos: detail.public_repos,
          };
        })
      );
      setUsers(detailedUsers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Search onSearch={handleSearch} />
      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <div className="grid gap-4 mt-6 max-w-5xl mx-auto">
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
            <div className="flex-1">
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
    </div>
  );
}
