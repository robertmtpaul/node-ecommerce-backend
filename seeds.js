// Connect Mongo database to server
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async() => {

    //empty collections before seeding
    await User.deleteMany({});
    await Product.deleteMany({});

    const products = await seedProducts();
    const users = await seedUsers();

    await printReport();

    console.log(`Created ${products.length} Products. `);
    console.log(`Created ${users.length} Users. `);
    console.log('Done');
    process.exit(0); // Finished seeding.

}); //db.once initializer

const seedProducts = async() => {

    try {
        return await Product.create([{
                name: 'PlayStation 5 Console',
                category: 'Electronics',
                image: 'https://res.cloudinary.com/dgqqw6hwo/image/upload/v1601866371/PS5.png',
                price: 500,
                brand: 'Sony',
                rating: 4,
                numReviews: 10,
                quantity: 4,
                description: "The PS5 console unleashes new gaming possibilities that you never anticipated. Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games. Lightning Speed: Harness the power of a custom CPU, GPU, and SSD with Integrated I/O that rewrite the rules of what a PlayStation console can do. Stunning Games: Marvel at incredible graphics and experience new PS5 features. Breathtaking Immersion: Discover a deeper gaming experience with support for haptic feedback, adaptive triggers, and 3D Audio technology.",
            },
            {
                name: 'Varro Suitcase',
                category: 'Luggage',
                image: 'https://res.cloudinary.com/dgqqw6hwo/image/upload/v1620259472/Samsonite%20Varro.jpg',
                price: 200,
                brand: 'Samsonite',
                rating: 3,
                numReviews: 5,
                quantity: 33,
                description: "Samsonite’s VARRO collection combines contemporary design and functionality, setting a new benchmark for the modern traveller. VARRO is loaded with features such as organisational pockets, smooth double wheels for easier manoeuvrability and expandability allowing you to bring back more from your travels. The exterior shell also features an eye-catching arrow pattern, designed to reduce scratch visibility.",
            },
            {
                name: 'Xbox Series S Console',
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1612801799890-4ba4760b6590?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2102&q=80',
                price: 699,
                brand: 'Microsoft',
                rating: 2,
                numReviews: 2,
                quantity: 22,
                description: "An 'extremely credible source' has called my office and told me that Lorem Ipsum's birth certificate is a fraud. My text is long and beautiful, as, it has been well documented, are various other parts of my website.",
            },
            {
                name: 'Wii 1st generation',
                category: 'Travel',
                image: 'https://images.unsplash.com/10/wii.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
                price: 100,
                brand: 'Nintendo',
                rating: 5,
                numReviews: 3,
                quantity: 221,
                description: "An 'extremely credible source' has called my office and told me that Lorem Ipsum's birth certificate is a fraud. You're telling the enemy exactly what you're going to do. No wonder you've been fighting Lorem Ipsum your entire adult life.",
            }
        ]);
    } catch (err) {
        console.warn('Error creating products:', err);
        process.exit(1);
    }

}; // seedProducts

const seedUsers = async() => {
        try {
            return await User.create([{
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
        } catch (err) {
            console.log('Error creating users: ', err);
            process.exit(1);
        }
    } // seedUsers

const printReport = async() => {

    // console colours
    const yellow = '\x1b[33m',
        green = '\x1b[32m',
        blue = '\x1b[34m',
        reset = '\x1b[0m';

    const productCheck = await Product.find()

    productCheck.forEach(p => {
            console.log(
                green, `${p.name}:`, yellow, `${p.category}, ${p.price}`,
                blue, `(${p.brand})`, reset,
            );
        }) //productCheck

    const userCheck = await User.find()
        .populate({
            path: 'reservations.flight', // Mongoose populates this association
            // model: 'Flight'
        });

    userCheck.forEach(u => {
        console.log(
            yellow, `${u.name}`, green, `(${u.email}):`, reset,
        );
    });



}; // printReport()