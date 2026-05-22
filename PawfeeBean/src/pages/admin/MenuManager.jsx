import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useThemeContext } from '../../theme/ThemeContextProvider';

const MenuManager = () => {
  const [menu, setMenu] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', category: '', photo: '' });
  const [file, setFile] = useState(null);
  
  const { mode } = useThemeContext();
  const isLight = mode === 'light';

  const fetchMenu = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/menu');
      setMenu(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleOpen = (item = null) => {
    setEditingItem(item);
    if (item) {
      const priceStr = typeof item.price === 'object' ? JSON.stringify(item.price) : item.price;
      setFormData({ name: item.name, description: item.description, price: priceStr, category: item.category, photo: item.photo });
    } else {
      setFormData({ name: '', description: '', price: '{"Regular": 100}', category: 'PAWFEE BREWS', photo: '' });
    }
    setFile(null);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      let photoPath = formData.photo;

      if (file) {
        const uploadData = new FormData();
        uploadData.append('image', file);
        const uploadRes = await axios.post('http://localhost:5000/api/upload', uploadData, {
          headers: { ...config.headers, 'Content-Type': 'multipart/form-data' }
        });
        photoPath = uploadRes.data.filePath;
      }

      let parsedPrice = formData.price;
      try { parsedPrice = JSON.parse(formData.price); } catch (e) { parsedPrice = { Regular: Number(formData.price) }; }

      const payload = { ...formData, price: parsedPrice, photo: photoPath };

      if (editingItem) {
        await axios.put(`http://localhost:5000/api/menu/${editingItem._id}`, payload, config);
      } else {
        await axios.post('http://localhost:5000/api/menu', payload, config);
      }
      
      fetchMenu();
      handleClose();
    } catch (err) {
      console.error(err);
      alert('Error saving menu item. Ensure you are logged in as admin.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMenu();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.5px' }}>Menu Manager</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()} sx={{ backgroundColor: '#2563EB', borderRadius: '12px', '&:hover': { backgroundColor: '#1D4ED8' } }}>Add Item</Button>
      </Box>

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
                <TableCell><strong>Photo</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Price</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.map((row) => (
                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)' } }}>
                  <TableCell>
                    {row.photo ? <img src={`http://localhost:5000${row.photo}`} alt={row.name} style={{ width: 50, height: 50, borderRadius: 8, objectFit: 'cover' }} /> : <Box sx={{ width: 50, height: 50, borderRadius: 2, bgcolor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography variant="caption" color="text.secondary">None</Typography></Box>}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{row.name}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{typeof row.price === 'object' ? JSON.stringify(row.price) : row.price}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpen(row)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(row._id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '24px' }}}>
        <DialogTitle sx={{ fontWeight: 800 }}>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} sx={{ mt: 2 }} />
          <TextField fullWidth margin="dense" label="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          <TextField fullWidth margin="dense" label="Price (JSON format like {&quot;Regular&quot;: 150})" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
          <TextField fullWidth margin="dense" label="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
          <Box sx={{ mt: 3, p: 2, border: '1px dashed', borderColor: 'divider', borderRadius: '12px' }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Upload Photo</Typography>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} sx={{ color: 'text.secondary', fontWeight: 600 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} sx={{ borderRadius: '12px', fontWeight: 600 }}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MenuManager;
