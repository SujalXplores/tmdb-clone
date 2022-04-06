import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { useEffect, useMemo, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { Button, FormControl, MenuItem, Select, Slider } from '@mui/material';

import CustomAccordion from './CustomAccordion';
import CategoryCard from './Category-Card';
import useTitle from '../../Hooks/useTitle';
import { API, DISCOVER_URL, GENRES, WATCH_PROVIDERS } from '../../Constants';
import { SORT_OPTIONS } from '../../Utils/sort-options';
import { serializeObject } from '../../Helpers/ObjectToUrl';
import { Checkbox } from '../../Components/Checkbox/Checkbox';
import { categoryUrl } from '../../Helpers/CategoryUrl';
import { AVAILABILITIES } from '../../Utils/availabilities';
import { CERTIFICATIONS } from '../../Utils/certifications';
import { LANGUAGES } from '../../Utils/languages';

import styles from './Categories.module.scss';
import {
  MINIMUM_USER_VOTES_MARKS,
  RUNTIME_MARKS,
  USER_SCORE_MARKS,
} from '../../Utils/slider-defaults';
import { COUNTRIES } from '../../Utils/countries';

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
    availabilities: new Array(AVAILABILITIES.length).fill(true),
    certifications: [],
    ott_country: 'IN',
    ott_providers: [],
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
      case 'set_certifications':
        return {
          ...state,
          certifications: action.payload,
        };
      case 'set_ott_country':
        return {
          ...state,
          ott_country: action.payload,
        };
      case 'set_ott_providers':
        return {
          ...state,
          ott_providers: action.payload,
        };
      default:
        return state;
    }
  }, initialState);

  const defaultUrl = useMemo(() => serializeObject(data), [data]);

  const url = useMemo(() => serializeObject(state.options), [state.options]);

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

  useEffect(() => {
    dispatch({ type: 'set_hasMore', payload: false });
    dispatch({
      type: 'set_options',
      payload: data,
    });
    handleLoadMore(1);
  }, [type, category, data]);

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
    const newGenreFilterArr = state.genreFilterArr.includes(genre)
      ? state.genreFilterArr.filter((item) => item !== genre)
      : [...state.genreFilterArr, genre];
    dispatch({ type: 'set_genreFilterArr', payload: newGenreFilterArr });
    dispatch({
      type: 'set_options',
      payload: { ...state.options, with_genres: newGenreFilterArr.join(',') },
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

  const toggleAllAvailabilities = () => {
    dispatch({
      type: 'set_searchAllAvailabilities',
      payload: !state.searchAllAvailabilities,
    });
  };

  const handleOnChangeLanguage = (e) => {
    dispatch({
      type: 'set_options',
      payload: {
        ...state.options,
        with_original_language: e.target.value,
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

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const res = await axios.get(`${GENRES}/${type}/list?api_key=${API}`);
        dispatch({ type: 'set_allGenreList', payload: res.data.genres });
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenre();
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
          `${WATCH_PROVIDERS}/${type}?api_key=${API}&${state.ott_country.toLowerCase()}`
        );
        dispatch({ type: 'set_ott_providers', payload: res.data });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [state.ott_country]);

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
                <div className={styles.filter_container}>
                  <CustomAccordion title='Sort' border>
                    <div className={styles.inner_padding}>
                      <h3>Sort Results By</h3>
                      <FormControl fullWidth>
                        <Select
                          value={state.options.sort_by}
                          onChange={handleChangeSort}
                          className={styles['custom-select']}
                        >
                          {SORT_OPTIONS.map((item) => (
                            <MenuItem
                              key={item.value}
                              value={item.value}
                              className={styles['menu-item']}
                            >
                              {item.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </CustomAccordion>
                  <CustomAccordion title='Filters' border>
                    <div className={styles.inner_padding}>
                      <h3>Availabilities</h3>
                      <Checkbox
                        value='all'
                        label='Search all availabilities?'
                        checked={state.searchAllAvailabilities}
                        onChange={toggleAllAvailabilities}
                      />
                      {!state.searchAllAvailabilities &&
                        AVAILABILITIES.map((item) => (
                          <Checkbox
                            key={item.id}
                            value={item.value}
                            checked={state.availabilities[item.id]}
                            onChange={() => toggleAvailability(item.id)}
                            label={item.label}
                          />
                        ))}
                    </div>
                    <hr />
                    <div className={styles.inner_padding}>
                      <h3>Genres</h3>
                      <ul className={styles.multi_select}>
                        {state.allGenreList.map((genre) => (
                          <li
                            key={genre.id}
                            className={
                              state.genreFilterArr.includes(genre.id)
                                ? styles.active
                                : ''
                            }
                            onClick={() => toggleGenre(genre.id)}
                          >
                            {genre.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <hr />
                    <div className={styles.inner_padding}>
                      <h3>Certification</h3>
                      <ul className={styles.multi_select}>
                        {type === 'movie' &&
                          CERTIFICATIONS.map((item) => (
                            <li
                              key={item.order}
                              className={
                                state.certifications.includes(
                                  item.certification
                                )
                                  ? styles.active
                                  : ''
                              }
                              onClick={() =>
                                toggleCertification(item.certification)
                              }
                            >
                              {item.certification}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <hr />
                    <div className={styles.inner_padding}>
                      <h3>Language</h3>
                      <FormControl fullWidth>
                        <Select
                          value={state.options.with_original_language || 'en'}
                          onChange={handleOnChangeLanguage}
                          className={styles['custom-select']}
                        >
                          {LANGUAGES.map((item) => (
                            <MenuItem
                              key={item.iso_639_1}
                              value={item.iso_639_1}
                              className={styles['menu-item']}
                            >
                              {item.english_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <hr />
                    <div className={styles.inner_padding}>
                      <h3>User Score</h3>
                      <Slider
                        step={1}
                        min={0}
                        max={10}
                        value={[
                          state.options.vote_average.gte,
                          state.options.vote_average.lte,
                        ]}
                        onChange={handleChangeVoteAverage}
                        marks={USER_SCORE_MARKS}
                        getAriaValueText={valueLabelFormat}
                        valueLabelFormat={valueLabelFormat}
                        valueLabelDisplay='auto'
                        color='secondary'
                      />
                    </div>
                    <hr />
                    <div className={styles.inner_padding}>
                      <h3>Minimum User Votes</h3>
                      <Slider
                        step={50}
                        min={0}
                        max={500}
                        value={state.options.vote_count.gte}
                        onChange={handleChangeVoteCount}
                        marks={MINIMUM_USER_VOTES_MARKS}
                        valueLabelDisplay='auto'
                        color='secondary'
                      />
                    </div>
                    <hr />
                    <div className={styles.inner_padding}>
                      <h3>Runtime</h3>
                      <Slider
                        step={15}
                        min={0}
                        max={400}
                        value={[
                          state.options.with_runtime.gte,
                          state.options.with_runtime.lte,
                        ]}
                        onChange={handleChangeRuntime}
                        marks={RUNTIME_MARKS}
                        valueLabelDisplay='auto'
                        color='secondary'
                      />
                    </div>
                  </CustomAccordion>
                  <CustomAccordion title='Where To Watch' border>
                    <div className={styles.inner_padding}>
                      <FormControl fullWidth>
                        <Select
                          value={state.ott_country}
                          onChange={handleOnChangeOttCountry}
                          className={styles['custom-select']}
                        >
                          {COUNTRIES.map((item) => (
                            <MenuItem
                              key={item.code}
                              value={item.code}
                              className={styles['menu-item']}
                            >
                              <img
                                loading='lazy'
                                width='20'
                                src={`https://flagcdn.com/w20/${item.code.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${item.code.toLowerCase()}.png 2x`}
                                alt={item.label}
                                style={{
                                  marginRight: '10px',
                                }}
                              />
                              {item.label + ' ' + item.code}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {/* {state.ott_providers &&
                        state.ott_providers.map((item) => (
                          <>{console.log(item)}</>
                        ))} */}
                    </div>
                  </CustomAccordion>
                  <Button
                    variant='contained'
                    fullWidth
                    sx={{
                      backgroundColor: '#01b4e4',
                      height: '44px',
                      borderRadius: '20px',
                      fontSize: '1.2em',
                      fontWeight: '600',
                      fontFamily: 'inherit',
                      mt: '7px',
                      lineHeight: '1',
                      '&:hover': {
                        backgroundColor: '#032541',
                      },
                    }}
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </div>
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
                              onClick={() =>
                                dispatch({ type: 'set_hasMore', payload: true })
                              }
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
