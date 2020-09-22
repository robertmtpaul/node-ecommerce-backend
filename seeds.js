// Connect Mongo database to server
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require ('jsonwebtoken');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async () => {

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
                quantity: 4,
                description: "He’s not a word hero. He’s a word hero because he was captured. I like text that wasn’t captured. Lorem Ipsum's father was with Lee Harvey Oswald prior to Oswald's being, you know, shot. I think the only difference between me and the other placeholder text is that I’m more honest and my words are more beautiful.",
            },
            {
                name: 'Nice Suitcase',
                category: 'Clothes',
                image: 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
                price: 200,
                brand: 'Samsonite',
                rating: 4.5,
                numReviews: 5,
                quantity: 33,
                description: "I think the only difference between me and the other placeholder text is that I’m more honest and my words are more beautiful. The best taco bowls are made in Trump Tower Grill. I love Hispanics! Be careful, or I will spill the beans on your placeholder text. The concept of Lorem Ipsum was created by and for the Chinese in order to make U.S. design jobs non-competitive.",
            },
            {
                name: 'Xbox',
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1586062129117-08db958ba215?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                price: 200,
                brand: 'Microsoft',
                rating: 2.2,
                numReviews: 2,
                quantity: 22,
                description: "An 'extremely credible source' has called my office and told me that Lorem Ipsum's birth certificate is a fraud. My text is long and beautiful, as, it has been well documented, are various other parts of my website.",
            },
            {
                name: 'Wii',
                category: 'Travel',
                image: 'https://images.unsplash.com/10/wii.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
                price: 200,
                brand: 'Nintendo',
                rating: 2.2,
                numReviews: 3,
                quantity: 221,
                description: "An 'extremely credible source' has called my office and told me that Lorem Ipsum's birth certificate is a fraud. You're telling the enemy exactly what you're going to do. No wonder you've been fighting Lorem Ipsum your entire adult life.",
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
    } catch (err) {
        console.log('Error creating users: ', err);
        process.exit(1);
    }
} // seedUsers

const printReport = async () => {

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