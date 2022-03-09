import { CardActionArea, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import imageErrorSrc from '../../assets/image-fallback.svg';
import { IMAGE_URL } from '../../Constants';
import { convertDate } from '../../Helpers/ConvertDate';
import styles from './MovieCard.module.scss';

const MovieCard = ({ data }) => {
  const navigate = useNavigate();

  const rating = data.vote_average * 10;

  const ratingColor =
    rating >= 70
      ? 'success'
      : rating < 70 && rating >= 40
      ? 'warning'
      : 'error';

  const onViewMoreInfo = () => {
    console.log('onViewMoreInfo', data);
    const type = data.media_type === 'movie' ? 'movie' : 'tv';
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
        <div className={styles.rating}>
          <Box className={styles.rating__circle}>
            <CircularProgress
              variant='determinate'
              color={ratingColor}
              value={rating}
              size={35}
            />
            <Box className={styles['rating__text-container']}>
              <Typography
                variant='caption'
                component='span'
                className={styles.rating__text}
              >
                {rating}
                <sup>%</sup>
              </Typography>
            </Box>
          </Box>
        </div>
        <h2 className={styles.title}>{data.title || data.name}</h2>
        <p className={styles.release_date}>
          {convertDate(data.release_date || data.first_air_date)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
