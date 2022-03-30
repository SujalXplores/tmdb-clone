import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import CustomAccordion from './CustomAccordion';
import CategoryCard from './Category-Card';
import { categoryUrl } from '../../Helpers/CategoryUrl';
import useTitle from '../../Hooks/useTitle';

import styles from './Categories.module.scss';
import {
  Button,
  Chip,
  FormControl,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { sortByCategory } from '../../Helpers/CategoryFilters';

const Categories = () => {
  const [hasMore, setHasMore] = useState(false);
  const [categories, setCategories] = useState({
    results: [],
    page: 1,
    total_pages: 1,
  });
  const [sort, setSort] = useState('popularity.desc');

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  const params = useParams();
  const { type, category } = params;
  const { url, title } = categoryUrl(type, category);

  useTitle(`${title} — The Movie Database (TMDB)`);

  const handleLoadMore = async (page) => {
    try {
      const response = await axios.get(`${url}&page=${page}`);
      console.log('page->', response.data);
      if (response.data.page === 1) {
        setCategories({
          results: response.data.results,
          page: response.data.page,
          total_pages: response.data.total_pages,
        });
      } else {
        setCategories((prevState) => {
          return {
            ...prevState,
            results: [...prevState.results, ...response.data.results],
            page: response.data.page,
            total_pages: response.data.total_pages,
          };
        });
      }
      console.log('state:::', categories, 'HAS MORE:::', hasMore);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (categories.page === categories.total_pages) {
      setHasMore(false);
    }
  }, [categories.page, categories.total_pages]);

  useEffect(() => {
    handleLoadMore(1);
  }, [url]);

  const handleSearch = () => {
    console.log('search');
    const filteredData = sortByCategory(sort, categories.results);
    console.log(filteredData);
    setCategories((prevState) => {
      return {
        ...prevState,
        results: filteredData,
      };
    });
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
                <div className={styles.filter_container}>
                  <CustomAccordion title='Sort' border>
                    <h3>Sort Results By</h3>
                    <FormControl fullWidth>
                      <Select value={sort} onChange={handleChangeSort}>
                        <MenuItem value='popularity.desc'>
                          Popularity Descending
                        </MenuItem>
                        <MenuItem value='popularity.asc'>
                          Popularity Ascending
                        </MenuItem>
                        <MenuItem value='vote_average.asc'>
                          Rating Ascending
                        </MenuItem>
                        <MenuItem value='vote_average.desc'>
                          Rating Descending
                        </MenuItem>
                        <MenuItem value='primary_release_date.desc'>
                          Release Date Descending
                        </MenuItem>
                        <MenuItem value='primary_release_date.asc'>
                          Release Date Ascending
                        </MenuItem>
                        <MenuItem value='title.asc'>Title (A-Z)</MenuItem>
                        <MenuItem value='title.desc'>Title (Z-A)</MenuItem>
                      </Select>
                    </FormControl>
                  </CustomAccordion>
                  <CustomAccordion title='Filters' border>
                    <h3>Genres</h3>
                    <ul class='multi_select text'>
                      <li data-value='28'>Action</li>
                      <li data-value='12'>Adventure</li>
                      <li data-value='16'>Animation</li>
                      <li data-value='35'>Comedy</li>
                      <li data-value='80'>Crime</li>
                      <li data-value='99'>Documentary</li>
                      <li data-value='18'>Drama</li>
                      <li data-value='10751'>Family</li>
                      <li data-value='14'>Fantasy</li>
                      <li data-value='36'>History</li>
                      <li data-value='27'>Horror</li>
                      <li data-value='10402'>Music</li>
                      <li data-value='9648'>Mystery</li>
                      <li data-value='10749'>Romance</li>
                      <li data-value='878'>Science Fiction</li>
                      <li data-value='10770'>TV Movie</li>
                      <li data-value='53'>Thriller</li>
                      <li data-value='10752'>War</li>
                      <li data-value='37'>Western</li>
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
                      {categories.results.length > 0 && (
                        <div className={styles.media_item_results}>
                          <InfiniteScroll
                            className={styles.page_wrapper}
                            pageStart={1}
                            loadMore={handleLoadMore}
                            hasMore={hasMore}
                            loader={
                              <div className='loader' key={0}>
                                Loading...
                              </div>
                            }
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
