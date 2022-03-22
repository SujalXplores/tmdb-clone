import axios from 'axios';
import { useCallback, useLayoutEffect, useState } from 'react';
import { ReactComponent as PersonMale } from '../../assets/person-male.svg';
import { ReactComponent as PersonFemale } from '../../assets/person-female.svg';
import { API, API_URL, CAST_URL, NETWORK_URL } from '../../Constants';

import styles from './CastContainer.module.scss';

export const CastContainer = ({ type, id, movieData }) => {
  const [castData, setCastData] = useState([]);
  const [keywordData, setKeywordData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCast = useCallback(async () => {
    const credits_url = `${API_URL}/${type}/${id}/credits?api_key=${API}`;
    const keywords_url = `${API_URL}/${type}/${id}/keywords?api_key=${API}`;
    try {
      const res = await axios.all([
        axios.get(credits_url),
        axios.get(keywords_url),
      ]);
      const [credits, keywords] = res;
      setCastData(credits.data.cast);
      setKeywordData(keywords.data.results || keywords.data.keywords);
      console.log('✅ Cast fetching done');
    } catch (error) {
      console.log('💀 Cast fetching failed', error);
    } finally {
      setLoading(false);
    }
  }, [type, id]);

  useLayoutEffect(() => {
    fetchCast();
  }, [fetchCast]);

  return (
    !loading &&
    castData && (
      <>
        <div className={styles.column_wrapper}>
          <div className={styles.content_wrapper}>
            <div>
              <div className={styles.white_column}>
                <section className={styles.cast_section}>
                  <h3 dir='auto'>
                    {type === 'movie' ? 'Top Billed Cast' : 'Series Cast'}
                  </h3>
                  <div className={styles.scroll_fade}>
                    <ol className={styles.people}>
                      {castData.slice(0, 9).map((cast) => (
                        <li className={styles.card} key={cast.id}>
                          {cast.profile_path ? (
                            <img
                              loading='lazy'
                              className={styles.profile}
                              src={`${CAST_URL}${cast.profile_path}`}
                              alt={cast.name}
                            />
                          ) : cast.gender ? (
                            <PersonFemale className={styles.no_image} />
                          ) : (
                            <PersonMale className={styles.no_image} />
                          )}
                          <p className={styles.name}>{cast.name}</p>
                          <p className={styles.character}>{cast.character}</p>
                        </li>
                      ))}
                      {!castData.length && (
                        <li>
                          We don't have any cast added to this Show. You can
                          help by adding some!
                        </li>
                      )}
                    </ol>
                  </div>
                </section>
              </div>
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
                        <p className={styles.no_bottom_spacing}>
                          <strong>Networks</strong>
                        </p>
                        {movieData.networks && (
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
                          </ul>
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
