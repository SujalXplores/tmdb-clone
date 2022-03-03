import styles from './Title.module.scss';

const Title = ({ children }) => {
  return (
    <div className={styles.col__header}>
      <h2 className={styles.heading}>{children}</h2>
    </div>
  );
};

export default Title;
