import { Link } from 'react-router-dom';
import styles from './Category-Card.module.scss';

const CategoryCard = (props) => {
  console.log(props);
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <div className={styles.wrapper}>
          <Link to='/' className={styles.image}>
            <img loading='lazy' src='' alt='poster' className={styles.poster} />
          </Link>
        </div>
      </div>
      <div className={styles.content}>
          <h2></h2>
          <p></p>
      </div>
    </div>
  );
};

export default CategoryCard;
