import { useEffect, useState } from 'react';
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

import PropTypes from 'prop-types';

import { AuthDialog } from '../AuthDialog/AuthDialog';
import { useAuth } from '../../Auth/authContext';
import { LogoutDialog } from '../LogoutDialog/LogoutDialog';
import useActivity from '../../Hooks/useActivity';
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
  const { currentUser, logout } = useAuth();
  const activityCount = useActivity();

  const INITIAL_PROPS = {
    open: false,
    handleClose: () => {},
  };

  const [dialogProps, setDialogProps] = useState(INITIAL_PROPS);
  const [logoutProps, setLogoutProps] = useState({
    open: false,
    handleClose: () => {},
    logout,
  });

  const handleClose = () => {
    setDialogProps(INITIAL_PROPS);
  };

  const openModal = () => {
    setDialogProps({
      open: true,
      handleClose,
    });
  };

  const openLogoutDialog = () => {
    setLogoutProps({
      open: true,
      handleClose: () =>
        setLogoutProps({
          open: false,
          handleClose: () => {},
          logout,
        }),
      logout,
    });
  };

  useEffect(() => {
    if (activityCount === 3) {
      openModal();
    }
  }, [activityCount]);

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar position='sticky' className={styles['app-bar']}>
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
                  <li className={styles['nav-item']}>
                    Movies
                    <div className={styles['nav-item-dropdown']}>
                      <ul className={styles['sub-nav-items']}>
                        <li className={styles['sub-nav-item']}>Popular</li>
                        <li className={styles['sub-nav-item']}>Now Playing</li>
                        <li className={styles['sub-nav-item']}>Upcoming</li>
                        <li className={styles['sub-nav-item']}>Top Rated</li>
                      </ul>
                    </div>
                  </li>
                  <li className={styles['nav-item']}>
                    TV Shows
                    <div className={styles['nav-item-dropdown']}>
                      <ul className={styles['sub-nav-items']}>
                        <li className={styles['sub-nav-item']}>Popular</li>
                        <li className={styles['sub-nav-item']}>
                          Airing Today
                        </li>
                        <li className={styles['sub-nav-item']}>On TV</li>
                        <li className={styles['sub-nav-item']}>Top Rated</li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <ul className={styles['nav-items']}>
                {!currentUser && (
                  <li className={styles['nav-item']} onClick={openModal}>
                    Login
                  </li>
                )}
                {currentUser && (
                  <>
                    <li className={styles['nav-item']}>
                      <IconButton sx={{ color: '#fff' }}>
                        <NotificationsIcon />
                      </IconButton>
                    </li>
                    <li className={styles['nav-item']}>
                      <Avatar
                        sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}
                      >
                        <span className={styles['avatar-text']}>
                          {currentUser.email.charAt(0)}
                        </span>
                      </Avatar>
                    </li>
                    <li className={styles['nav-item']}>
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
      <AuthDialog {...dialogProps} />
      <LogoutDialog {...logoutProps} />
    </>
  );
}
