import { useEffect, useState } from 'react';
import { API } from '../../Constants';
import MovieCard from '../MovieCard/MovieCard';
import Title from '../Title/Title';
import styles from './TrendingMovies.module.scss';

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const fetchTrendingMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API}`
    );
    const data = await res.json();
    setMovies(data.results);
    console.log(data.results);
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <section className={styles.scroll__wrap}>
      <Title>Trending Movies</Title>
      <div cols={7.5} className={styles.inner__column}>
        {movies.map((movie) => (
          <MovieCard data={movie} key={movie.id} />
        ))}
      </div>
    </section>
  );
};

export default TrendingMovies;
