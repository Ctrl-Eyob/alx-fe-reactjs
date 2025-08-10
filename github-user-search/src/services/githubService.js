import axios from 'axios';

const BASE_URL = 'https://api.github.com/search/users';

export async function searchUsers({ username, location, minRepos, page = 1 }) {
  const queryParts = [];

  if (username) queryParts.push(`${username} in:login`);
  if (location) queryParts.push(`location:${location}`);
  if (minRepos) queryParts.push(`repos:>=${minRepos}`);

  const query = queryParts.join(' ');
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&page=${page}&per_page=10`;

  const response = await axios.get(url);
  return response.data;
}
