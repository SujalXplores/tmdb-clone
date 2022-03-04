import { Skeleton } from '@mui/material';
import styles from './MovieCard.module.scss';

export const SkeletonLoader = () => {
  return (
    <div className={styles.movie__card}>
      <div className={styles['movie__img-container']}>
        <div className={styles.image}>
          <div className={styles.wrapper}>
            <Skeleton variant='rectangular' width='100%' height='100%' />
          </div>
        </div>
      </div>
      <div className={styles.movie__content}>
        <div className={styles.rating}>
          <Skeleton variant='circular' width={40} height={40} />
        </div>
        <Skeleton
          animation='wave'
          height={10}
          style={{ mb: 6 }}
          width='100%'
        />
        <Skeleton animation='wave' height={10} width='60%' />
      </div>
    </div>
  );
};
