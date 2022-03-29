import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../../Constants';
import { convertDate } from '../../Helpers/ConvertDate';
import { RatingProgress } from '../../Components/RatingProgress/RatingProgress';
import imageErrorSrc from '../../assets/image-fallback.svg';
import styles from './Category-Card.module.scss';

const CategoryCard = ({ data, type }) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <div className={styles.wrapper}>
          <Link to={`/${type}/${data.id}`} className={styles.image}>
            <img
              loading='lazy'
              src={`${IMAGE_URL}${data.poster_path}`}
              alt='poster'
              className={`${styles.poster} ${
                !data.poster_path ? styles['fallback-poster'] : ''
              }`}
              onError={(e) => (e.target.src = imageErrorSrc)}
            />
          </Link>
        </div>
      </div>
      <div className={styles.content}>
        <RatingProgress
          size={35}
          vote_average={data.vote_average}
          styles={styles}
          showNR
        />
        <h2>
          <Link to={`/${type}/${data.id}`} title={data.title}>
            {data.name || data.title}
          </Link>
        </h2>
        <p>
          {(data.release_date || data.first_air_date) &&
            convertDate(data.release_date || data.first_air_date)}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
