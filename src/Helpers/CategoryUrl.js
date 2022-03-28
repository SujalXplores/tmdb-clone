import {
  AIRING_TODAY_ON_TV,
  IN_THEATERS,
  POPULAR_MOVIES,
  POPULAR_ON_TV,
  TOP_RATED_MOVIES,
  TOP_RATED_ON_TV,
  TV_ON_THE_AIR,
  UPCOMING_MOVIES,
} from '../Constants';

export const categoryUrl = (type, category) => {
  if(type === 'movie') {
    switch (category) {
      case 'popular':
        return { url: POPULAR_MOVIES, title: 'Popular Movies' };
      case 'top-rated':
        return { url: TOP_RATED_MOVIES, title: 'Top Rated Movies' };
      case 'upcoming':
        return { url: UPCOMING_MOVIES, title: 'Upcoming Movies' };
      case 'now-playing':
        return { url: IN_THEATERS, title: 'Now Playing Movies' };
      default:
        return { url: POPULAR_MOVIES, title: 'Popular Movies' };
    }
  }
  if(type === 'tv') {
    switch (category) {
      case 'popular':
        return { url: POPULAR_ON_TV, title: 'Popular TV Shows' };
      case 'top-rated':
        return { url: TOP_RATED_ON_TV, title: 'Top Rated TV Shows' };
      case 'airing-today':
        return { url: AIRING_TODAY_ON_TV, title: 'TV Shows Airing Today' };
      case 'on-the-air':
        return { url: TV_ON_THE_AIR, title: 'Currently Airing TV Shows' };
      default:
        return { url: POPULAR_ON_TV, title: 'Popular TV Shows' };
    }
  }
  return { url: POPULAR_MOVIES, title: 'Popular Movies' };
};
