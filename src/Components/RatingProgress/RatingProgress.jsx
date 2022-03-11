import { Box, CircularProgress, Typography } from '@mui/material';

export const RatingProgress = ({ size, vote_average, styles }) => {
  const rating = vote_average * 10;

  const ratingColor =
    rating >= 70
      ? 'success'
      : rating < 70 && rating >= 40
      ? 'warning'
      : 'error';

  return (
    <div className={styles.rating}>
      <Box className={styles.rating__circle}>
        <CircularProgress
          variant='determinate'
          color={ratingColor}
          value={rating}
          size={size}
        />
        <Box className={styles['rating__text-container']}>
          <Typography
            variant='caption'
            component='span'
            className={styles.rating__text}
          >
            {rating || 'NA'}
            <sup>%</sup>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};
