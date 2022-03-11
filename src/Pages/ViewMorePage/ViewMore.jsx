import { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ColorExtractor } from 'react-color-extractor';

import { API, BACKDROP_URL, POSTER_URL, STREAMING_URL } from '../../Constants';
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

  useLayoutEffect(() => {
    const fetchMovie = async () => {
      console.log('STATE:', location.state);
      const { id, media_type } = location.state;
      const url = `https://api.themoviedb.org/3/${
        media_type === 'movie' ? 'movie' : 'tv'
      }/${id}?api_key=${API}`;
      console.log(url);
      try {
        const res = await fetch(url);
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
    fetchMovie();
  }, [location]);

  const getColors = (color) => {
    setColors((prevState) => [...prevState, ...color]);
  };

  const bgImage = {
    backgroundImage: `url(${BACKDROP_URL}${data.backdrop_path})`,
  };

  const bgBackDrop = {
    backgroundImage: `linear-gradient(to right, ${colors[2]} 150px, ${
      colors[5] + 'd6'
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
                        src={`${POSTER_URL}/${data.poster_path}`}
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
                          src={`${STREAMING_URL}/dH4BZucVyb5lW97TEbZ7RTAugjg.jpg`}
                          width='36'
                          height='36'
                          alt='Now Streaming on Hotstar'
                        />
                      </div>
                      <div className={styles.text}>
                        <span>
                          <h4>Now Streaming</h4>
                          <h3>
                            <a href='/a' title='Now Streaming on Hotstar'>
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
                        {data.title || data.name}
                      </a>
                      <span className={styles.release_date}>
                        {console.log(data)}(
                        {dateToYear(data.release_date || data.first_air_date)})
                      </span>
                    </h2>

                    <div className={styles.facts}>
                      {/* //TODO: find out way to evaluate certification value from API */}
                      {/* <span className='certification'>TV-14</span> */}
                      <span className={styles.release}>
                        {slashDate(data.release_date || data.first_air_date)}{' '}
                        {data &&
                          data.production_countries[0] &&
                          ' (' + data.production_countries[0].iso_3166_1 + ')'}
                      </span>
                      <span className={styles.divider}>•</span>
                      <span className={styles.genres}>
                        {genereNames(data.genres)}
                      </span>
                      <span className={styles.divider}>•</span>
                      <span className={styles.runtime}>
                        {convertRuntime(data.runtime || '60')}
                      </span>
                    </div>
                  </div>
                  <ul className={styles.actions}>
                    <li className={styles.chart}>
                      <RatingProgress
                        size={60}
                        vote_average={data.vote_average}
                        styles={styles}
                      />
                      <div className={styles.text}>
                        User
                        <br />
                        Score
                      </div>
                    </li>
                  </ul>

                  <div className='header_info'>
                    {data.tagline && (
                      <h3 className={styles.tagline} dir='auto'>
                        {data.tagline}
                      </h3>
                    )}

                    <h3 dir='auto'>Overview</h3>
                    <div className='overview' dir='auto'>
                      <p>{data.overview}</p>
                    </div>

                    <ol className={styles.people}>
                      {data.created_by?.map((creator) => (
                        <li className='profile' key={creator.id}>
                          <p>
                            <a href='/person/15277-jon-favreau'>{creator.name}</a>
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
  ) : null;
};
export default ViewMore;
