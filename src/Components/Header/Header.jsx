import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Slide,
  IconButton,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useAuth } from '../../Auth/authContext';
import { LogoutDialog } from '../LogoutDialog/LogoutDialog';
import { default as logoBig } from '../../assets/icons/logo_big.svg';
import { default as logoSmall } from '../../assets/icons/logo_small.svg';
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
  const navigate = useNavigate();

  const { currentUser, logout } = useAuth();
  const [logoutProps, setLogoutProps] = useState({
    open: false,
    handleClose: () => {},
    logout,
  });

  const openLogoutDialog = () => {
    setLogoutProps({
      open: true,
      handleClose: () => {
        setLogoutProps({
          open: false,
          handleClose: () => {},
          logout,
        });
      },
      logout,
    });
  };

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar position='sticky' className={styles['app-bar']}>
          <Toolbar className={styles.toolbar}>
            <div
              className={styles['header-container']}
              style={{
                maxWidth:
                  window.location.pathname === '/' ? '1300px' : '1400px',
              }}
            >
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                className={styles.hamburger}
              >
                <MenuIcon />
              </IconButton>
              <div className={styles['inner-nav']}>
                <picture onClick={() => navigate('/')}>
                  <source
                    media='(min-width:745px)'
                    srcSet={logoBig}
                    type='image/svg+xml'
                  />
                  <img
                    src={logoSmall}
                    className={styles.logo}
                    alt='The Movie Database (TMDB)'
                    width='154'
                    height='20'
                    loading='lazy'
                  />
                </picture>
                <ul className={`${styles['nav-items']} ${styles.left}`}>
                  <li className={styles['nav-item']}>
                    <span className={styles['nav-heading']}>Movies</span>
                    <div className={styles['nav-item-dropdown']}>
                      <ul className={styles['sub-nav-items']}>
                        <Link to='movie/category/popular'>
                          <li className={styles['sub-nav-item']}>Popular</li>
                        </Link>
                        <Link to='movie/category/now-playing'>
                          <li className={styles['sub-nav-item']}>
                            Now Playing
                          </li>
                        </Link>
                        <Link to='movie/category/upcoming'>
                          <li className={styles['sub-nav-item']}>Upcoming</li>
                        </Link>
                        <Link to='movie/category/top-rated'>
                          <li className={styles['sub-nav-item']}>Top Rated</li>
                        </Link>
                      </ul>
                    </div>
                  </li>
                  <li className={styles['nav-item']}>
                    <span className={styles['nav-heading']}>TV Shows</span>
                    <div className={styles['nav-item-dropdown']}>
                      <ul className={styles['sub-nav-items']}>
                        <Link to='tv/category/popular'>
                          <li className={styles['sub-nav-item']}>Popular</li>
                        </Link>
                        <Link to='tv/category/airing-today'>
                          <li className={styles['sub-nav-item']}>
                            Airing Today
                          </li>
                        </Link>
                        <Link to='tv/category/on-the-air'>
                          <li className={styles['sub-nav-item']}>On TV</li>
                        </Link>
                        <Link to='tv/category/top-rated'>
                          <li className={styles['sub-nav-item']}>Top Rated</li>
                        </Link>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <ul className={`${styles['nav-items']} ${styles.right}`}>
                {!currentUser && (
                  <li
                    className={styles['nav-item-right']}
                    onClick={props.openLoginPopup}
                  >
                    Login
                  </li>
                )}
                {currentUser && (
                  <>
                    <li className={styles['nav-item-right']}>
                      <IconButton sx={{ color: '#fff' }}>
                        <NotificationsIcon />
                      </IconButton>
                    </li>
                    <li className={styles['nav-item-right']}>
                      <Avatar
                        sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}
                      >
                        <span className={styles['avatar-text']}>
                          {currentUser.email.charAt(0)}
                        </span>
                      </Avatar>
                    </li>
                    <li className={styles['nav-item-right']}>
                      <IconButton
                        onClick={openLogoutDialog}
                        sx={{ color: '#fff' }}
                      >
                        <LogoutIcon />
                      </IconButton>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <LogoutDialog {...logoutProps} />
    </>
  );
}
