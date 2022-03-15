import axios from 'axios';
import { Fade } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  API,
  API_URL,
  IN_THEATERS,
  POPULAR_ON_TV,
  TRENDING_DAY,
  TRENDING_WEEK,
} from '../../Constants';
import MovieCard from '../MovieCard/MovieCard';
import { SkeletonLoader } from '../MovieCard/SkeletonLoader';
import CustomTab from '../Tabs/Tabs';
import Title from '../Title/Title';
import styles from './MoviesContainer.module.scss';

const MoviesContainer = ({
  category,
  mediaType,
  tabs,
  time,
  title,
  isBackground,
}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState((tabs && tabs[0]) || '');
  const [url, setURL] = useState(
    `${API_URL}/${category}/${mediaType}/${time}?api_key=${API}`
  );

  const handleChange = (event, tabValue) => {
    setTabValue(tabValue);
  };

  useEffect(() => {
    switch (tabValue) {
      case 'Today':
        setURL(TRENDING_DAY);
        break;
      case 'This Week':
        setURL(TRENDING_WEEK);
        break;
      case 'On TV':
        setURL(POPULAR_ON_TV);
        break;
      case 'In Theaters':
        setURL(IN_THEATERS);
        break;
      default:
        break;
    }
  }, [tabValue]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(url);
        if (!res.status === 200) {
          throw new Error(res.statusText);
        }
        const data = await res.data;
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };
    fetchMovies();
  }, [url]);

  return (
    <section className={styles.scroll__wrap}>
      <div className={styles['movie-header-container']}>
        <Title>{title}</Title>
        {tabs && (
          <CustomTab tabs={tabs} handleChange={handleChange} value={tabValue} />
        )}
      </div>
      <Fade in={true}>
        <div
          className={`${styles.inner__column} ${
            isBackground ? styles['bg-image'] : ''
          }`}
        >
          {loading && [...Array(10)].map((_, i) => <SkeletonLoader key={i} />)}
          {!loading && movies ? (
            movies.map((movie) => (
              <MovieCard data={movie} key={movie.id} loading={loading} />
            ))
          ) : (
            <h1>Failed to fetch movies!</h1>
          )}
        </div>
      </Fade>
    </section>
  );
};

MoviesContainer.propTypes = {
  category: PropTypes.string,
  mediaType: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.string),
  time: PropTypes.string,
  title: PropTypes.string,
  isBackground: PropTypes.bool,
};

MoviesContainer.defaultProps = {
  category: '',
  mediaType: '',
  tabs: [''],
  time: '',
  title: '',
  isBackground: false,
};

export default MoviesContainer;
