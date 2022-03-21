import { Fragment, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Categories.module.scss';

const Categories = () => {
  const params = useParams();
  const { type, category } = params;

  console.log('PARAMS:', params);
  return (
    <Fragment>
      <section className={styles.inner_content}>
        <div>
          <div className={styles.column_wrapper}>
            <div className={styles.content_wrapper}>
              <div className={styles.title}>
                <h2>
                  {category} {type}
                </h2>
              </div>
              <div className={styles.content}></div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Categories;
