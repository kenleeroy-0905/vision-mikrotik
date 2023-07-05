import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const AppRouter = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <BrowserRouter>
      <Box sx={styles.container}>
        {!isLoginPage && <SideNav />}
        <Box component="main" sx={styles.mainSection}>
          <AppRoutes />
        </Box>
      </Box>
    </BrowserRouter>
  );
};

/**
 * @type {import('@mui/material').SxProps}
 */
const styles = {
    container: {
      display: 'flex',
      bgcolor: 'neutral.light',
      height: 'calc(100% - 64px)'
    },
    mainSection: {
      p: 4,
      width: '100%',
      height: '100%',
      overflow: 'auto',
    }
  }

  export default AppRouter;