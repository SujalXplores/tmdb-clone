import axios from 'axios';
import { useCallback, useLayoutEffect, useState } from 'react';
import { ReactComponent as PersonMale } from '../../assets/person-male.svg';
import { ReactComponent as PersonFemale } from '../../assets/person-female.svg';
import {
  API,
  API_URL,
  CAST_URL,
  NETWORK_URL,
  RECOMMENDATIONS_BACKDROP_URL,
  SEASON_POSTER_URL,
} from '../../Constants';
import imageErrorSrc from '../../assets/image-fallback.svg';

import styles from './CastContainer.module.scss';
import { convertDate } from '../../Helpers/ConvertDate';
import { Link } from 'react-router-dom';

export const CastContainer = ({ type, id, movieData }) => {
  const [castData, setCastData] = useState([]);
  const [keywordData, setKeywordData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCast = useCallback(async () => {
    const credits_url = `${API_URL}/${type}/${id}/credits?api_key=${API}`;
    const keywords_url = `${API_URL}/${type}/${id}/keywords?api_key=${API}`;
    const recommendations_url = `${API_URL}/${type}/${id}/recommendations?api_key=${API}`;

    try {
      const credits = await axios.get(credits_url);
      setCastData(credits.data.cast);
      console.log('✅ Cast fetching done');
    } catch (error) {
      console.log('💀 Cast fetching failed', error);
    } finally {
      setLoading(false);
    }

    try {
      const keywords = await axios.get(keywords_url);
      setKeywordData(keywords.data.results || keywords.data.keywords);
      console.log('✅ Keywords fetching done');
    } catch (error) {
      console.log('💀 Keywords fetching failed', error);
    }

    try {
      const recommendations = await axios.get(recommendations_url);
      setRecommendations(recommendations.data.results);
      console.log('✅ Recommendations fetching done');
    } catch (error) {
      console.log('💀 Recommendations fetching failed', error);
    }
  }, [type, id]);

  useLayoutEffect(() => {
    fetchCast();
  }, [fetchCast]);

  const handleScroll = (e) => {
    const element = e.target;
    if (element.scrollLeft > 25) {
      element.style.setProperty('--opacity', 0);
    } else {
      element.style.setProperty('--opacity', 1);
    }
  };

  const currentSeason = movieData?.seasons?.at(-1);

  return (
    !loading &&
    castData && (
      <>
        <div className={styles.column_wrapper}>
          <div className={styles.content_wrapper}>
            <div className={styles.white_column}>
              <section className={styles.cast_section}>
                <h3 dir='auto'>
                  {type === 'movie' ? 'Top Billed Cast' : 'Series Cast'}
                </h3>
                <div className={styles.scroll_fade}>
                  <ol className={styles.people} onScroll={handleScroll}>
                    {castData.slice(0, 9).map((cast) => (
                      <li className={styles.card} key={cast.id}>
                        <Link to='/' className={styles.img_link}>
                          {cast.profile_path ? (
                            <div className={styles['img-container']}>
                              <img
                                loading='lazy'
                                className={styles.profile}
                                src={`${CAST_URL}${cast.profile_path}`}
                                alt={cast.name}
                              />
                            </div>
                          ) : cast.gender ? (
                            <PersonFemale className={styles.no_image} />
                          ) : (
                            <PersonMale className={styles.no_image} />
                          )}
                        </Link>
                        <p className={styles.name}>{cast.name}</p>
                        <p className={styles.character}>{cast.character}</p>
                      </li>
                    ))}
                  </ol>
                  {!castData.length && (
                    <span>
                      We don't have any cast added to this Show. You can help by
                      adding some!
                    </span>
                  )}
                </div>
              </section>
              {movieData.seasons && (
                <section className={styles.season_section}>
                  {console.log(movieData)}
                  <h3>
                    {movieData.next_episode_to_air
                      ? 'Current Season'
                      : 'Last Season'}
                  </h3>
                  <div className={styles.season_card}>
                    <div className={styles.flex}>
                      <div className={styles.poster}>
                        <img
                          className={`${
                            !currentSeason.poster_path
                              ? styles['fallback-poster']
                              : ''
                          }`}
                          src={`${SEASON_POSTER_URL}${currentSeason.poster_path}`}
                          alt='poster'
                          loading='lazy'
                          onError={(e) => (e.target.src = imageErrorSrc)}
                        />
                      </div>
                      <div className={styles.content}>
                        <div>
                          <h2>Season {currentSeason.season_number}</h2>
                          <h4>
                            {currentSeason.air_date?.slice(0, 4) ||
                              new Date().getFullYear()}{' '}
                            | {currentSeason.episode_count} Episodes
                          </h4>
                          <div className={styles.season_overview}>
                            <p>
                              {currentSeason.overview ||
                                `Season ${currentSeason.season_number} of ${
                                  movieData.name
                                } premiered on ${convertDate(
                                  currentSeason.air_date,
                                  'long'
                                )}.`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
              <section className={styles.recommendations}>
                <div>
                  <h3 dir='auto'>Recommendations</h3>
                  <div className={styles.scroll_wrap}>
                    {recommendations.length > 0 && (
                      <div className={styles.scroll} onScroll={handleScroll}>
                        {recommendations.map((recommendation) => (
                          <div className={styles.item} key={recommendation.id}>
                            <div
                              className={`${styles['img-container']} ${
                                !recommendation.backdrop_path
                                  ? styles['no-image']
                                  : ''
                              }`}
                            >
                              <Link
                                to={`/${recommendation.media_type}/${recommendation.id}`}
                                title={
                                  recommendation.name || recommendation.title
                                }
                              >
                                <img
                                  loading='lazy'
                                  className={`${
                                    !recommendation.backdrop_path
                                      ? styles['fallback-poster']
                                      : ''
                                  }`}
                                  src={`${RECOMMENDATIONS_BACKDROP_URL}${recommendation.backdrop_path}`}
                                  alt={
                                    recommendation.name || recommendation.title
                                  }
                                  onError={(e) =>
                                    (e.target.src = imageErrorSrc)
                                  }
                                />
                                <div className={styles.meta}>
                                  <span className={styles.release_date}>
                                    <span className={styles.calendar}></span>
                                    {recommendation.release_date ||
                                      recommendation.first_air_date ||
                                      ''}
                                  </span>
                                </div>
                              </Link>
                            </div>
                            <p className={styles.bottom_flex}>
                              <Link
                                className={styles.title}
                                title={
                                  recommendation.name || recommendation.title
                                }
                                to={`/${recommendation.media_type}/${recommendation.id}`}
                              >
                                {recommendation.name || recommendation.title}
                              </Link>
                              <span className={styles.vote_average}>
                                {Math.round(recommendation.vote_average * 10)}%
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    {recommendations.length === 0 && (
                      <p>
                        We don't have enough data to suggest any movies based on{' '}
                        {movieData.name}. You can help by rating movies you've
                        seen.
                      </p>
                    )}
                  </div>
                </div>
              </section>
            </div>
            <div className={styles.grey_column}>
              <div>
                <section className={styles.split_column}>
                  <div>
                    <div className={styles.column}>
                      <section className={styles.left_column}>
                        <p>
                          <strong>Status</strong>
                          {movieData.status}
                        </p>
                        {movieData.networks && (
                          <>
                            <p className={styles.no_bottom_spacing}>
                              <strong>Networks</strong>
                            </p>
                            <ul className={styles.networks}>
                              {movieData.networks.map((network) => (
                                <li key={network.id}>
                                  <img
                                    src={`${NETWORK_URL}${network.logo_path}`}
                                    alt={network.name}
                                    loading='lazy'
                                  />
                                </li>
                              ))}
                              {movieData.networks.length === 0 && <li>-</li>}
                            </ul>
                          </>
                        )}
                        {movieData.type && (
                          <p>
                            <strong>Type</strong>
                            {movieData.type}
                          </p>
                        )}
                        <p>
                          <strong>Original Language</strong>
                          {new Intl.DisplayNames(['en'], {
                            type: 'language',
                          }).of(movieData.original_language)}
                        </p>
                        {type === 'movie' && (
                          <>
                            <p>
                              <strong>Budget</strong>
                              {(movieData.budget &&
                                new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: 'USD',
                                }).format(movieData.budget)) ||
                                '-'}
                            </p>
                            <p>
                              <strong>Revenue</strong>
                              {(movieData.revenue &&
                                new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: 'USD',
                                }).format(movieData.revenue)) ||
                                '-'}
                            </p>
                          </>
                        )}
                      </section>
                      <section className={styles.keywords_section}>
                        <h4>Keywords</h4>
                        <ul className={styles.keywords}>
                          {keywordData &&
                            keywordData.map((keyword_data) => (
                              <li key={keyword_data.id}>
                                <span className={styles.keyword}>
                                  {keyword_data.name}
                                </span>
                              </li>
                            ))}
                          {!keywordData?.length &&
                            'No keywords have been added.'}
                        </ul>
                      </section>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};
