import { useEffect, useState } from 'react';
import { API, BASE_URL } from '../../Constants';
import Title from '../Title/Title';
import styles from './TrendingMovies.module.scss';

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const fetchTrendingMovies = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API}`);
    const data = await res.json();
    setMovies(data.results);
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <section className={styles['trending-movies']}>
      <Title>Trending Movies</Title>
      <div className={styles['trending-movies__container']}>
        {movies.map(movie => (
          <div key={movie.id} className={styles['trending-movies__movie']}>
            <img loading='lazy' src={`${BASE_URL}${movie.poster_path}`} alt={movie.title} className={styles.poster}/>
            <div className={styles['trending-movies__movie-info']}>
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingMovies;
