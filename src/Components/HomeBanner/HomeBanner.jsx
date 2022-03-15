import { useState } from 'react';
import styles from './HomeBanner.module.scss';

const HomeBanner = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchQuery);
  };

  return (
    <section className={styles['banner-container']}>
      <div className={styles['media']}>
        <div className={styles.column_wrapper}>
          <div className={styles.content_wrapper}>
            <div className={styles.title}>
              <h2>Welcome.</h2>
              <h3>
                Millions of movies, TV shows and people to discover. Explore
                now.
              </h3>
            </div>

            <div className={styles.search}>
              <form>
                <label>
                  <input
                    name='query'
                    type='text'
                    tabIndex='1'
                    autoCorrect='off'
                    autoComplete='off'
                    spellCheck='false'
                    placeholder='Search for a movie, tv show, person......'
                    value={searchQuery}
                    onChange={onSearchChange}
                  />
                </label>
                <button type='submit' onClick={handleSearch}>Search</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
