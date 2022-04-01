import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const SpinnerContext = createContext();

const http = axios.create();

export function useSpinner() {
  return useContext(SpinnerContext);
}

const GlobalSpinnerProvider = ({ children }) => {
  const [loading, setLoading] = useState(0);

  const startLoading = () => {
    setLoading(loading + 10);
  };

  useEffect(() => {
    loading > 0 && loading < 100 && setLoading((prev) => prev + 10);
    if (loading === 100) {
      setLoading(0);
    }
  }, [loading]);

  http.interceptors.request.use(
    (config) => {
      startLoading();
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  http.interceptors.response.use(
    (response) => {
      console.log('response', response);
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const value = {
    value: loading,
    isLoading: loading > 0,
    startLoading,
  };

  return (
    <SpinnerContext.Provider value={value}>{children}</SpinnerContext.Provider>
  );
};

export { http };
export default GlobalSpinnerProvider;
