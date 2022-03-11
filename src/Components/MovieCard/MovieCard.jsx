import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import imageErrorSrc from '../../assets/image-fallback.svg';
import { IMAGE_URL } from '../../Constants';
import { convertDate } from '../../Helpers/ConvertDate';
import { mediaType } from '../../Helpers/MediaType';
import { RatingProgress } from '../RatingProgress/RatingProgress';
import styles from './MovieCard.module.scss';

const MovieCard = ({ data }) => {
  const navigate = useNavigate();

  const onViewMoreInfo = () => {
    const type = mediaType(data.media_type);
    navigate(`/${type}/${data.id}`, { state: data });
  };

  return (
    <div className={styles.movie__card}>
      <CardActionArea onClick={onViewMoreInfo}>
        <div className={styles['movie__img-container']}>
          <div className={styles.wrapper}>
            <img
              loading='lazy'
              className={styles.poster}
              src={`${IMAGE_URL}${data.poster_path}`}
              alt={data.title || data.name}
              onError={(e) => (e.target.src = imageErrorSrc)}
            />
          </div>
        </div>
      </CardActionArea>
      <div className={styles.movie__content}>
        <RatingProgress
          size={35}
          vote_average={data.vote_average}
          styles={styles}
        />
        <h2 className={styles.title}>{data.title || data.name}</h2>
        <p className={styles.release_date}>
          {convertDate(data.release_date || data.first_air_date)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
