import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

import './index.scss';

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    success: {
      main: '#21d07a',
    },
    warning: {
      main: '#d2d531',
    },
    error: {
      main: '#db2360',
    },
  },
});

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </StrictMode>
);
