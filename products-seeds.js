
// Connect Mongo database to server
const MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

    if (err) {
        console.log(err);
        return; // early return on error) 
    } // error handler

    db = client.db('shopping');
    console.log('Connected, using db: shopping') //success message

    db.collection('products').deleteMany({}, (err, result) => {
        if (err) return console.log('Failed to delete products', err);
    });
    
    insertProducts();
})

const insertProducts = () => {

    db.collection('products').insertMany([
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
    ],
        (error, result) => {
            if (error) return console.log('error adding products', error);

            console.log(`Success! Added ${result.insertedCount} products. `);
        }
    ); //insertMany()

}; // insertProducts()