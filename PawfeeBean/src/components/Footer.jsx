import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useThemeContext } from '../theme/ThemeContextProvider';

const Footer = () => {
  const { mode } = useThemeContext();
  const isLight = mode === 'light';

  return (
    <Box sx={{ 
      py: 6, 
      borderTop: isLight ? '1px solid rgba(141, 110, 99, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
      backgroundColor: isLight ? 'rgba(255,255,255,0.4)' : 'rgba(30,20,16,0.4)',
      backdropFilter: 'blur(10px)'
    }}>
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
          Pawfee Bean
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          © 2026 Pawfee Bean. All Rights Reserved.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', transform: 'translateY(-3px)' }, transition: 'all 0.3s' }}>
            <FacebookIcon />
          </IconButton>
          <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', transform: 'translateY(-3px)' }, transition: 'all 0.3s' }}>
            <InstagramIcon />
          </IconButton>
          <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', transform: 'translateY(-3px)' }, transition: 'all 0.3s' }}>
            <TwitterIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
