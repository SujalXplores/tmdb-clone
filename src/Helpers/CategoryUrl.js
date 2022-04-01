import {
  AIRING_TODAY_ON_TV,
  POPULAR_MOVIES,
  POPULAR_ON_TV,
  TOP_RATED_ON_TV,
  TV_ON_THE_AIR,
} from '../Constants';

export const categoryUrl = (type, category) => {
  const dateAfter6Month = () => {
    const date = new Date();
    const firstDate = new Date(date.setMonth(date.getMonth() + 6));
    return firstDate.toISOString().split('T')[0];
  };

  // function to get the date before 37 days in the past from today in format yyyy-mm-dd
  const getDateBefore37Days = () => {
    const date = new Date();
    const firstDate = new Date(date.setDate(date.getDate() - 37));
    return firstDate.toISOString().split('T')[0];
  };

  const getDateAfter5Days = () => {
    const date = new Date();
    const firstDate = new Date(date.setDate(date.getDate() + 5));
    return firstDate.toISOString().split('T')[0];
  };

  const getFutureDates = () => {
    const today = new Date();
    const dd = String(today.getDate() + 5).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const firstDate = `${yyyy}-${mm}-${dd}`;

    const dd2 = String(today.getDate() + 26).padStart(2, '0');
    const mm2 = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy2 = today.getFullYear();
    const secondDate = `${yyyy2}-${mm2}-${dd2}`;

    return [firstDate, secondDate];
  };

  const [firstDate, secondDate] = getFutureDates();

  if (type === 'movie') {
    switch (category) {
      case 'now-playing':
        return {
          data: {
            air_date: {
              lte: dateAfter6Month(),
            },
            release_date: {
              gte: getDateBefore37Days(),
              lte: getDateAfter5Days(),
            },
            sort_by: 'popularity.desc',
            vote_average: {
              gte: '0',
              lte: '10',
            },
            with_release_type: '3',
            with_runtime: {
              gte: '0',
              lte: '400',
            },
            ott_region: 'IN',
            show_me: 0,
          },
          title: 'Now Playing Movies',
        };
      case 'upcoming':
        return {
          data: {
            air_date: {
              lte: dateAfter6Month(),
            },
            release_date: {
              gte: firstDate,
              lte: secondDate,
            },
            sort_by: 'popularity.desc',
            vote_average: {
              gte: '0',
              lte: '10',
            },
            with_release_type: '3',
            with_runtime: {
              gte: '0',
              lte: '400',
            },
            ott_region: 'IN',
            show_me: 0,
          },
          title: 'Upcoming Movies',
        };
      case 'top-rated':
        return {
          data: {
            air_date: {
              lte: dateAfter6Month(),
            },
            release_date: {
              lte: dateAfter6Month(),
            },
            sort_by: 'vote_average.desc',
            vote_average: {
              gte: '0',
              lte: '10',
            },
            with_runtime: {
              gte: '0',
              lte: '400',
            },
            vote_count: {
              gte: '300',
            },
            ott_region: 'IN',
            show_me: 0,
          },
          title: 'Top Rated Movies',
        };
      default:
        return {
          data: {
            air_date: {
              lte: dateAfter6Month(),
            },
            release_date: {
              lte: dateAfter6Month(),
            },
            sort_by: 'popularity.desc',
            vote_average: {
              gte: '0',
              lte: '10',
            },
            with_runtime: {
              gte: '0',
              lte: '400',
            },
            ott_region: 'IN',
            show_me: 0,
          },
          title: 'Popular Movies',
        };
    }
  }
  if (type === 'tv') {
    switch (category) {
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
