import React from 'react';
import { Typography, Box, Grid, Card, CardContent } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PeopleIcon from '@mui/icons-material/People';
import { motion } from 'framer-motion';
import { useThemeContext } from '../../theme/ThemeContextProvider';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const AdminDashboard = () => {
  const { mode } = useThemeContext();
  const isLight = mode === 'light';

  const cardStyle = {
    borderRadius: '24px', 
    background: isLight ? 'rgba(255,255,255,0.7)' : 'rgba(18,18,20,0.7)', 
    backdropFilter: 'blur(20px)',
    border: isLight ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.05)',
    boxShadow: isLight ? '0 10px 40px rgba(0,0,0,0.05)' : '0 10px 40px rgba(0,0,0,0.4)',
    height: '100%'
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: 'text.primary', letterSpacing: '-0.5px' }}>
        Dashboard Overview
      </Typography>

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants} style={{ height: '100%' }} whileHover={{ y: -5 }}>
              <Card sx={cardStyle}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', p: 4 }}>
                  <Box sx={{ p: 2, borderRadius: '16px', backgroundColor: 'rgba(37,99,235,0.1)', mr: 3 }}>
                    <RestaurantMenuIcon sx={{ fontSize: 40, color: '#2563EB' }} />
                  </Box>
                  <Box>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>Total Menu Items</Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>Manage Menu</Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants} style={{ height: '100%' }} whileHover={{ y: -5 }}>
              <Card sx={cardStyle}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', p: 4 }}>
                  <Box sx={{ p: 2, borderRadius: '16px', backgroundColor: 'rgba(255,179,0,0.1)', mr: 3 }}>
                    <PeopleIcon sx={{ fontSize: 40, color: '#FFB300' }} />
                  </Box>
                  <Box>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>Registered Users</Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>Manage Users</Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default AdminDashboard;
