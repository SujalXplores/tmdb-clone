import { forwardRef, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
  Slide,
  Alert,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import useInput from '../../Hooks/useInput';
import { useAuth } from '../../Auth/authContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role='tabpanel' hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const AuthDialog = ({ open, handleClose }) => {
  let loginFormIsValid = false;
  let signUpFormIsValid = false;

  const [tabIndex, setTabIndex] = useState(0);
  const { login, currentUser, signUp, loginError, signUpError } = useAuth();

  const isNotEmpty = (val) => val.trim() !== '';
  const isValidEmail = (val) => /^\S+@\S+\.\S+$/.test(val);

  const {
    value: enteredLoginInEmail,
    isValid: loginInEmailIsValid,
    hasError: loginInEmailHasError,
    valueChangeHandler: loginInEmailChangeHandler,
    inputBlurHandler: loginInEmailBlurHandler,
    reset: resetLoginInEmail,
  } = useInput(isValidEmail);

  const {
    value: enteredLoginInPassword,
    isValid: loginInPasswordIsValid,
    hasError: loginInPasswordHasError,
    valueChangeHandler: loginInPasswordChangeHandler,
    inputBlurHandler: loginInPasswordBlurHandler,
    reset: resetLoginInPassword,
  } = useInput(isNotEmpty);

  const {
    value: enteredSignUpEmail,
    isValid: signUpEmailIsValid,
    hasError: signUpEmailHasError,
    valueChangeHandler: signUpEmailChangeHandler,
    inputBlurHandler: signUpEmailBlurHandler,
    reset: resetSignUpEmail,
  } = useInput(isValidEmail);

  const {
    value: enteredSignUpPassword,
    isValid: signUpPasswordIsValid,
    hasError: signUpPasswordHasError,
    valueChangeHandler: signUpPasswordChangeHandler,
    inputBlurHandler: signUpPasswordBlurHandler,
    reset: resetSignUpPassword,
  } = useInput(isNotEmpty);

  const {
    value: enteredSignUpPasswordConfirm,
    isValid: signUpPasswordConfirmIsValid,
    hasError: signUpPasswordConfirmHasError,
    valueChangeHandler: signUpPasswordConfirmChangeHandler,
    inputBlurHandler: signUpPasswordConfirmBlurHandler,
    reset: resetSignUpPasswordConfirm,
  } = useInput((val) => val === enteredSignUpPassword);

  const resetAllInputs = () => {
    resetLoginInEmail();
    resetLoginInPassword();
    resetSignUpEmail();
    resetSignUpPassword();
    resetSignUpPasswordConfirm();
  };

  const onClose = () => {
    handleClose();
    resetAllInputs();
  };

  useEffect(() => {
    resetAllInputs();
  }, [open]);

  useEffect(() => {
    currentUser && onClose();
  }, [currentUser]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginFormIsValid) {
      return;
    }
    login(enteredLoginInEmail, enteredLoginInPassword);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!signUpFormIsValid) {
      return;
    }
    signUp(enteredSignUpEmail, enteredSignUpPasswordConfirm);
  };

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  if (loginInEmailIsValid && loginInPasswordIsValid) {
    loginFormIsValid = true;
  }

  if (
    signUpEmailIsValid &&
    signUpPasswordIsValid &&
    signUpPasswordConfirmIsValid
  ) {
    signUpFormIsValid = true;
  }

  return (
    <Dialog open={open} TransitionComponent={Transition}>
      <Tabs value={tabIndex} onChange={handleChangeTab}>
        <Tab label='Login' />
        <Tab label='Sign Up' />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <DialogContent dividers>
          {loginError && <Alert severity='error'>{loginError}</Alert>}
          <TextField
            autoFocus
            required
            margin='normal'
            label='Email Address'
            type='email'
            fullWidth
            variant='outlined'
            InputProps={{
              endAdornment: <MailOutlineIcon />,
            }}
            value={enteredLoginInEmail}
            onChange={loginInEmailChangeHandler}
            onBlur={loginInEmailBlurHandler}
            error={loginInEmailHasError}
            helperText={loginInEmailHasError ? 'Invalid email address' : ''}
          />
          <TextField
            required
            margin='normal'
            label='Password'
            type='password'
            fullWidth
            variant='outlined'
            value={enteredLoginInPassword}
            onChange={loginInPasswordChangeHandler}
            onBlur={loginInPasswordBlurHandler}
            error={loginInPasswordHasError}
            helperText={loginInPasswordHasError ? 'Invalid password' : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin} disabled={!loginFormIsValid}>
            Login
          </Button>
        </DialogActions>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <DialogContent dividers>
          {signUpError && <Alert severity='error'>{signUpError}</Alert>}
          <TextField
            autoFocus
            required
            margin='normal'
            label='Email Address'
            type='email'
            fullWidth
            variant='outlined'
            InputProps={{
              endAdornment: <MailOutlineIcon />,
            }}
            value={enteredSignUpEmail}
            onChange={signUpEmailChangeHandler}
            onBlur={signUpEmailBlurHandler}
            error={signUpEmailHasError}
            helperText={signUpEmailHasError ? 'Invalid email address' : ''}
          />
          <TextField
            required
            margin='normal'
            label='Password'
            type='password'
            fullWidth
            variant='outlined'
            value={enteredSignUpPassword}
            onChange={signUpPasswordChangeHandler}
            onBlur={signUpPasswordBlurHandler}
            error={signUpPasswordHasError}
            helperText={signUpPasswordHasError ? 'Invalid password' : ''}
          />
          <TextField
            required
            margin='normal'
            label='Confirm Password'
            type='password'
            fullWidth
            variant='outlined'
            value={enteredSignUpPasswordConfirm}
            onChange={signUpPasswordConfirmChangeHandler}
            onBlur={signUpPasswordConfirmBlurHandler}
            error={signUpPasswordConfirmHasError}
            helperText={
              signUpPasswordConfirmHasError ? 'Passwords do not match' : ''
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSignUp} disabled={!signUpFormIsValid}>
            SignUp
          </Button>
        </DialogActions>
      </TabPanel>
    </Dialog>
  );
};
