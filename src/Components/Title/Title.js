import styles from './Title.module.scss';

const Title = ({ children }) => {
  return <h1 className={styles.heading}>{children}</h1>;
};

export default Title;
