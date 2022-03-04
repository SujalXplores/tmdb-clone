import { useEffect, useState } from 'react';
import { API, BASE_URL } from '../../Constants';
import MovieCard from '../MovieCard/MovieCard';
import { SkeletonLoader } from '../MovieCard/SkeletonLoader';
import Title from '../Title/Title';
import styles from './MoviesContainer.module.scss';

const MoviesContainer = ({ category, mediaType, time = '', title = '' }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/${category}/${mediaType}/${time}?api_key=${API}`
      );
      const data = await res.json();
      setMovies(data.results);
      console.table(data.results);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <section className={styles.scroll__wrap}>
      <div>
        <Title>{title}</Title>
      </div>
      <div className={styles.inner__column}>
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

export default MoviesContainer;
