import axios from 'axios';
import { useLayoutEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ColorExtractor } from 'react-color-extractor';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import {
  API,
  API_URL,
  BACKDROP_URL,
  POSTER_URL,
  STREAMING_URL,
} from '../../Constants';
import { dateToYear, slashDate } from '../../Helpers/ConvertDate';
import { genereNames } from '../../Helpers/Generes';
import { convertRuntime } from '../../Helpers/ConvertRuntime';
import { RatingProgress } from '../../Components/RatingProgress/RatingProgress';
import { CastContainer } from '../../Components/CastContainer/CastContainer';
import { TrailerModal } from '../../Components/TrailerModal/TrailerModal';

import styles from './ViewMore.module.scss';

const ViewMore = () => {
  const location = useLocation();
  const { id } = location.state;

  const params = useParams();

  const [colors, setColors] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [trailerData, setTrailerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalProps, setModalProps] = useState({
    open: false,
    data: {},
    handleClose: () => {},
  });

  useLayoutEffect(() => {
    const fetchMovie = async () => {
      const url = `${API_URL}/${params.type}/${id}?api_key=${API}`;
      const trailerUrl = `${API_URL}/${params.type}/${id}/videos?api_key=${API}`;
      try {
        const res = await axios.all([axios.get(url), axios.get(trailerUrl)]);
        if (!res.status === 200) {
          throw new Error(res.statusText);
        }
        const [movie, trailer] = res;
        setMovieData(movie.data);
        setTrailerData(
          trailer.data.results.find((trailer) => trailer.type === 'Trailer')
        );
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    fetchMovie();
  }, [location, params, id]);

  const getColors = (color) => {
    setColors((prevState) => [...prevState, ...color]);
  };

  const bgImage = {
    backgroundImage: `url(${BACKDROP_URL}${movieData.backdrop_path})`,
  };

  const bgBackDrop = {
    backgroundImage: `linear-gradient(to right, ${colors[2]} 150px, ${
      colors[5] + 'd6'
    } 100%)`,
  };

  const handleClose = () => {
    setModalProps((prevState) => ({
      ...prevState,
      open: false,
      handleClose,
    }));
  };

  const openTrailer = () => {
    setModalProps({
      data: trailerData,
      open: true,
      handleClose,
    });
  };

  return (
    !loading &&
    movieData && (
      <>
        <section className={styles.viewMore}>
          <div className={styles.header} style={bgImage}>
            <div className={styles.backdrop} style={bgBackDrop}>
              <div className={styles['single-column']}>
                <section className={styles['inner-section']}>
                  <div className={styles['poster-wrapper']}>
                    <div className={styles.poster}>
                      <div className={styles.image_content}>
                        <ColorExtractor getColors={getColors}>
                          <img
                            className={styles.poster}
                            src={`${POSTER_URL}/${movieData.poster_path}`}
                            alt='poster'
                            loading='lazy'
                          />
                        </ColorExtractor>
                      </div>
                    </div>

                    <div className={styles.ott_offer}>
                      <div className={styles['text-wrapper']}>
                        <div className={styles.button}>
                          <div className={styles.provider}>
                            <img
                              src={`${STREAMING_URL}/dH4BZucVyb5lW97TEbZ7RTAugjg.jpg`}
                              width='36'
                              height='36'
                              alt='Now Streaming on Hotstar'
                              loading='lazy'
                            />
                          </div>
                          <div className={styles.text}>
                            <span>
                              <h4>Now Streaming</h4>
                              <h3>
                                <a
                                  href='/watchnow'
                                  title='Now Streaming on Hotstar'
                                >
                                  Watch Now
                                </a>
                              </h3>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.header_poster_wrapper}>
                    <section className={styles['inner-content']}>
                      <div className={styles.title}>
                        <h2>
                          <a href='/tv/115036-the-book-of-boba-fett'>
                            {movieData.title || movieData.name}
                          </a>
                          <span className={styles.release_date}>
                            {dateToYear(
                              movieData.release_date || movieData.first_air_date
                            )}
                          </span>
                        </h2>

                        <div className={styles.facts}>
                          <span className={styles.release}>
                            {slashDate(
                              movieData.release_date || movieData.first_air_date
                            )}{' '}
                            {movieData &&
                              movieData.production_countries[0] &&
                              ' (' +
                                movieData.production_countries[0].iso_3166_1 +
                                ')'}
                          </span>
                          <span className={styles.divider}>•</span>
                          <span className={styles.genres}>
                            {genereNames(movieData.genres)}
                          </span>
                          <span className={styles.divider}>•</span>
                          <span className={styles.runtime}>
                            {convertRuntime(
                              movieData.runtime ||
                                movieData.episode_run_time[0] ||
                                '60'
                            )}
                          </span>
                        </div>
                      </div>
                      <ul className={styles.actions}>
                        <li className={styles.chart}>
                          <RatingProgress
                            size={60}
                            vote_average={movieData.vote_average}
                            styles={styles}
                          />
                          <div className={styles.text}>
                            User
                            <br />
                            Score
                          </div>
                        </li>
                        {trailerData && (
                          <li onClick={() => openTrailer(movieData.id)}>
                            <PlayArrowIcon sx={{ mr: '10px' }} /> Play Trailer
                          </li>
                        )}
                      </ul>

                      <div className='header_info'>
                        {movieData.tagline && (
                          <h3 className={styles.tagline} dir='auto'>
                            {movieData.tagline}
                          </h3>
                        )}

                        <h3 dir='auto'>Overview</h3>
                        <div className='overview' dir='auto'>
                          <p>
                            {movieData.overview ||
                              "We don't have an overview translated in English. Help us expand our database by adding one."}
                          </p>
                        </div>

                        <ol className={styles.people}>
                          {movieData.created_by?.map((creator) => (
                            <li className='profile' key={creator.id}>
                              <p>
                                <a href='/person/15277-jon-favreau'>
                                  {creator.name}
                                </a>
                              </p>
                              <p className={styles.character}>Creator</p>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </section>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
        <CastContainer
          type={params.type}
          id={location.state.id}
          {...{ movieData }}
        />
        {movieData && <TrailerModal {...modalProps} />}
      </>
    )
  );
};
export default ViewMore;
