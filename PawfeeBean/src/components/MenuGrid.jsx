import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip, Divider, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useThemeContext } from '../theme/ThemeContextProvider';
import { menuData as localMenuData } from '../data/menuData';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const MenuItemCard = ({ item, categoryName = '' }) => {
  const [temp, setTemp] = useState('Hot');
  const { mode } = useThemeContext();
  const isLight = mode === 'light';

  const isBrews = categoryName.toUpperCase() === 'PAWFEE BREWS';

  return (
    <motion.div variants={itemVariants} style={{ height: '100%' }} whileHover={{ y: -8 }}>
      <Card sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative',
        borderRadius: '16px',
        boxShadow: isLight 
          ? '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02)' 
          : '0 10px 25px -3px rgba(0,0,0,0.4), 0 4px 12px -2px rgba(0,0,0,0.3)',
        border: isLight ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.05)',
        bgcolor: 'background.paper',
        overflow: 'hidden',
        transition: 'border 0.3s, box-shadow 0.3s'
      }}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', flexGrow: 1 }}>
          {item.photo && (
            <Box
              component="img"
              src={`http://localhost:5000${item.photo}`}
              alt={item.name}
              sx={{ height: 200, objectFit: 'cover', width: '100%' }}
            />
          )}

          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3, alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5, width: '100%' }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 700, lineHeight: 1.2, textAlign: 'left' }}>
                {item.isSpecial && <span style={{ color: '#FFB300', marginRight: '4px' }}>*</span>}
                {item.name}
              </Typography>
              {item.isNewItem && (
                <Chip label="NEW!" size="small" sx={{ backgroundColor: '#2563EB', color: '#ffffff', fontWeight: 'bold', height: 20 }} />
              )}
            </Box>
            
            {item.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic', textAlign: 'left' }}>
                {item.description}
              </Typography>
            )}

            {isBrews && (
              <Box sx={{ width: '100%', mb: 3 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', mb: 1 }}>
                  Selection:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Box
                    onClick={() => setTemp('Hot')}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 0.8,
                      py: 0.8,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      border: temp === 'Hot' 
                        ? (isLight ? '2px solid #E65100' : '2px solid #FF7043') 
                        : (isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)'),
                      background: temp === 'Hot' 
                        ? (isLight ? 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)' : 'linear-gradient(135deg, rgba(230,81,0,0.15) 0%, rgba(230,81,0,0.3) 100%)') 
                        : 'transparent',
                      color: temp === 'Hot' 
                        ? (isLight ? '#E65100' : '#FFB74D') 
                        : 'text.secondary',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      transition: 'all 0.3s ease',
                      boxShadow: temp === 'Hot' ? (isLight ? '0 4px 12px rgba(230,81,0,0.15)' : '0 4px 12px rgba(0,0,0,0.3)') : 'none',
                      '&:hover': {
                        borderColor: temp === 'Hot' ? (isLight ? '#E65100' : '#FF7043') : (isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'),
                        backgroundColor: temp === 'Hot' ? (isLight ? '#FFE0B2' : 'rgba(230,81,0,0.3)') : (isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)'),
                      }
                    }}
                  >
                    <WhatshotIcon sx={{ fontSize: 16 }} />
                    Hot
                  </Box>
                  <Box
                    onClick={() => setTemp('Iced')}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 0.8,
                      py: 0.8,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      border: temp === 'Iced' 
                        ? (isLight ? '2px solid #0288D1' : '2px solid #29B6F6') 
                        : (isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)'),
                      background: temp === 'Iced' 
                        ? (isLight ? 'linear-gradient(135deg, #E1F5FE 0%, #B3E5FC 100%)' : 'linear-gradient(135deg, rgba(2,136,209,0.15) 0%, rgba(2,136,209,0.3) 100%)') 
                        : 'transparent',
                      color: temp === 'Iced' 
                        ? (isLight ? '#0288D1' : '#81D4FA') 
                        : 'text.secondary',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      transition: 'all 0.3s ease',
                      boxShadow: temp === 'Iced' ? (isLight ? '0 4px 12px rgba(2,136,209,0.15)' : '0 4px 12px rgba(0,0,0,0.3)') : 'none',
                      '&:hover': {
                        borderColor: temp === 'Iced' ? (isLight ? '#0288D1' : '#29B6F6') : (isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'),
                        backgroundColor: temp === 'Iced' ? (isLight ? '#B3E5FC' : 'rgba(2,136,209,0.3)') : (isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)'),
                      }
                    }}
                  >
                    <AcUnitIcon sx={{ fontSize: 16 }} />
                    Iced
                  </Box>
                </Box>
              </Box>
            )}
            
            <Box sx={{ mt: 'auto', display: 'flex', flexWrap: 'wrap', gap: 1, pt: 2, borderTop: '1px solid rgba(141,110,99,0.1)', width: '100%' }}>
              {Object.entries(item.price).map(([size, price]) => (
                <Box key={size} sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, mr: 0.5, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {size === 'Regular' ? '' : size}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    ₱{price}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Box>
      </Card>
    </motion.div>
  );
};

const MenuGrid = () => {
  const [menuData, setMenuData] = useState({ cafe: [], pets: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/menu');
        // Group by category
        const grouped = res.data.reduce((acc, item) => {
          const cat = acc.find(c => c.category === item.category);
          if (cat) {
            cat.items.push(item);
          } else {
            acc.push({ category: item.category, description: '', items: [item] });
          }
          return acc;
        }, []);

        const isPetCategory = (catName) => ['pet food', 'dog food', 'cat food', 'pets', 'pet menu', 'animal food', 'pet treats'].includes(catName.toLowerCase());
        
        setMenuData({
          cafe: grouped.filter(c => !isPetCategory(c.category)),
          pets: grouped.filter(c => isPetCategory(c.category))
        });
      } catch (err) {
        console.error("Error fetching menu from server, falling back to local data:", err);
        const isPetCategory = (catName) => ['pet food', 'dog food', 'cat food', 'pets', 'pet menu', 'animal food', 'pet treats'].includes(catName.toLowerCase());
        
        const normalized = localMenuData.map(cat => ({
          category: cat.category,
          description: cat.description || '',
          items: (cat.items || []).map(item => ({
            ...item,
            isNewItem: item.isNew || item.isNewItem || false,
            isSpecial: item.isSpecial || false,
            price: item.price || {}
          }))
        }));

        setMenuData({
          cafe: normalized.filter(c => !isPetCategory(c.category)),
          pets: normalized.filter(c => isPetCategory(c.category))
        });
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;
  }

  return (
    <Box id="menu" sx={{ flexGrow: 1, pb: 8 }}>
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="overline" sx={{ color: '#2563EB', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.875rem' }}>
            POPULAR RECIPES
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, color: 'text.primary', letterSpacing: '-0.02em' }}>
            Our Delicious Offerings
          </Typography>
        </Box>

        {menuData.cafe.map((category, index) => (
          <Box key={`cafe-${index}`} sx={{ mb: 10 }}>
            <motion.div variants={itemVariants}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                {category.category}
              </Typography>
              {category.description && (
                <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 3 }}>
                  {category.description}
                </Typography>
              )}
              <Divider sx={{ mb: 4, opacity: 0.2 }} />
            </motion.div>

            <Grid container spacing={3}>
              {category.items.map((item, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <MenuItemCard item={item} categoryName={category.category} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        {menuData.pets.length > 0 && (
          <Box sx={{ mt: 12, mb: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="overline" sx={{ color: '#FFB300', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.875rem' }}>
                SPECIAL ORDERS
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, color: 'text.primary', letterSpacing: '-0.02em' }}>
                For Our Furry Friends
              </Typography>
            </Box>

            {menuData.pets.map((category, index) => (
              <Box key={`pet-${index}`} sx={{ mb: 10 }}>
                <motion.div variants={itemVariants}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                    {category.category}
                  </Typography>
                  {category.description && (
                    <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 3 }}>
                      {category.description}
                    </Typography>
                  )}
                  <Divider sx={{ mb: 4, opacity: 0.2 }} />
                </motion.div>

                <Grid container spacing={3}>
                  {category.items.map((item, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={`pet-item-${idx}`}>
                      <MenuItemCard item={item} categoryName={category.category} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </Box>
        )}
      </motion.div>
    </Box>
  );
};

export default MenuGrid;
