import axios from 'axios';
import { useLayoutEffect, useState } from 'react';
import { ReactComponent as PersonMale } from '../../assets/person-male.svg';
import { ReactComponent as PersonFemale } from '../../assets/person-female.svg';
import { API, API_URL, CAST_URL } from '../../Constants';

import styles from './CastContainer.module.scss';

export const CastContainer = ({ type, id }) => {
  const [castData, setCastData] = useState([]);

  useLayoutEffect(() => {
    const fetchCast = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/${type}/${id}/credits?api_key=${API}`
        );
        if (!res.status === 200) {
          throw new Error(res.statusText);
        }
        const data = await res.data;
        console.log(data);
        setCastData(data.cast);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCast();
  }, [id, type]);
  return (
    <div className={styles.column_wrapper}>
      <div className={styles.content_wrapper}>
        <div>
          <div className={styles.white_column}>
            <section className={styles.cast_section}>
              <h3 dir='auto'>Top Billed Cast</h3>
              <div className={styles.scroll_fade}>
                <ol className={styles.people}>
                  {castData.slice(0, 9).map((cast, index) => (
                    <li className={styles.card} key={index}>
                      <a href='/movie/data'>
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
                      </a>
                      <p className={styles.name}>{cast.name}</p>
                      <p className={styles.character}>{cast.character}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
