export const API = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://www.themoviedb.org/t/p';
export const IMAGE_URL = `${BASE_URL}/w220_and_h330_face`;
export const POSTER_URL = `${BASE_URL}/w300_and_h450_bestv2`;
export const BACKDROP_URL = `${BASE_URL}/w1920_and_h800_multi_faces`;
export const STREAMING_URL = `${BASE_URL}/original`;
export const CAST_URL = `${BASE_URL}/w138_and_h175_face`;

export const API_URL = 'https://api.themoviedb.org/3';
export const TRENDING_DAY = `${API_URL}/trending/all/day?api_key=${API}`;
export const TRENDING_WEEK = `${API_URL}/trending/all/week?api_key=${API}`;
export const POPULAR_ON_TV = `${API_URL}/tv/popular?api_key=${API}`;
export const IN_THEATERS = `${API_URL}/movie/now_playing?api_key=${API}`;

export const SEARCH_URL = `${API_URL}/search/multi?api_key=${API}&query=`
