import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import imageErrorSrc from '../../assets/image-fallback.svg';
import { IMAGE_URL } from '../../Constants';
import styles from './MovieCard.module.scss';

const MovieCard = ({ data }) => {
  const convertDate = (date) => {
    const newDate = new Date(date);
    const formateDate = new Intl.DateTimeFormat('default', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
    return formateDate.format(newDate);
  };

  const rating = data.vote_average * 10;
  const ratingColor =
    rating >= 70
      ? 'success'
      : rating < 70 && rating >= 40
      ? 'warning'
      : 'error';

  return (
    <div className={styles.movie__card}>
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
