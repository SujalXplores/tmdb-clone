export const API = process.env.REACT_APP_API_KEY;
export const IMAGE_URL = 'https://www.themoviedb.org/t/p/w220_and_h330_face';
export const POSTER_URL = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2';
export const BACKDROP_URL = 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces';
export const STREAMING_URL = 'https://www.themoviedb.org/t/p/original';

export const BASE_URL = 'https://api.themoviedb.org/3';
export const TRENDING_DAY = `${BASE_URL}/trending/all/day?api_key=${API}`;
export const TRENDING_WEEK = `${BASE_URL}/trending/all/week?api_key=${API}`;
export const POPULAR_ON_TV = `${BASE_URL}/tv/popular?api_key=${API}`;
export const IN_THEATERS = `${BASE_URL}/movie/now_playing?api_key=${API}`;
export const SEARCH_URL = `${BASE_URL}/search/multi?api_key=${API}&query=`
