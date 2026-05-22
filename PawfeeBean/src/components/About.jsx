import React, { useState } from 'react';
import { Box, Typography, Grid, Button, Dialog, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const UNSPLASH_IDS = [
  '1554118811-1e0d58224f24', // story 1: Cozy cafe counter
  '1495474472287-4d71bcdd2085', // story 2: Coffee table Vibe
  '1501339847302-ac426a4a7cbb', // story 3: Warm storefront
  '1498804103079-a6351b050096', // story 4: Friendly toast
  '1517248135467-4c7edcad34c4', // story 5: Cozy seat
  '1447933601403-0c6688de566e', // story 6: Coffee beans
  '1511920170033-f8396924c348', // story 7: Latte art
  '1507133750040-4a8f57021571', // story 8: Cute pupcup
  '1535268647977-a403b6907e7a', // story 9: Golden retriever
  '1541599540903-216a46cf1df0', // story 10: Cute cat sleeping
  '1537151608828-ea2b117b6296', // story 11: Happy puppy
  '1514888286974-6c03e2ca1dba', // story 12: Fluffy kitty
  '1453614512568-c4024d13c247', // story 13: Barista bar
  '1509042239860-f550ce710b93', // story 14: Coffee drip
  '1513530534585-c7b1394c6d51', // story 15: Milk pouring
  '1559925393-8be0ec4767c8', // story 16: People in cafe
  '1551882547-ff40c63fe5fa', // story 17: Plant decor
  '1522336572-4890933698e5', // story 18: Waffles
  '1504754524776-8f4f37790ca0', // story 19: Croissant
  '1488161628813-04466f872be2', // story 20: Cozy dog sleep
  '1574158622643-69d34d72650a', // story 21: Majestic white cat
  '1520340356584-f9917d1eea6f', // story 22: Iced latte pouring
  '1556910103-1c02745aae4d', // story 23: Handcrafting brew
  '1497034825429-c343d7c6a68f'  // story 24: Outdoor table sun
];

const storyImages = Array.from({ length: 18 }, (_, i) => {
  const num = i + 1;
  return {
    id: num,
    src: `/assets/images/story${num}.jpg`,
    fallback: `https://images.unsplash.com/photo-${UNSPLASH_IDS[i]}?w=600&auto=format&fit=crop&q=80`
  };
});

const GalleryImage = ({ item, onClick }) => {
  const [imgSrc, setImgSrc] = useState(item.src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(item.fallback);
      setHasError(true);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      style={{ breakInside: 'avoid', marginBottom: '20px' }}
    >
      <Box
        component="img"
        src={imgSrc}
        onError={handleError}
        onClick={() => onClick(imgSrc)}
        alt={`Pawfee Bean Story ${item.id}`}
        sx={{
          width: '100%',
          borderRadius: '20px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02)',
          objectFit: 'cover',
          display: 'block',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          '&:hover': {
            transform: 'translateY(-6px) scale(1.02)',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.12), 0 10px 10px -5px rgba(0,0,0,0.06)',
            border: '1px solid rgba(93, 64, 55, 0.2)'
          }
        }}
      />
    </motion.div>
  );
};

