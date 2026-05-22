import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Container, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LoginIcon from '@mui/icons-material/Login';
import { useThemeContext } from '../theme/ThemeContextProvider';
import logo from '../assets/PAWFEE_BEAN_LOGO.jpg';

const Header = () => {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeContext();
  const isLight = mode === 'light';

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{
      background: isLight ? 'rgba(255,255,255,0.7)' : 'rgba(18,18,20,0.7)',
      backdropFilter: 'blur(16px)',
      borderBottom: isLight ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.05)',
      color: 'text.primary',
      zIndex: 1100,
      py: 0.5
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <Box
              component="img"
              src={logo}
              alt="Pawfee Bean Logo"
              sx={{
                height: 40,
                width: 40,
                mr: 2,
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: isLight ? '0 4px 12px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.3)',
              }}
            />
            <Typography variant="h6" component="div" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.5px' }}>
              Pawfee <span style={{ color: isLight ? '#5D4037' : '#D7CCC8', fontStyle: 'italic' }}>Bean</span>
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', cursor: 'pointer', transition: 'color 0.3s', '&:hover': { color: '#2563EB' } }} onClick={() => handleScroll('menu')}>Menu</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', cursor: 'pointer', transition: 'color 0.3s', '&:hover': { color: '#2563EB' } }} onClick={() => handleScroll('about')}>About</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', cursor: 'pointer', transition: 'color 0.3s', '&:hover': { color: '#2563EB' } }} onClick={() => handleScroll('location')}>Location</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={toggleTheme} size="small" sx={{ color: 'text.secondary', transition: 'transform 0.3s', '&:hover': { transform: 'rotate(45deg)' } }}>
              {isLight ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
            </IconButton>

            <Box sx={{ width: '1px', height: '24px', backgroundColor: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)' }} />

            <Button
              variant="text"
              color="inherit"
              startIcon={<LoginIcon />}
              onClick={() => navigate('/auth')}
              sx={{ fontWeight: 600, textTransform: 'none', color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
            >
              Admin Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
