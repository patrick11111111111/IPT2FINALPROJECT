import React, { createContext, useState, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // Light mode: "White coffee" theme
                primary: {
                  main: '#8D6E63', // Soft brown
                },
                secondary: {
                  main: '#D7CCC8', // Light latte
                },
                background: {
                  default: '#F5F5F0', // Creamy off-white
                  paper: 'rgba(255, 255, 255, 0.7)', // Glassmorphic white
                },
                text: {
                  primary: '#3E2723', // Dark coffee text
                  secondary: '#5D4037',
                },
                accent: '#FFB300', // Caramel accent
              }
            : {
                // Dark mode: "Coffee" theme
                primary: {
                  main: '#D7CCC8', // Light text on dark bg
                },
                secondary: {
                  main: '#5D4037', // Mocha
                },
                background: {
                  default: '#1E1410', // Deep espresso black/brown
                  paper: 'rgba(62, 39, 35, 0.6)', // Glassmorphic dark brown
                },
                text: {
                  primary: '#EFEBE9', // Off-white text
                  secondary: '#BCAAA4', // Muted brown text
                },
                accent: '#FFCA28', // Caramel accent
              }),
        },
        typography: {
          fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: { fontWeight: 800, letterSpacing: '-0.05em' },
          h2: { fontWeight: 700, letterSpacing: '-0.02em' },
          h3: { fontWeight: 700 },
          h4: { fontWeight: 700 },
          h5: { fontWeight: 600 },
          h6: { fontWeight: 600 },
          button: { fontWeight: 600, textTransform: 'none', borderRadius: '12px' },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: '12px',
                padding: '10px 24px',
                boxShadow: 'none',
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: '24px',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: mode === 'light' ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: mode === 'light' ? '0 8px 32px rgba(141, 110, 99, 0.1)' : '0 8px 32px rgba(0, 0, 0, 0.4)',
                background: mode === 'light' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(46, 28, 24, 0.6)',
                transition: 'all 0.3s ease-in-out',
                overflow: 'hidden',
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
