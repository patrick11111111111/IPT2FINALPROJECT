import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useThemeContext } from '../theme/ThemeContextProvider';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { mode } = useThemeContext();
  const isLight = mode === 'light';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await axios.post(`http://localhost:5000${endpoint}`, payload);
      
      // Save token and admin status
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('isAdmin', res.data.user.isAdmin ? 'true' : 'false');
      
      // Redirect based on role
      if (res.data.user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ 
        p: 4, 
        width: '100%', 
        borderRadius: 4,
        background: isLight ? 'rgba(255,255,255,0.8)' : 'rgba(46,28,24,0.8)',
        backdropFilter: 'blur(16px)'
      }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
          {isLogin ? 'Welcome Back' : 'Join Pawfee Bean'}
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              fullWidth
              label="Username"
              name="username"
              margin="normal"
              variant="outlined"
              required
              value={formData.username}
              onChange={handleChange}
            />
          )}
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            margin="normal"
            variant="outlined"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            variant="outlined"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            sx={{ color: 'text.secondary' }}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={() => navigate('/')}
            sx={{ color: 'primary.main', mt: 1 }}
          >
            Back to Home
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
