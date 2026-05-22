const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ['food', 'drink'], required: true },
  size: { 
    type: String, 
    enum: ['Kitty', 'Puppy', 'Doggy', 'Standard'], 
    default: 'Standard' 
  },
  imagePath: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);
