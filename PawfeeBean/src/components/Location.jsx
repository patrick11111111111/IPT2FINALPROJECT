import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { motion } from 'framer-motion';

const Location = () => {
  return (
    <Box id="location" sx={{ position: 'relative', maxWidth: '1200px', mx: 'auto' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="overline" sx={{ color: '#2563EB', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.875rem' }}>
            FIND US
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, color: 'text.primary', mb: 2, letterSpacing: '-0.02em' }}>
            Visit Us
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            We can't wait to welcome you and your furry friends.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: { xs: 4, md: 6 }, height: '100%',
              borderRadius: '16px',
              backgroundColor: 'background.paper',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 5 }}>
                <LocationOnIcon sx={{ color: '#2563EB', fontSize: 36, mr: 3, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>Our Location</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    No.13, Zamora Street, Don Domingo Maddela,<br />
                    Bayombong, Nueva Vizcaya
                  </Typography>
                  <Button variant="outlined" sx={{ mt: 3, borderRadius: '8px', color: '#2563EB', borderColor: '#2563EB', '&:hover': { borderColor: '#1d4ed8', backgroundColor: 'rgba(37, 99, 235, 0.04)' } }} size="small">
                    Get Directions
                  </Button>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <AccessTimeIcon sx={{ color: '#2563EB', fontSize: 36, mr: 3, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>Opening Hours</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    Monday - Friday: 8:00 AM - 9:00 PM<br />
                    Saturday - Sunday: 9:00 AM - 10:00 PM
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Map */}
            <Box sx={{
              height: '100%', minHeight: '400px',
              borderRadius: '16px',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
              overflow: 'hidden'
            }}>
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src="https://maps.google.com/maps?q=Pawfee%20Bean%20Bayombong%2C%20Nueva%20Vizcaya&t=&z=16&ie=UTF8&iwloc=&output=embed"
                title="Pawfee Bean Location"
                style={{ border: 0 }}
              />
            </Box>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Location;
