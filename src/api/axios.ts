import axios from "axios";

const tmdbToken = import.meta.env.VITE_TMDB_READ_TOKEN;

if (!tmdbToken) {
  throw new Error("Missing VITE_TMDB_READ_TOKEN");
}

const authorization = tmdbToken.startsWith("Bearer ")
  ? tmdbToken
  : `Bearer ${tmdbToken}`;

export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie",
  headers: {
    accept: "application/json",
    Authorization: authorization,
  },
  params: {
    language: "ko-KR",
    region: "KR",
  },
});
