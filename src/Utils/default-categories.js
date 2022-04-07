import {
  dateAfter6Month,
  getDateAfter5Days,
  getDateAfterWeek,
  getDateBefore37Days,
  getFutureDates,
  todaysDate,
} from '../Helpers/ConvertDate';

const [firstDate, secondDate] = getFutureDates();

export const MOVIE_NOW_PLAYING = {
  air_date: {
    lte: dateAfter6Month(),
  },
  release_date: {
    gte: getDateBefore37Days(),
    lte: getDateAfter5Days(),
  },
  sort_by: 'popularity.desc',
  vote_average: {
    gte: 0,
    lte: 10,
  },
  vote_count: {
    gte: 0,
  },
  with_release_type: 3,
  with_runtime: {
    gte: 0,
    lte: 400,
  },
  ott_region: 'IN',
  certification_country: 'IN',
  show_me: 0,
};

export const MOVIE_UPCOMING = {
  air_date: {
    lte: dateAfter6Month(),
  },
  release_date: {
    gte: firstDate,
    lte: secondDate,
  },
  sort_by: 'popularity.desc',
  vote_average: {
    gte: 0,
    lte: 10,
  },
  vote_count: {
    gte: 0,
  },
  with_release_type: 3,
  with_runtime: {
    gte: 0,
    lte: 400,
  },
  ott_region: 'IN',
  certification_country: 'IN',
  show_me: 0,
};

export const MOVIE_TOP_RATED = {
  air_date: {
    lte: dateAfter6Month(),
  },
  release_date: {
    lte: dateAfter6Month(),
  },
  sort_by: 'vote_average.desc',
  vote_average: {
    gte: 0,
    lte: 10,
  },
  with_runtime: {
    gte: 0,
    lte: 400,
  },
  vote_count: {
    gte: 300,
  },
  ott_region: 'IN',
  certification_country: 'IN',
  show_me: 0,
};

export const MOVIE_POPULAR = {
  air_date: {
    lte: dateAfter6Month(),
  },
  release_date: {
    lte: dateAfter6Month(),
  },
  sort_by: 'popularity.desc',
  vote_average: {
    gte: 0,
    lte: 10,
  },
  vote_count: {
    gte: 0,
  },
  with_runtime: {
    gte: 0,
    lte: 400,
  },
  ott_region: 'IN',
  certification_country: 'IN',
  show_me: 0,
};

export const TV_AIRING_TODAY = {
  air_date: {
    gte: todaysDate(),
    lte: todaysDate(),
  },
  release_date: {
    lte: dateAfter6Month(),
  },
  sort_by: 'popularity.desc',
  vote_average: {
    gte: 0,
    lte: 10,
  },
  vote_count: {
    gte: 0,
  },
  with_runtime: {
    gte: 0,
    lte: 400,
  },
  ott_region: 'IN',
  certification_country: 'IN',
  show_me: 0,
};

export const TV_ON_THE_AIR = {
  air_date: {
    gte: todaysDate(),
    lte: getDateAfterWeek(),
  },
  release_date: {
    lte: dateAfter6Month(),
  },
  sort_by: 'popularity.desc',
  vote_average: {
    gte: 0,
    lte: 10,
  },
  vote_count: {
    gte: 0,
  },
  with_runtime: {
    gte: 0,
    lte: 400,
  },
  ott_region: 'IN',
  certification_country: 'IN',
  show_me: 0,
};

export const TV_TOP_RATED = {
  air_date: {
    lte: dateAfter6Month(),
  },
  release_date: {
    lte: dateAfter6Month(),
  },
  sort_by: 'vote_average.desc',
  vote_average: {
    gte: 0,
    lte: 10,
  },
  vote_count: {
    gte: 150,
  },
  with_runtime: {
    gte: 0,
    lte: 400,
  },
  ott_region: 'IN',
  certification_country: 'IN',
  show_me: 0,
};

export const TV_POPULAR = {
  air_date: {
    lte: dateAfter6Month(),
  },
  release_date: {
    lte: dateAfter6Month(),
  },
  sort_by: 'popularity.desc',
  vote_average: {
    gte: 0,
    lte: 10,
  },
  vote_count: {
    gte: 0,
  },
  with_runtime: {
    gte: 0,
    lte: 400,
  },
  ott_region: 'IN',
  certification_country: 'IN',
  show_me: 0,
};
