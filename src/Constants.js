export const API = '982ce394b5d4c2a27b5dc0e30774b674';
const BASE_URL = 'https://www.themoviedb.org/t/p';
export const IMAGE_URL = `${BASE_URL}/w220_and_h330_face`;
export const POSTER_URL = `${BASE_URL}/w300_and_h450_bestv2`;
export const BACKDROP_URL = `${BASE_URL}/w1920_and_h800_multi_faces`;
export const STREAMING_URL = `${BASE_URL}/original`;
export const CAST_URL = `${BASE_URL}/w138_and_h175_face`;
export const NETWORK_URL = `${BASE_URL}/h30`;
export const SEASON_POSTER_URL = `${BASE_URL}/w130_and_h195_bestv2`;
export const RECOMMENDATIONS_BACKDROP_URL = `${BASE_URL}/w250_and_h141_face`;
export const SOCIAL_URL = `${BASE_URL}/w64_and_h64_face`;

// Movie API endpoints
export const API_URL = 'https://api.themoviedb.org/3';
export const TRENDING_DAY = `${API_URL}/trending/all/day?api_key=${API}`;
export const TRENDING_WEEK = `${API_URL}/trending/all/week?api_key=${API}`;
export const IN_THEATERS = `${API_URL}/movie/now_playing?api_key=${API}`;
export const POPULAR_MOVIES = `${API_URL}/movie/popular?api_key=${API}`;
export const UPCOMING_MOVIES = `${API_URL}/movie/upcoming?api_key=${API}`;
export const TOP_RATED_MOVIES = `${API_URL}/movie/top_rated?api_key=${API}`;

// TV API endpoints
export const POPULAR_ON_TV = `${API_URL}/tv/popular?api_key=${API}`;
export const TOP_RATED_ON_TV = `${API_URL}/tv/top_rated?api_key=${API}`;
export const AIRING_TODAY_ON_TV = `${API_URL}/tv/airing_today?api_key=${API}`;
export const TV_ON_THE_AIR = `${API_URL}/tv/on_the_air?api_key=${API}`;

export const SEARCH_URL = `${API_URL}/search/multi?api_key=${API}&query=`;
