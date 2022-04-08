import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { useEffect, useMemo, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

import CategoryCard from './Category-Card';
import useTitle from '../../Hooks/useTitle';
import Filters from './Filters';
import { API, DISCOVER_URL, GENRES, WATCH_PROVIDERS } from '../../Constants';
import { serializeObject } from '../../Helpers/ObjectToUrl';
import { categoryUrl } from '../../Helpers/CategoryUrl';
import { AVAILABILITIES } from '../../Utils/availabilities';
import { RELEASE_TYPES } from '../../Utils/release-types';

import styles from './Categories.module.scss';

const Categories = () => {
  const params = useParams();
  const { type, category } = params;
  const { data, title } = categoryUrl(type, category);

  useTitle(`${title} — The Movie Database (TMDB)`);

  const initialState = {
    categories: {
      results: [],
      page: 1,
      total_pages: 1,
    },
    hasMore: false,
    genreFilterArr: [],
    allGenreList: [],
    options: data,
    searchAllAvailabilities: true,
    searchAllDates: true,
    searchAllEpisodes: true,
    releaseTypes: new Array(RELEASE_TYPES.length).fill(true),
    availabilities: new Array(AVAILABILITIES.length).fill(true),
    certifications: [],
    ott_country: 'IN',
    region: 'IN',
    ott_providers: [],
    ott_provider_filter: [],
    searchAllCountries: true,
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'set_categories':
        if (action.payload.page === 1) {
          return {
            ...state,
            categories: action.payload,
          };
        } else {
          return {
            ...state,
            categories: {
              results: [...state.categories.results, ...action.payload.results],
              page: action.payload.page,
              total_pages: action.payload.total_pages,
            },
          };
        }
      case 'set_hasMore':
        return {
          ...state,
          hasMore: action.payload,
        };
      case 'set_genreFilterArr':
        return {
          ...state,
          genreFilterArr: action.payload,
        };
      case 'set_allGenreList':
        return {
          ...state,
          allGenreList: action.payload,
        };
      case 'set_options':
        return {
          ...state,
          options: action.payload,
        };
      case 'set_sort':
        return {
          ...state,
          options: {
            ...state.options,
            sort_by: action.payload,
          },
        };
      case 'set_availabilities':
        return {
          ...state,
          availabilities: action.payload,
        };
      case 'set_searchAllAvailabilities':
        return {
          ...state,
          searchAllAvailabilities: action.payload,
          options: {
            ...state.options,
            with_ott_monetization_types: action.payload
              ? ''
              : 'flatrate|free|ads|rent|buy',
          },
        };
      case 'set_searchAllDates':
        return {
          ...state,
          searchAllDates: action.payload,
          options: {
            ...state.options,
            with_release_type: action.payload ? '' : '1|2|3|4|5|6',
          },
        };
      case 'set_searchAllEpisodes':
        return {
          ...state,
          searchAllEpisodes: action.payload,
          options: {
            ...state.options,
            air_date: {
              gte: action.payload ? state.options.first_air_date.gte ?? '' : '',
              lte: action.payload ? state.options.first_air_date.lte ?? '' : '',
            },
            first_air_date: {
              gte: action.payload ? '' : state.options.air_date.gte ?? '',
              lte: action.payload ? '' : state.options.air_date.lte ?? '',
            },
          },
        };
      case 'set_releaseTypes':
        return {
          ...state,
          releaseTypes: action.payload,
        };
      case 'set_certifications':
        return {
          ...state,
          certifications: action.payload,
        };
      case 'set_ott_country':
        return {
          ...state,
          options: {
            ...state.options,
            ott_region: action.payload,
          },
          ott_country: action.payload,
          ott_provider_filter: [],
        };
      case 'set_ott_provider_filter':
        return {
          ...state,
          ott_provider_filter: action.payload,
        };
      case 'set_ott_providers':
        return {
          ...state,
          ott_providers: action.payload,
        };
      case 'set_searchAllCountries':
        return {
          ...state,
          searchAllCountries: action.payload,
          options: {
            ...state.options,
            region: action.payload ? '' : 'IN',
          },
        };
      case 'set_region':
        return {
          ...state,
          options: {
            ...state.options,
            region: action.payload,
          },
          region: action.payload,
        };
      default:
        return state;
    }
  }, initialState);

  const defaultUrl = useMemo(() => serializeObject(data), [data]);
  const url = useMemo(() => serializeObject(state.options), [state.options]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${GENRES}/${type}/list?api_key=${API}`);
        dispatch({ type: 'set_allGenreList', payload: res.data.genres });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [type]);

  useEffect(() => {
    if (state.categories.page === state.categories.total_pages - 1) {
      dispatch({ type: 'set_hasMore', payload: false });
    }
  }, [state.categories.page, state.categories.total_pages]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${WATCH_PROVIDERS}/${type}?api_key=${API}&language=en-US&watch_region=${state.ott_country}`
        );
        console.log('Providers', res.data);
        dispatch({ type: 'set_ott_providers', payload: res.data.results });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [state.ott_country, type]);

  useEffect(() => {
    dispatch({ type: 'set_hasMore', payload: false });
    dispatch({
      type: 'set_options',
      payload: data,
    });
    handleLoadMore(1);
  }, [type, category, data]);

  const handleLoadMore = async (page) => {
    try {
      const options = page === 1 ? defaultUrl : url;
      console.log('LOAD MORE URL:::', url);
      const response = await axios.get(
        `${DISCOVER_URL}/${type}?api_key=${API}&${options}&page=${page}`
      );
      dispatch({ type: 'set_categories', payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `${DISCOVER_URL}/${type}?api_key=${API}&${url}`
      );
      dispatch({ type: 'set_categories', payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeSort = (event) => {
    dispatch({
      type: 'set_options',
      payload: { ...state.options, sort_by: event.target.value },
    });
  };

  const toggleGenre = (genre) => {
    console.log(genre);
    const newGenreFilterArr = state.genreFilterArr.includes(genre)
      ? state.genreFilterArr.filter((item) => item !== genre)
      : [...state.genreFilterArr, genre];
    console.log(newGenreFilterArr);
    dispatch({ type: 'set_genreFilterArr', payload: newGenreFilterArr });
    dispatch({
      type: 'set_options',
      payload: { ...state.options, with_genres: newGenreFilterArr.join(',') },
    });
  };

  const toggleOttProvider = (provider) => {
    console.log(provider);
    const newOttProviderFilterArr = state.ott_provider_filter.includes(provider)
      ? state.ott_provider_filter.filter((item) => item !== provider)
      : [...state.ott_provider_filter, provider];
    console.log(newOttProviderFilterArr);
    dispatch({
      type: 'set_ott_provider_filter',
      payload: newOttProviderFilterArr,
    });
    dispatch({
      type: 'set_options',
      payload: {
        ...state.options,
        with_ott_providers: newOttProviderFilterArr.join('|'),
      },
    });
  };

  const toggleCertification = (certification) => {
    const newCertifications = state.certifications.includes(certification)
      ? state.certifications.filter((item) => item !== certification)
      : [...state.certifications, certification];
    dispatch({
      type: 'set_certifications',
      payload: newCertifications,
    });
    dispatch({
      type: 'set_options',
      payload: { ...state.options, certification: newCertifications.join('|') },
    });
  };

  const toggleAvailability = (id) => {
    const newAvailabilities = [...state.availabilities];
    newAvailabilities[id] = !newAvailabilities[id];
    dispatch({
      type: 'set_availabilities',
      payload: newAvailabilities,
    });

    const newArray = newAvailabilities
      .map((item, index) => (item ? AVAILABILITIES[index].value : null))
      .filter((item) => item !== null);

    dispatch({
      type: 'set_options',
      payload: {
        ...state.options,
        with_ott_monetization_types: newArray.join('|'),
      },
    });
  };

  const toggleReleaseType = (id) => {
    const newReleaseTypes = [...state.releaseTypes];
    newReleaseTypes[id] = !newReleaseTypes[id];
    dispatch({
      type: 'set_releaseTypes',
      payload: newReleaseTypes,
    });

    const newArray = newReleaseTypes
      .map((item, index) => (item ? RELEASE_TYPES[index].value : null))
      .filter((item) => item !== null);

    dispatch({
      type: 'set_options',
      payload: {
        ...state.options,
        with_release_type: newArray.join('|'),
      },
    });
  };

  const toggleAllAvailabilities = () => {
    dispatch({
      type: 'set_searchAllAvailabilities',
      payload: !state.searchAllAvailabilities,
    });
  };

  const toggleAllDates = () => {
    dispatch({
      type: 'set_searchAllDates',
      payload: !state.searchAllDates,
    });
  };

  const toggleAllEpisodes = () => {
    dispatch({
      type: 'set_searchAllEpisodes',
      payload: !state.searchAllEpisodes,
    });
  };

  const toggleAllCountries = () => {
    dispatch({
      type: 'set_searchAllCountries',
      payload: !state.searchAllCountries,
    });
  };

  const handleOnChangeLanguage = (e) => {
    const language = e.target.value === 'xx' ? '' : e.target.value;
    dispatch({
      type: 'set_options',
      payload: {
        ...state.options,
        with_original_language: language,
      },
    });
  };

  const valueLabelFormat = () => {
    const { gte, lte } = state.options.vote_average;
    return `Rated ${gte}-${lte}`;
  };

  const handleChangeVoteAverage = (e, newValue) => {
    const [gte, lte] = newValue;
    dispatch({
      type: 'set_options',
      payload: {
        ...state.options,
        vote_average: {
          gte: gte,
          lte: lte,
        },
      },
    });
  };

  const handleChangeVoteCount = (e, newValue) => {
    dispatch({
      type: 'set_options',
      payload: {
        ...state.options,
        vote_count: {
          gte: newValue,
        },
      },
    });
  };

  const handleChangeRuntime = (e, newValue) => {
    const [gte, lte] = newValue;
    dispatch({
      type: 'set_options',
      payload: {
        ...state.options,
        with_runtime: {
          gte: gte,
          lte: lte,
        },
      },
    });
  };

  const handleOnChangeOttCountry = (e) => {
    dispatch({
      type: 'set_ott_country',
      payload: e.target.value,
    });
  };

  const handleOnChangeRegion = (e) => {
    dispatch({
      type: 'set_region',
      payload: e.target.value,
    });
  };

  const setHasMoreTrue = () => {
    dispatch({ type: 'set_hasMore', payload: true });
  };

  return (
    <>
      <section className={styles.inner_content}>
        <div className={styles.media}>
          <div className={styles.column_wrapper}>
            <div className={styles.content_wrapper}>
              <div className={styles.title}>
                <h2>{title}</h2>
              </div>
              <div className={styles.content}>
                <Filters
                  {...{
                    type,
                    state,
                    handleSearch,
                    handleChangeSort,
                    toggleGenre,
                    toggleCertification,
                    toggleAvailability,
                    toggleAllAvailabilities,
                    toggleOttProvider,
                    toggleAllDates,
                    toggleAllEpisodes,
                    toggleReleaseType,
                    toggleAllCountries,
                    handleOnChangeLanguage,
                    handleChangeVoteAverage,
                    handleChangeVoteCount,
                    handleChangeRuntime,
                    handleOnChangeOttCountry,
                    handleOnChangeRegion,
                    valueLabelFormat,
                  }}
                />
                <div>
                  <div className={styles.right_media_container}>
                    <section className={styles.panel_results}>
                      {state.categories && state.categories.results.length > 0 && (
                        <div className={styles.media_item_results}>
                          <InfiniteScroll
                            className={styles.page_wrapper}
                            pageStart={1}
                            loadMore={handleLoadMore}
                            hasMore={state.hasMore}
                          >
                            {state.categories.results.map((data) => (
                              <CategoryCard key={data.id} {...{ data, type }} />
                            ))}
                          </InfiniteScroll>
                          {state.categories.page <
                            state.categories.total_pages && (
                            <Button
                              className={styles.load_more}
                              variant='contained'
                              fullWidth
                              onClick={setHasMoreTrue}
                            >
                              Load More
                            </Button>
                          )}
                        </div>
                      )}
                      {state.categories &&
                        state.categories.results.length === 0 && (
                          <span>
                            No items were found that match your query.
                          </span>
                        )}
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
