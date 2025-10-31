import axios from "axios";

const UNSPLASH_BASE = "https://api.unsplash.com";
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const api = axios.create({
  baseURL: UNSPLASH_BASE,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export const getRandomImages = async (count = 4) => {
  const res = await api.get(`/photos/random?count=${count}`);
  return res.data;
};

export const searchImages = async (query: string, page = 1, perPage = 8) => {
  const res = await api.get(`/search/photos`, {
    params: { query, page, per_page: perPage },
  });
  return res.data;
};
