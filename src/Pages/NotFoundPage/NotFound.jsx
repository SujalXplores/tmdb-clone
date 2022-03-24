import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles['column-wrapper']}>
      <div className={styles['content-wrapper']}>
        <div>
          <div className={styles['error-wrapper']}>
            <h2>Oops! We can't find the page you're looking for</h2>
          </div>
          <p>
            You tried to request a page that doesn't exist. If you believe this
            to be in error, let us know <Link to='/'>on the forums</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};
