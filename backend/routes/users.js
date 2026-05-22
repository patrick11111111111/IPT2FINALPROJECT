const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { adminAuth } = require('../middleware/authMiddleware');

// Get all users
router.get('/', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update user details
router.put('/:id', adminAuth, async (req, res) => {
  const { username, email, isAdmin, password } = req.body;

  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Validate unique username if changed
    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ message: 'Username is already taken' });
      }
      user.username = username;
    }

    // Validate unique email if changed
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
      user.email = email;
    }

    // Handle Admin role toggle
    if (typeof isAdmin !== 'undefined') {
      // Prevent self-demotion
      if (req.user.id === req.params.id && !isAdmin) {
        return res.status(400).json({ message: 'You cannot demote yourself from Admin status' });
      }
      
      // If we are demoting an admin, ensure they are not the only admin
      if (user.isAdmin && !isAdmin) {
        const adminCount = await User.countDocuments({ isAdmin: true });
        if (adminCount <= 1) {
          return res.status(400).json({ message: 'Cannot demote the only remaining admin user.' });
        }
      }

      user.isAdmin = isAdmin;
    }

    // Handle optional password update
    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    const updatedUser = user.toObject();
    delete updatedUser.password;
    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete user
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Prevent self-deletion
    if (req.user.id === req.params.id) {
      return res.status(400).json({ message: 'You cannot delete yourself.' });
    }

    // Prevent deleting the last remaining admin
    if (user.isAdmin) {
      const adminCount = await User.countDocuments({ isAdmin: true });
      if (adminCount <= 1) {
        return res.status(400).json({ message: 'Cannot delete the only remaining admin user.' });
      }
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;

