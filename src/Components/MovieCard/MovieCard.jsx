import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BASE_URL } from '../../Constants';
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

  return (
    <div className={styles.movie__card}>
      <div className={styles['movie__img-container']}>
        <div className={styles.image}>
          <div className={styles.wrapper}>
            <img
              loading='lazy'
              className={styles.poster}
              src={`${BASE_URL}${data.poster_path}`}
              alt={data.title || data.name}
            />
          </div>
        </div>
      </div>
      <div className={styles.movie__content}>
        <div className={styles.rating}>
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
              background: '#000000bd',
              borderRadius: '50%',
            }}
          >
            <CircularProgress
              variant='determinate'
              color={
                data.vote_average * 10 >= 70
                  ? 'success'
                  : data.vote_average * 10 < 70 && data.vote_average * 10 >= 50
                  ? 'warning'
                  : 'error'
              }
              value={data.vote_average * 10}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant='caption'
                component='div'
                color='text.secondary'
              >
                {data.vote_average * 10}%
              </Typography>
            </Box>
          </Box>
        </div>
        <h2 className={styles.title}>
          <a>{data.title || data.name}</a>
        </h2>
        <p className={styles.release_date}>
          {convertDate(data.release_date || data.first_air_date)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
