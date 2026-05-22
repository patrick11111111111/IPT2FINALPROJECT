import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import MenuGrid from '../components/MenuGrid';
import About from '../components/About';
import Location from '../components/Location';
import Footer from '../components/Footer';
import { useThemeContext } from '../theme/ThemeContextProvider';

const LandingPage = () => {
  const { mode } = useThemeContext();
  const isLight = mode === 'light';

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <Header />

      {/* Hero Section */}
      <Box sx={{ pt: 16, pb: 10 }}>
        <Container maxWidth="xl">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Box sx={{ textAlign: 'center', mb: 10 }}>
              <Typography variant="h2" component="h1" sx={{ color: isLight ? '#000000' : '#FFFFFF', fontWeight: 800, mb: 3, letterSpacing: '-0.02em' }}>
                Pawfee <span style={{ color: isLight ? '#5D4037' : '#D7CCC8', fontStyle: 'italic' }}>Bean</span>
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', fontWeight: 500, mb: 8 }}>
                Nueva Vizcaya's Premier Destination for Pets and Their Owners. Experience the perfect blend of premium coffee and top-notch pet grooming services.
              </Typography>

              {/* Video Advertisement Section */}
              <Box sx={{
                maxWidth: 900,
                mx: 'auto',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                position: 'relative',
                paddingTop: '42%',
                background: '#000'
              }}>
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0
                  }}
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1070173540765670&show_text=false&autoplay=1&mute=1&loop=1"
                  title="Pawfee Bean Advertisement"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />

                <Box sx={{
                  position: 'absolute',
                  top: 0, left: 0, width: '100%', height: '100%',
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.3) 100%)',
                  pointerEvents: 'none'
                }} />
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Menu Section */}
      <Box sx={{ py: 12, backgroundColor: isLight ? '#FFFFFF' : 'transparent' }}>
        <Container maxWidth="xl">
          <MenuGrid />
        </Container>
      </Box>

      {/* About Section */}
      <Box sx={{ py: 12, backgroundColor: isLight ? '#F9FAFB' : 'rgba(0,0,0,0.2)' }}>
        <Container maxWidth="xl">
          <About />
        </Container>
      </Box>

      {/* Location Section */}
      <Box sx={{ py: 12, backgroundColor: isLight ? '#FFFFFF' : 'transparent' }}>
        <Container maxWidth="xl">
          <Location />
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default LandingPage;
