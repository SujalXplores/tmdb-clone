import { Button } from '@mui/material';
import { useAuth } from '../../Auth/authContext';
import styles from './Footer.module.scss';

const Footer = ({ openLoginPopup }) => {
  const { currentUser } = useAuth();

  return (
    <section className={styles['footer-section']}>
      <div className={styles['content-wrapper']}>
        <div className={styles['column']}>
          <div className={styles['column-header']}>
            <h2>Join Today</h2>
          </div>
          <div className={styles['column-content']}>
            <div className={styles['column']}>
              <p>
                Get access to maintain your own <em>custom personal lists</em>,{' '}
                <em>track what you've seen</em> and search and filter for{' '}
                <em>what to watch next</em>—regardless if it's in theatres, on
                TV or available on popular streaming services like Netflix,
                Hotstar, and Amazon Prime Video.
              </p>
              {!currentUser && (
                <Button
                  variant='contained'
                  color='secondary'
                  className={styles['sign-up-btn']}
                  onClick={openLoginPopup}
                >
                  Sign Up
                </Button>
              )}
            </div>
            <div className={styles['column']}>
              <ul>
                <li>Enjoy TMDB ad free</li>
                <li>Maintain a personal watchlist</li>
                <li>
                  Filter by your subscribed streaming services and find
                  something to watch
                </li>
                <li>Log the movies and TV shows you've seen</li>
                <li>Build custom lists</li>
                <li>Contribute to and improve our database</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
