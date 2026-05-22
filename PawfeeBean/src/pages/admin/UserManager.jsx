import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControlLabel, Switch, Alert, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useThemeContext } from '../../theme/ThemeContextProvider';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '', isAdmin: false, password: '' });
  const [error, setError] = useState('');

  const { mode } = useThemeContext();
  const isLight = mode === 'light';

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/auth/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
  }, []);

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      password: ''
    });
    setError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const handleSave = async () => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const payload = {
        username: formData.username,
        email: formData.email,
        isAdmin: formData.isAdmin,
      };

      if (formData.password && formData.password.trim() !== '') {
        payload.password = formData.password;
      }

      await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, payload, config);
      
      fetchUsers();
      if (currentUser && editingUser._id === currentUser._id) {
        fetchCurrentUser();
      }
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating user.');
    }
  };

  const handleDelete = async (user) => {
    const userId = user._id || user.id;
    if (!window.confirm(`Are you sure you want to delete user "${user.username}"?`)) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting user.');
      console.error('Delete user error:', err);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: 'text.primary', letterSpacing: '-0.5px' }}>User Manager</Typography>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <TableContainer component={Paper} sx={{ 
          borderRadius: '24px', 
          background: isLight ? 'rgba(255,255,255,0.7)' : 'rgba(18,18,20,0.7)', 
          backdropFilter: 'blur(20px)',
          border: isLight ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.05)',
          boxShadow: isLight ? '0 10px 40px rgba(0,0,0,0.05)' : '0 10px 40px rgba(0,0,0,0.4)',
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Username</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell><strong>Joined Date</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => {
                const currentUserId = currentUser?._id || currentUser?.id;
                const rowUserId = row._id || row.id;
                const isSelf = currentUserId && rowUserId && String(currentUserId) === String(rowUserId);
                return (
                  <TableRow key={rowUserId} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)' } }}>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {row.username} {isSelf && <span style={{ fontStyle: 'italic', fontWeight: 400, opacity: 0.7 }}>(You)</span>}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <Box sx={{ 
                        display: 'inline-block', px: 2, py: 0.5, borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700,
                        backgroundColor: row.isAdmin ? 'rgba(37,99,235,0.1)' : 'rgba(141,110,99,0.1)',
                        color: row.isAdmin ? '#2563EB' : 'text.secondary'
                      }}>
                        {row.isAdmin ? 'Admin' : 'User'}
                      </Box>
                    </TableCell>
                    <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleOpenEdit(row)} sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(row)} disabled={isSelf}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="xs" 
        fullWidth 
        PaperProps={{ 
          sx: { 
            borderRadius: '24px',
            background: isLight ? 'rgba(255,255,255,0.9)' : 'rgba(24,24,28,0.9)',
            backdropFilter: 'blur(20px)',
            border: isLight ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.05)',
            boxShadow: isLight ? '0 20px 60px rgba(0,0,0,0.1)' : '0 20px 60px rgba(0,0,0,0.5)',
            padding: 2
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>Edit User Details</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>{error}</Alert>}
          <TextField 
            fullWidth 
            margin="dense" 
            label="Username" 
            value={formData.username} 
            onChange={(e) => setFormData({...formData, username: e.target.value})} 
            sx={{ mt: 1 }}
          />
          <TextField 
            fullWidth 
            margin="dense" 
            label="Email Address" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
          <TextField 
            fullWidth 
            margin="dense" 
            label="New Password (optional)" 
            type="password"
            helperText="Leave blank to keep existing password"
            value={formData.password} 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
          />
          <FormControlLabel
            control={
              <Switch 
                checked={formData.isAdmin} 
                onChange={(e) => setFormData({...formData, isAdmin: e.target.checked})}
                disabled={currentUser && editingUser && editingUser._id === currentUser._id}
              />
            }
            label="Administrator Privileges"
            sx={{ mt: 2, display: 'flex', color: 'text.secondary' }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleClose} sx={{ color: 'text.secondary', fontWeight: 600 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} sx={{ borderRadius: '12px', fontWeight: 600, backgroundColor: '#2563EB', '&:hover': { backgroundColor: '#1D4ED8' } }}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManager;
