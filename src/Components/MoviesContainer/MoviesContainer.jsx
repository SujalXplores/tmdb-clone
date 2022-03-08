import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { API, BASE_URL } from '../../Constants';
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
  const [timeM, setTime] = useState(time);

  const handleChange = (event, tabValue) => {
    setTabValue(tabValue);
    console.log(tabValue);
  };

  useEffect(() => {
    switch (tabValue) {
      case 'Today':
        setTime('day');
        break;
      case 'This Week':
        setTime('week');
        break;

      default:
        break;
    }
  }, [tabValue]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const URL = `${BASE_URL}/${category}/${mediaType}/${timeM}?api_key=${API}`;
        console.warn(URL);
        const res = await fetch(URL);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [category, mediaType, timeM]);

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
