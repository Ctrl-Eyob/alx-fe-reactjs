import axios from 'axios';

const GITHUB_URL = 'https://api.github.com/users';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_API_KEY;

export const fetchGitHubUser = async (username) => {
  const response = await axios.get(`${GITHUB_URL}/${username}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  });
  return response.data;
};
