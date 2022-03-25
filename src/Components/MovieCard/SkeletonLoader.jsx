import { Skeleton } from '@mui/material';
import styles from './MovieCard.module.scss';

export const SkeletonLoader = () => {
  return (
    <div className={styles.movie__card}>
      <div className={styles['movie__img-container']}>
        <div className={styles.wrapper}>
          <Skeleton
            animation='wave'
            variant='rectangular'
            width='100%'
            height='100%'
          />
        </div>
      </div>
      <div className={styles.movie__content}>
        <div className={styles.rating}>
          <Skeleton
            animation='wave'
            variant='circular'
            width={40}
            height={40}
          />
        </div>
        <Skeleton animation='wave' height={10} sx={{ mb: 1 }} width='100%' />
        <Skeleton animation='wave' height={10} width='60%' />
      </div>
    </div>
  );
};
