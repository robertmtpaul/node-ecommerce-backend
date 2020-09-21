// Connect Mongo database to server
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoDB = 'mongodb://127.0.0.1:27017/shopping'

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async () => {

    //empty collections before seeding
    await User.deleteMany({});
    await Product.deleteMany({});

    const products = await seedProducts();
    const users = await seedUsers();

    console.log(`Created ${products.length} Products. `);
    console.log(`Created ${users.length} Users. `);
    console.log('Done');
    process.exit(0); // Finished seeding.

}); //db.once initializer

const seedProducts = async () => {

    try {
        return await Product.create([
            {
                name: 'PS5',
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1518908336710-4e1cf821d3d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1173&q=80',
                price: 200,
                brand: 'Sony',
                rating: 4.2,
                numReviews: 10,
                quantity: 4
            },
            {
                name: 'Nice Suitcase',
                category: 'Clothes',
                image: 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
                price: 200,
                brand: 'Samsonite',
                rating: 4.5,
                numReviews: 5,
                quantity: 33
            },
            {
                name: 'Xbox',
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1586062129117-08db958ba215?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                price: 200,
                brand: 'Microsoft',
                rating: 2.2,
                numReviews: 2,
                quantity: 22
            },
            {
                name: 'Wii',
                category: 'Travel',
                image: 'https://images.unsplash.com/10/wii.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
                price: 200,
                brand: 'Nintendo',
                rating: 2.2,
                numReviews: 3,
                quantity: 221
            }
        ]);
    } catch (err) {
        console.warn('Ereror creating products:', err);
        process.exit(1);
    }

}; // seedProducts

const seedUsers = async () => {
    try {
        return await User.create([
            {
                name: 'Robbie',
                email: 'robbie@ga.co',
                passwordDigest: bcrypt.hashSync('chicken', 10),
                bio: 'Rando 1',
            },
            {
                name: 'Luke',
                email: 'luke@ga.co',
                passwordDigest: bcrypt.hashSync('chicken', 10),
                bio: 'Rando 2',
            },
            {
                name: 'Zara',
                email: 'zara@ga.co',
                passwordDigest: bcrypt.hashSync('chicken', 10),
                bio: 'Rando 3',
            },
            {
                name: 'Rando',
                email: 'rando@ga.co',
                passwordDigest: bcrypt.hashSync('chicken', 10),
                bio: 'Rando 4',
            }
        ]);
    } catch(err) {
        console.log('Error creating users: ', err);
        process.exit(1);
    }
} // seedUsers



