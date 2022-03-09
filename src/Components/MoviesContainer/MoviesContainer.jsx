import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  API,
  BASE_URL,
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
    `${BASE_URL}/${category}/${mediaType}/${time}?api_key=${API}`
  );

  const handleChange = (event, tabValue) => {
    setTabValue(tabValue);
    console.log(tabValue);
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
        console.log('URL-->', url);
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        setMovies(data.results);
        console.table(data.results);
      } catch (error) {
        alert(error.message);
      } finally {
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