const About = () => {
  const [showAll, setShowAll] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const visibleImages = showAll ? storyImages : storyImages.slice(0, 8);

  return (
    <Box id="about" sx={{ position: 'relative', maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 0 } }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="overline" sx={{ color: '#2563EB', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.875rem' }}>
            ABOUT US
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, color: 'text.primary', letterSpacing: '-0.02em' }}>
            Our Story
          </Typography>
        </Box>

        {/* Story Paragraphs */}
        <Grid container spacing={6} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 2, letterSpacing: '-0.01em' }}>
              A Sanctuary Born Out of Love and Convenience
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.8, fontWeight: 400, mb: 3 }}>
              Pawfee Bean originally started in the Philippines to solve a common challenge for fur parents: the stress of running multiple separate errands like scheduling veterinary check-ups, getting pets groomed, buying premium groceries, and grabbing a quick coffee—all in completely different locations. To bring ease, relaxation, and luxury to the pet community, we combined elite animal care with the cozy, welcoming vibes of a premium coffee shop.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.8, fontWeight: 400 }}>
              From our main hub at 40 JYC Building on EDSA in Caloocan (near MCU Hospital), we have grown to build close-knit pet-loving communities in Malabon and our localized branch in Bayombong, Nueva Vizcaya (located at 13 Zamora St. , Brgy. Don Domingo Maddela).
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 2, letterSpacing: '-0.01em' }}>
              More Than Just a Cafe: A Pet Care Oasis
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.8, fontWeight: 400, mb: 3 }}>
              Our concept goes well beyond serving premium handcrafted hot coffees and gourmet pastries. Alongside peaceful, study and work-friendly lounge spaces, we operate full-service pet grooming salons, a fully stocked pet grocery, and accessible community pet healthcare through Petlink Veterinary Hospital.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.8, fontWeight: 400 }}>
              But what truly makes the Pawfee Bean experience complete is our family. Each of our locations is home to our famous resident cafe mascots, Bochog and Inca, who are always excited to play, cuddle, and keep you company while you grab a bite to eat or study!
            </Typography>
          </Grid>
        </Grid>

        {/* Dynamic Social Update Chips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContext: 'center', justifyContent: 'center', mb: 8 }}>
          <Button
            component="a"
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="text"
            sx={{
              color: '#1877F2',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              '&:hover': { background: 'rgba(24, 119, 242, 0.05)' }
            }}
          >
            Visit Pawfee Bean Facebook
          </Button>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, width: '1px', height: '24px', backgroundColor: 'rgba(0,0,0,0.1)', alignSelf: 'center' }} />
          <Button
            component="a"
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="text"
            sx={{
              color: '#1877F2',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              '&:hover': { background: 'rgba(24, 119, 242, 0.05)' }
            }}
          >
            Check Pawfee Bean Bayombong Facebook
          </Button>
        </Box>

        {/* Gallery Grid */}
        <Box sx={{
          columnCount: { xs: 1, sm: 2, md: 3, lg: 4 },
          columnGap: '20px',
          width: '100%',
          transition: 'all 0.5s ease-in-out'
        }}>
          <AnimatePresence mode="popLayout">
            {visibleImages.map((item) => (
              <GalleryImage key={item.id} item={item} onClick={setLightboxSrc} />
            ))}
          </AnimatePresence>
        </Box>

        {/* Expansion / Toggle Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            onClick={() => setShowAll(!showAll)}
            startIcon={showAll ? <RemoveIcon /> : <AddIcon />}
            sx={{
              borderRadius: '30px',
              px: 4,
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
              borderColor: 'rgba(93, 64, 55, 0.3)',
              color: 'text.secondary',
              '&:hover': {
                borderColor: '#5D4037',
                backgroundColor: 'rgba(93, 64, 55, 0.05)',
                color: 'text.primary'
              }
            }}
          >
            {showAll ? 'Show Less Vibe' : 'Explore More Story Gallery'}
          </Button>
        </Box>
      </motion.div>

      {/* Premium Lightbox Dialog */}
      <Dialog
        open={!!lightboxSrc}
        onClose={() => setLightboxSrc(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible',
            position: 'relative'
          }
        }}
      >
        <IconButton
          onClick={() => setLightboxSrc(null)}
          sx={{
            position: 'absolute',
            top: -45,
            right: 0,
            color: '#ffffff',
            bgcolor: 'rgba(0,0,0,0.5)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          component="img"
          src={lightboxSrc}
          alt="Pawfee Bean Expanded View"
          sx={{
            width: '100%',
            height: 'auto',
            maxHeight: '85vh',
            objectFit: 'contain',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}
        />
      </Dialog>
    </Box>
  );
};

export default About;
