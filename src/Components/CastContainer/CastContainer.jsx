import axios from 'axios';
import { useLayoutEffect, useState } from 'react';
import { ReactComponent as PersonMale } from '../../assets/person-male.svg';
import { ReactComponent as PersonFemale } from '../../assets/person-female.svg';
import { API, API_URL, CAST_URL } from '../../Constants';

import styles from './CastContainer.module.scss';

export const CastContainer = ({ type, id, movieData }) => {
  const [castData, setCastData] = useState([]);
  const [keywordData, setKeywordData] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const fetchCast = async () => {
      const credits_url = `${API_URL}/${type}/${id}/credits?api_key=${API}`;
      const keywords_url = `${API_URL}/${type}/${id}/keywords?api_key=${API}`;
      console.log('url', credits_url, keywords_url);
      try {
        const res = await axios.all([
          axios.get(credits_url),
          axios.get(keywords_url),
        ]);
        if (!res.status === 200) {
          throw new Error(res.statusText);
        }
        const [credits, keywords] = res;
        setCastData(credits.data.cast);
        setKeywordData(keywords.data.keywords);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchCast();
  }, [id, type]);

  return (
    !loading &&
    castData && (
      <>
        <div className={styles.column_wrapper}>
          <div className={styles.content_wrapper}>
            <div>
              <div className={styles.white_column}>
                <section className={styles.cast_section}>
                  <h3 dir='auto'>Top Billed Cast</h3>
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
                      </section>
                      <section className={styles.keywords_section}>
                        <h4>Keywords</h4>
                        <ul className={styles.keywords}>
                          {(keywordData &&
                            keywordData.map((keyword_data) => (
                              <li key={keyword_data.id}>
                                <span className={styles.keyword}>
                                  {keyword_data.name}
                                </span>
                              </li>
                            ))) ||
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
