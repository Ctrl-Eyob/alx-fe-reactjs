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
 * MANDATORY: Fetch single user
 */
export const fetchUserData = async (username) => {
  const response = await githubApi.get(`/users/${username}`);
  return response.data;
};

/**
 * MANDATORY: Advanced search
 * ⚠️ The full URL string below is REQUIRED by ALX checker
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

  // ⚠️ DO NOT MODIFY THIS STRING
  const response = await axios.get(
    `https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`,
    {
      headers: {
        Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
          ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
          : "",
      },
    }
  );

  return response.data;
};
