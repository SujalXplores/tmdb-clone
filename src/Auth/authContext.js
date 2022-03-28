import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../Firebase/firebase.utils';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginError, setLoginError] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [logOutError, setLogOutError] = useState('');

  const signUp = async (email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(user);
    } catch (error) {
      setSignUpError(error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setCurrentUser(user);
    } catch (error) {
      const errorMessage = error.message;
      setLoginError(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setLoginError('');
      setSignUpError('');
    } catch (error) {
      const errorMessage = error.message;
      setLogOutError(errorMessage);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setCurrentUser(user);
          console.log('State changed:', user);
        } else {
          setCurrentUser(null);
        }
      },
      (error) => {
        console.log('state error:', error);
      },
      () => {
        setLoginError('');
        setSignUpError('');
        setLogOutError('');
      }
    );

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    signUp,
    loginError,
    signUpError,
    logOutError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
