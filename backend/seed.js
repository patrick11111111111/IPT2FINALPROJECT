const mongoose = require('mongoose');
const Menu = require('./models/Menu');
const fs = require('fs');
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/pawfeebean')
    .then(() => console.log('Connected to local MongoDB for seeding'))
    .catch(err => {
        console.error('Could not connect to MongoDB', err);
        process.exit(1);
    });

async function seedDB() {
    try {

        const menuDataPath = path.join(__dirname, '../PawfeeBean/src/data/menuData.js');
        let rawData = fs.readFileSync(menuDataPath, 'utf8');


        rawData = rawData.replace('export const menuData = ', '').replace(/;$/, '');


        const menuData = new Function('return ' + rawData)();


        await Menu.deleteMany({});
        console.log('Cleared existing menu collection');

        const newMenuItems = [];

        for (const cat of menuData) {
            for (const item of cat.items) {
                newMenuItems.push({
                    name: item.name,
                    description: item.description || '',
                    price: item.price,
                    category: cat.category,
                    isSpecial: item.isSpecial || false,
                    isNewItem: item.isNew || false,
                    photo: ''
                });
            }
        }

        await Menu.insertMany(newMenuItems);
        console.log(`Seeded ${newMenuItems.length} menu items successfully.`);

    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close();
    }
}

seedDB();
