import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
      ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
      : "",
  },
});

/**
 * TASK 1 (MANDATORY)
 * Fetch a single GitHub user by username
 */
export const fetchUserData = async (username) => {
  const response = await githubApi.get(`/users/${username}`);
  return response.data;
};

/**
 * TASK 2 (ADVANCED SEARCH)
 * Search users with filters
 */
export const searchUsersAdvanced = async ({
  username = "",
  location = "",
  minRepos = "",
  page = 1,
}) => {
  let query = "";

  if (username) query += username;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const response = await githubApi.get(
    `/search/users?q=${query}&page=${page}&per_page=10`
  );

  return response.data;
};
