import axios from 'axios';

export const fetchUserData = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};
// src/services/githubService.js
const BASE_URL = "https://api.github.com/search/users";

export async function searchUsers({ username, location, minRepos, page = 1 }) {
  let query = [];

  if (username) query.push(`${username} in:login`);
  if (location) query.push(`location:${location}`);
  if (minRepos) query.push(`repos:>=${minRepos}`);

  const queryString = query.join(" ");
  const url = `${BASE_URL}?q=${encodeURIComponent(queryString)}&page=${page}&per_page=10`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`GitHub API Error: ${res.status}`);
  }

  const data = await res.json();
  return data;
}
