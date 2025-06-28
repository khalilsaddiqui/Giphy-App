import axios from 'axios';

const BASE_URL = 'https://api.giphy.com/v1/gifs';
const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

export const fetchTrendingGifs = (offset = 0, limit = 15) => {
  return axios.get(`${BASE_URL}/trending`, {
    params: {
      api_key: API_KEY,
      limit,
      offset,
    },
  });
};

export const fetchSearchGifs = (query: string, offset = 0, limit = 15) => {
  return axios.get(`${BASE_URL}/search`, {
    params: {
      api_key: API_KEY,
      q: query,
      limit,
      offset,
    },
  });
};

export const fetchGifById = (id: string) => {
  return axios.get(`${BASE_URL}/${id}`, {
    params: {
      api_key: API_KEY,
    },
  });
};
