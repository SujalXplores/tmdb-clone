import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Slide,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';

import styles from './Header.module.scss';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

Header.propTypes = {
  children: PropTypes.node,
  window: PropTypes.func,
};

export default function Header(props) {
  return (
    <HideOnScroll {...props}>
      <AppBar position='sticky' className={styles.appbar}>
        <Toolbar className={styles.toolbar}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            className={styles.hamburger}
          >
            <MenuIcon />
          </IconButton>
          <div className={styles['header-container']}>
            <div className={styles['inner-nav']}>
              <img
                src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
                alt='The Movie Database (TMDB)'
                width='154'
                height='20'
                loading='lazy'
              />
              <ul className={styles['nav-items']}>
                <li className={styles['nav-item']}>Movies</li>
                <li className={styles['nav-item']}>TV Shows</li>
              </ul>
            </div>
            <ul className={styles['nav-items']}>
              <li className={styles['nav-item']}>Login</li>
              <li className={styles['nav-item']}>Join TMDB</li>
            </ul>
          </div>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
