import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles['not-found-container']}>
      <h1>Oops! We can't find the page you're looking for</h1>
    </div>
  );
};
