import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import CustomAccordion from './CustomAccordion';
import CategoryCard from './Category-Card';
import { categoryUrl } from '../../Helpers/CategoryUrl';
import useTitle from '../../Hooks/useTitle';

import styles from './Categories.module.scss';
import { Button } from '@mui/material';

const Categories = () => {
  const [hasMore, setHasMore] = useState(false);
  const [categories, setCategories] = useState([]);
  const params = useParams();
  const { type, category } = params;
  const { url, title } = categoryUrl(type, category);

  useTitle(`${title} — The Movie Database (TMDB)`);

  const handleLoadMore = async (page) => {
    try {
      const response = await axios.get(`${url}&page=${page}`);
      console.log('page->', response.data);
      if (response.data.page === 1) {
        setCategories(response.data.results);
      } else {
        setCategories((prevState) => [...prevState, ...response.data.results]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoadMore(1);
  }, [url]);

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
                  <CustomAccordion title='Sort'>
                    Sorting dropdown
                  </CustomAccordion>
                  <CustomAccordion title='Filters'>Filters</CustomAccordion>
                  <CustomAccordion title='Where To Watch'>
                    Where to watch
                  </CustomAccordion>
                </div>
                <div>
                  <div className={styles.right_media_container}>
                    <section className={styles.panel_results}>
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
                          initialLoad
                        >
                          {categories.map((data) => (
                            <CategoryCard key={data.id} {...{ data, type }} />
                          ))}
                        </InfiniteScroll>
                        <Button
                          className={styles.load_more}
                          variant='contained'
                          fullWidth
                          onClick={() => setHasMore(true)}
                        >
                          Load More
                        </Button>
                      </div>
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
