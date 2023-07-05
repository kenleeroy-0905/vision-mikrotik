import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Analytics from './containers/Analytics/Analytics';
import theme from './config/theme';
import AppHeader from './components/AppHeader';
import SideNav from './components/SideNav';
import Login from './containers/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch({ type: 'LOGIN' });
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppHeader isLoggedIn={isLoggedIn} />
        <Box sx={styles.container}>
          <BrowserRouter>
          <ToastContainer />
            {isLoggedIn && <SideNav onLogout={handleLogout}/>}
            <Box component="main" sx={styles.mainSection}>
              <Routes>
                <Route
                  path="/analytics"
                  element={isLoggedIn ? <Analytics /> : <Navigate to="/" replace={true} />}
                />
                <Route
                  path="/"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/analytics" replace={true} />
                    ) : (
                      <Login onLogin={handleLogin} />
                    )
                  }
                />
              </Routes>
            </Box>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
};

const styles = {
  container: {
    display: 'flex',
    bgcolor: 'neutral.light',
    height: 'calc(100% - 64px)',
  },
  mainSection: {
    p: 4,
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
};

export default App;
