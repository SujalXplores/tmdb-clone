import { Box, CircularProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import styles from './RatingProgress.module.scss';

const useStyles = makeStyles(() => ({
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

export const RatingProgress = ({
  size,
  vote_average,
  showNR = false,
  thickness = 2.5,
  borderThickness = 2,
  fontSize = '0.6em',
  hover = false,
  isViewMore = false,
}) => {
  const rating = vote_average * 10 ?? (showNR ? 'NR' : 0);

  const ratingColor =
    rating >= 70
      ? 'success'
      : rating < 70 && rating >= 40
      ? 'warning'
      : rating < 40 && rating > 0
      ? 'error'
      : 'info';

  const percentage =
    rating === 'NR'
      ? '65'.toString(16).padStart(2, '0')
      : Math.floor(rating).toString(16).padStart(2, '0');

  const classes = useStyles();

  return (
    <div
      className={`${styles.rating} ${hover ? styles.scale : ''} ${
        !isViewMore ? styles.position : ''
      }`}
    >
      <Box
        className={styles.rating__circle}
        style={{
          border: `${borderThickness}px solid #081c22`,
        }}
      >
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
          value={typeof rating === 'number' ? rating : 0}
          size={size}
          thickness={thickness}
        />
        <Box className={styles['rating__text-container']}>
          <Typography
            variant='caption'
            component='span'
            className={styles.rating__text}
            sx={{
              fontSize: fontSize,
              '&:before': {
                content: `"\\e9${percentage}"`,
              },
            }}
          />
        </Box>
      </Box>
    </div>
  );
};
