import { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState(""); // ✅ REQUIRED STRING
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUsers([]);

    try {
      const data = await fetchUserData(username);
      setUsers([data]); // force array for map
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
          required
        />

        {/* ✅ REQUIRED location input */}
        <input
          type="text"
          name="location"
          placeholder="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      <div className="mt-6">
        {loading && <p>Loading...</p>}

        {error && (
          <p className="text-red-500">
            Looks like we cant find the user
          </p>
        )}

        {/* ✅ REQUIRED map */}
        {users.map((user) => (
          <div key={user.id} className="border rounded p-4 text-center">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-24 h-24 mx-auto rounded-full"
            />
            <h2 className="mt-2 font-bold">
              {user.name || user.login}
            </h2>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
