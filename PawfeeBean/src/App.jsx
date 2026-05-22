import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import MenuManager from './pages/admin/MenuManager';
import UserManager from './pages/admin/UserManager';
import ProtectedRoute from './components/ProtectedRoute';
import { useThemeContext } from './theme/ThemeContextProvider';

const BackgroundBlobs = () => {
  const { mode } = useThemeContext();
  const isLight = mode === 'light';

  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1, overflow: 'hidden', backgroundColor: 'background.default' }}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: isLight ? 'radial-gradient(circle, rgba(215,204,200,0.4) 0%, rgba(245,245,240,0) 70%)' : 'radial-gradient(circle, rgba(93,64,55,0.4) 0%, rgba(30,20,16,0) 70%)',
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: isLight ? 'radial-gradient(circle, rgba(255,179,0,0.15) 0%, rgba(245,245,240,0) 70%)' : 'radial-gradient(circle, rgba(255,202,40,0.1) 0%, rgba(30,20,16,0) 70%)',
          filter: 'blur(80px)',
        }}
      />
    </Box>
  );
};

function App() {
  return (
    <Router>
      <BackgroundBlobs />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Admin Protected Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="menu" element={<MenuManager />} />
            <Route path="users" element={<UserManager />} />
          </Route>
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
