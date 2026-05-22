const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: mongoose.Schema.Types.Mixed, required: true },
  photo: { type: String, default: '' },
  category: { type: String, required: true },
  isSpecial: { type: Boolean, default: false },
  isNewItem: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Menu', menuSchema);
