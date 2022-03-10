import { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ColorExtractor } from 'react-color-extractor';

import { IMAGE_URL } from '../../Constants';
import { dateToYear, slashDate } from '../../Helpers/ConvertDate';
import { genereNames } from '../../Helpers/Generes';

import styles from './ViewMore.module.scss';
import { convertRuntime } from '../../Helpers/ConvertRuntime';
import { RatingProgress } from '../../Components/RatingProgress/RatingProgress';

const ViewMore = () => {
  const location = useLocation();
  const [colors, setColors] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovie = async () => {
    console.log(location.state.id);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${location.state.id}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      console.log(data);
      setData(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    console.log(location.state.id);
    fetchMovie();
    console.log(data);
  }, []);

  const getColors = (color) => {
    setColors((prevState) => [...prevState, ...color]);
  };

  const bgImage = {
    backgroundImage: `url(${IMAGE_URL}${data.backdrop_path})`,
  };

  const bgBackDrop = {
    backgroundImage: `linear-gradient(to right, ${colors[0]} 150px, ${
      colors[3] + 'd6'
    } 100%)`,
  };

  return !loading && data ? (
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
                        src={`${IMAGE_URL}${data.poster_path}`}
                        alt='poster'
                      />
                    </ColorExtractor>
                  </div>
                </div>

                <div className={styles.ott_offer}>
                  <div className={styles['text-wrapper']}>
                    <div className={styles.button}>
                      <div className={styles.provider}>
                        <img
                          src={`${IMAGE_URL}/t/p/original/7Fl8ylPDclt3ZYgNbW2t7rbZE9I.jpg`}
                          width='36'
                          height='36'
                          alt='Now Streaming on Hotstar'
                        />
                      </div>
                      <div className={styles.text}>
                        <span>
                          <h4>Now Streaming</h4>
                          <h3>
                            <a title='Now Streaming on Hotstar'>Watch Now</a>
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
                        {data.title || data.name}
                      </a>
                      <span className={styles.release_date}>
                        {console.log(data)}(
                        {dateToYear(data.release_date || data.first_air_date)})
                      </span>
                    </h2>

                    <div className={styles.facts}>
                      {/* //TODO: find out way to get certification value from API 
                        <span className='certification'>TV-14</span> */}
                      <span className={styles.release}>
                        {slashDate(data.release_date || data.first_air_date) +
                          ' (' +
                          data.production_companies[0].origin_country +
                          ')'}
                      </span>
                      <span className={styles.divider}>•</span>
                      <span className={styles.genres}>
                        {genereNames(data.genres)}
                      </span>
                      <span className={styles.divider}>•</span>
                      <span className={styles.runtime}>
                        {convertRuntime(data.runtime)}
                      </span>
                    </div>
                  </div>
                  <ul className='auto actions'>
                    <li className='chart'>
                      <RatingProgress
                        size={60}
                        vote_average={data.vote_average}
                      />
                      <div className='text'>
                        User
                        <br />
                        Score
                      </div>
                    </li>

                    <li
                      className='tooltip use_tooltip list tooltip_hover'
                      title='Add to list'
                      data-role='tooltip'
                    >
                      <a className='no_click' href='#'>
                        <span className='glyphicons_v2 thumbnails-list white'></span>
                      </a>
                    </li>

                    <li
                      className='tooltip use_tooltip'
                      title='Mark as favorite'
                      data-role='tooltip'
                    >
                      <a
                        id='favourite'
                        className='no_click add_to_account_list favourite'
                        href='#'
                      >
                        <span className='glyphicons_v2 heart white false'></span>
                      </a>
                    </li>

                    <li
                      className='tooltip use_tooltip'
                      title='Add to your watchlist'
                      data-role='tooltip'
                    >
                      <a
                        id='watchlist'
                        className='no_click add_to_account_list watchlist'
                        href='#'
                      >
                        <span className='glyphicons_v2 bookmark white false'></span>
                      </a>
                    </li>

                    <li
                      className='tooltip use_tooltip rating tooltip_hover'
                      title='Rate It!'
                      data-role='tooltip'
                    >
                      <a id='rate_it' className='no_click rating' href='#'>
                        <span className='glyphicons_v2 star white false'></span>
                      </a>
                    </li>

                    <li className='video none'>
                      <a
                        className='no_click play_trailer'
                        href='#'
                        data-site='YouTube'
                        data-id='rOJ1cw6mohw'
                        data-title='Play Trailer'
                      >
                        <span className='glyphicons_v2 play'></span> Play
                        Trailer
                      </a>
                    </li>
                  </ul>

                  <div className='header_info'>
                    <h3 className='tagline' dir='auto'>
                      Every galaxy has an underworld.
                    </h3>

                    <h3 dir='auto'>Overview</h3>
                    <div className='overview' dir='auto'>
                      <p>
                        Legendary bounty hunter Boba Fett and mercenary Fennec
                        Shand must navigate the galaxy’s underworld when they
                        return to the sands of Tatooine to stake their claim on
                        the territory once ruled by Jabba the Hutt and his crime
                        syndicate.
                      </p>
                    </div>

                    <ol className='people no_image'>
                      <li className='profile'>
                        <p>
                          <a href='/person/15277-jon-favreau'>Jon Favreau</a>
                        </p>
                        <p className='character'>Creator</p>
                      </li>
                    </ol>
                  </div>
                </section>
              </div>
            </section>

            <div id='ott_offers_window' className='hidden'></div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div>Loading...</div>
  );
};
export default ViewMore;
