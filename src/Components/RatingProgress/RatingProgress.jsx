import { Box, CircularProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const RatingProgress = ({
  size,
  vote_average,
  styles,
  showNR = false,
  thickness = 2.5,
}) => {
  const rating = vote_average * 10 || (showNR ? 'NR' : 0);

  const ratingColor =
    rating >= 70
      ? 'success'
      : rating < 70 && rating >= 40
      ? 'warning'
      : rating === 0 || showNR
      ? 'info'
      : 'error';

  const useStyles = makeStyles((theme) => ({
    root: {
      position: 'relative',
    },
    top: {
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
    },
    bottom: {
      opacity: 0.3,
    },
    circle: {
      strokeLinecap: 'round',
    },
  }));

  const classes = useStyles();

  return (
    <div className={styles.rating}>
      <Box className={styles.rating__circle}>
        <CircularProgress
          variant='determinate'
          className={classes.bottom}
          size={size}
          thickness={thickness}
          value={100}
          color={ratingColor}
        />
        <CircularProgress
          variant='determinate'
          className={classes.top}
          classes={{
            circle: classes.circle,
          }}
          color={ratingColor}
          value={!isNaN(rating) ? rating : 0}
          size={size}
          thickness={thickness}
        />
        <Box className={styles['rating__text-container']}>
          <Typography
            variant='caption'
            component='span'
            className={styles.rating__text}
          >
            {rating}
            {!isNaN(rating) && <sup>%</sup>}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};
