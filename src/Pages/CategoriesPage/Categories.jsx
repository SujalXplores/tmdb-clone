import axios from 'axios';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import CustomAccordion from './CustomAccordion';
import CategoryCard from './Category-Card';
import { categoryUrl } from '../../Helpers/CategoryUrl';
import useTitle from '../../Hooks/useTitle';

import styles from './Categories.module.scss';
import { Button, FormControl, MenuItem, Select } from '@mui/material';
import { API, DISCOVER_URL, GENRES } from '../../Constants';
import { sortOptions } from '../../Helpers/SortOptions';
import { serializeObject } from '../../Helpers/ObjectToUrl';

const Categories = () => {
  const params = useParams();
  const { type, category } = params;
  const { data, title } = categoryUrl(type, category);

  useTitle(`${title} — The Movie Database (TMDB)`);
  const [options, setOptions] = useState(data);
  const [hasMore, setHasMore] = useState(false);
  const [sort, setSort] = useState(data.sort_by);
  const [allGenreList, setAllGenreList] = useState([]);
  const [genreFilterArr, setGenreFilterArr] = useState([]);
  const [categories, setCategories] = useState({
    results: [],
    page: 1,
    total_pages: 1,
  });
  const url = serializeObject(options);

  useEffect(() => {
    setOptions(data);
  }, [type, category]);

  const handleLoadMore = async (page) => {
    try {
      const response = await axios.get(
        `${DISCOVER_URL}/${type}?api_key=${API}&${url}&page=${page}`
      );
      console.info('PAGE ->', response.data.page, response.data.results);
      if (response.data.page === 1) {
        console.log('first time set new record');
        setCategories({
          results: response.data.results,
          page: response.data.page,
          total_pages: response.data.total_pages,
        });
      } else {
        setCategories((prevState) => {
          return {
            results: [...prevState.results, ...response.data.results],
            page: response.data.page,
            total_pages: response.data.total_pages,
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `${DISCOVER_URL}/${type}?api_key=${API}&${url}`
      );
      setCategories({
        results: res.data.results,
        page: res.data.page,
        total_pages: res.data.total_pages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeSort = (event) => {
    setSort(event.target.value);
    setOptions((prevState) => ({
      ...prevState,
      sort_by: event.target.value,
    }));
  };

  const toggleGenre = (genre) => {
    const newGenreFilterArr = genreFilterArr.includes(genre)
      ? genreFilterArr.filter((item) => item !== genre)
      : [...genreFilterArr, genre];
    setGenreFilterArr(newGenreFilterArr);
    setOptions((prevState) => ({
      ...prevState,
      with_genres: newGenreFilterArr.join(','),
    }));
  };

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const res = await axios.get(`${GENRES}/${type}/list?api_key=${API}`);
        setAllGenreList(res.data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenre();
  }, [type]);

  useEffect(() => {
    if (categories.page === categories.total_pages) {
      setHasMore(false);
    }
  }, [categories.page, categories.total_pages]);

  useEffect(() => {
    setHasMore(false);
    handleLoadMore(1);
  }, [type, category]);

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
                    <h3>Sort Results By</h3>
                    <FormControl fullWidth>
                      <Select
                        value={sort}
                        onChange={handleChangeSort}
                        className={styles['custom-select']}
                      >
                        {sortOptions.map((item) => (
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
                  </CustomAccordion>
                  <CustomAccordion title='Filters' border>
                    <h3>Genres</h3>
                    <ul className={styles.multi_select}>
                      {allGenreList.map((genre) => (
                        <li
                          key={genre.id}
                          className={
                            genreFilterArr.includes(genre.id)
                              ? styles.active
                              : ''
                          }
                          onClick={() => toggleGenre(genre.id)}
                        >
                          {genre.name}
                        </li>
                      ))}
                    </ul>
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
                      {categories && categories.results.length > 0 && (
                        <div className={styles.media_item_results}>
                          <InfiniteScroll
                            className={styles.page_wrapper}
                            pageStart={1}
                            loadMore={handleLoadMore}
                            hasMore={hasMore}
                          >
                            {categories.results.map((data) => (
                              <CategoryCard key={data.id} {...{ data, type }} />
                            ))}
                          </InfiniteScroll>
                          {categories.page <= categories.total_pages && (
                            <Button
                              className={styles.load_more}
                              variant='contained'
                              fullWidth
                              onClick={() => setHasMore(true)}
                            >
                              Load More
                            </Button>
                          )}
                        </div>
                      )}
                      {categories && categories.results.length === 0 && (
                        <span>No items were found that match your query.</span>
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
