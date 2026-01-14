import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@/shared/context/AuthContext';
import { store } from '@/shared/store';
import { theme } from '@/shared/theme';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Provide Redux store to the entire app */}
    <Provider store={store}>
      {/* Enable client-side routing */}
      <BrowserRouter basename="/ecommerce-react-app/">
        {/* Auth context */}
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3}>
              <App />
            </SnackbarProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
