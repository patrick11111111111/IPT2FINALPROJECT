const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const { adminAuth } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const menuItems = await Menu.find().sort({ category: 1 });
    res.json(menuItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, description, price, category, photo, isSpecial, isNewItem } = req.body;

    const newMenuItem = new Menu({
      name,
      description,
      price,
      category,
      photo,
      isSpecial,
      isNewItem
    });

    const menu = await newMenuItem.save();
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { name, description, price, category, photo, isSpecial, isNewItem } = req.body;

    const menuFields = {};
    if (name) menuFields.name = name;
    if (description !== undefined) menuFields.description = description;
    if (price) menuFields.price = price;
    if (category) menuFields.category = category;
    if (photo !== undefined) menuFields.photo = photo;
    if (isSpecial !== undefined) menuFields.isSpecial = isSpecial;
    if (isNewItem !== undefined) menuFields.isNewItem = isNewItem;

    let menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Menu item not found' });

    menu = await Menu.findByIdAndUpdate(
      req.params.id,
      { $set: menuFields },
      { new: true }
    );

    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    let menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Menu item not found' });

    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
