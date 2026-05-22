import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, AppBar, Toolbar, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeContext } from '../../theme/ThemeContextProvider';
import logo from '../../assets/PAWFEE_BEAN_LOGO.jpg';

const drawerWidth = 260;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode } = useThemeContext();
  const isLight = mode === 'light';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    navigate('/auth');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Menu Manager', icon: <RestaurantMenuIcon />, path: '/admin/menu' },
    { text: 'User Manager', icon: <PeopleIcon />, path: '/admin/users' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', pt: 2, px: 2 }}>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: isLight ? 'rgba(255,255,255,0.7)' : 'rgba(18,18,20,0.7)',
            backdropFilter: 'blur(20px)',
            border: isLight ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.05)',
            boxShadow: isLight ? '0 10px 40px rgba(0,0,0,0.05)' : '0 10px 40px rgba(0,0,0,0.4)',
            borderRadius: '24px',
            height: 'calc(100vh - 32px)',
            top: 16,
            left: 16,
            overflow: 'hidden'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box component="img" src={logo} sx={{ width: 60, height: 60, borderRadius: '16px', objectFit: 'cover', mb: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.5px' }}>
            Pawfee <span style={{ color: '#2563EB', fontStyle: 'italic' }}>Admin</span>
          </Typography>
        </Box>

        <List sx={{ px: 3, flexGrow: 1 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  mb: 1.5,
                  py: 1.5,
                  borderRadius: '16px',
                  backgroundColor: isActive ? '#2563EB' : 'transparent',
                  color: isActive ? '#ffffff' : 'text.secondary',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: isActive ? '#1D4ED8' : (isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)'),
                    transform: 'translateX(5px)'
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }} />
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ px: 3, pb: 4 }}>
          <Divider sx={{ mb: 3, opacity: 0.5 }} />
          <ListItem
            button
            onClick={() => navigate('/')}
            sx={{ mb: 1, borderRadius: '16px', color: 'text.secondary', '&:hover': { backgroundColor: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)' } }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><HomeIcon /></ListItemIcon>
            <ListItemText primary="Back to Site" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItem>

          <ListItem
            button
            onClick={handleLogout}
            sx={{
              borderRadius: '16px',
              color: '#EF4444',
              '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItem>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 4, ml: `${drawerWidth}px`, maxWidth: 'calc(100% - 260px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ height: '100%' }}
        >
          <Outlet />
        </motion.div>
      </Box>
    </Box>
  );
};

export default AdminLayout;
