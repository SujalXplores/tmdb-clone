import { useParams } from 'react-router-dom';
import CustomAccordion from './CustomAccordion';

import styles from './Categories.module.scss';
import CategoryCard from './Category-Card';

const Categories = () => {
  const params = useParams();
  const { type, category } = params;

  console.log('PARAMS:', params);
  return (
    <>
      <section className={styles.inner_content}>
        <div className={styles.media}>
          <div className={styles.column_wrapper}>
            <div className={styles.content_wrapper}>
              <div className={styles.title}>
                <h2>
                  {category} {type}
                </h2>
              </div>
              <div className={styles.content}>
                <div className={styles.filter_container}>
                  <CustomAccordion title='Sort'>
                    Sorting dropdown
                  </CustomAccordion>
                  <CustomAccordion title='Filters'>Filters</CustomAccordion>
                  <CustomAccordion title='Where To Watch'>
                    Where to watch
                  </CustomAccordion>
                </div>
                <div>
                  <div className={styles.right_media_container}>
                    <section className={styles.panel_results}>
                      <div className={styles.media_item_results}>
                        <div className={styles.page_wrapper}>
                          <CategoryCard />
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
