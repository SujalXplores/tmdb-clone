import { useEffect, useState } from 'react';

import { AuthDialog } from './Components/AuthDialog/AuthDialog';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Router from './Router';
import useActivity from './Hooks/useActivity';

const App = () => {
  const INITIAL_PROPS = {
    open: false,
    handleClose: () => {},
  };

  const { activityCount, setActivityCount } = useActivity();
  const [dialogProps, setDialogProps] = useState(INITIAL_PROPS);

  const handleClose = () => {
    setDialogProps(INITIAL_PROPS);
  };

  const openLoginPopup = () => {
    console.log('open');
    setDialogProps({
      open: true,
      handleClose,
    });
  };

  useEffect(() => {
    if (activityCount === 3) {
      openLoginPopup();
      setActivityCount(3);
    }
  }, [activityCount]);

  return (
    <>
      <Header openLoginPopup={openLoginPopup} />
      <main className='main__container'>
        <Router />
      </main>
      <Footer openLoginPopup={openLoginPopup} />
      <AuthDialog {...dialogProps} />
    </>
  );
};

export default App;
