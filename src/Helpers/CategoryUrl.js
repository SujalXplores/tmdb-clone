import {
  MOVIE_POPULAR,
  MOVIE_NOW_PLAYING,
  MOVIE_TOP_RATED,
  MOVIE_UPCOMING,
  TV_AIRING_TODAY,
  TV_ON_THE_AIR,
  TV_TOP_RATED,
  TV_POPULAR,
} from './DefaultCategories';

export const categoryUrl = (type, category) => {
  console.warn('INSIDE', type, category);
  if (type === 'movie') {
    switch (category) {
      case 'now-playing':
        return {
          data: MOVIE_NOW_PLAYING,
          title: 'Now Playing Movies',
        };
      case 'upcoming':
        return {
          data: MOVIE_UPCOMING,
          title: 'Upcoming Movies',
        };
      case 'top-rated':
        return {
          data: MOVIE_TOP_RATED,
          title: 'Top Rated Movies',
        };
      default:
        return {
          data: MOVIE_POPULAR,
          title: 'Popular Movies',
        };
    }
  }
  if (type === 'tv') {
    switch (category) {
      case 'airing-today':
        return {
          data: TV_AIRING_TODAY,
          title: 'TV Shows Airing Today',
        };
      case 'on-the-air':
        return {
          data: TV_ON_THE_AIR,
          title: 'Currently Airing TV Shows',
        };
      case 'top-rated':
        return {
          data: TV_TOP_RATED,
          title: 'Top Rated TV Shows',
        };
      default:
        return {
          data: TV_POPULAR,
          title: 'Popular TV Shows',
        };
    }
  }

  return {
    data: MOVIE_POPULAR,
    title: 'Popular Movies',
  };
};
