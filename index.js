// ====================MONGODB===========================//

// DB initialisation
const MongoClient= require('mongodb')
let db; // initialise global variable to store the db connection object.
const mongoose = require("mongoose");


MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    
    if( err ) return console.log( err );
    
    db = client.db( 'shopping'); // success!
    console.log('Connected, using db:shopping');
    
}); // .connect() mongoDB

// TODO: install bcrypt

// ====================EXPRESS/CORS/JSON/ETC==========================//
const SERVER_SECRET_KEY = 'CHICKEN'; //TODO: move to .env
const express = require('express');
// const router = express.Router()
// module.exports = router
const app = express();
const PORT = 1337;


//Initialise Express server
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}...`)
    console.log('server started at http://localhost:3333')
})

//For preventing CORS errors from frontend requests.
const cors = require('cors');
const { response } = require('express');
app.use(cors());

//To enable support for JSON-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====================LOGINS===============================//

//For checking passwords on login
// const bcrypt = require...

// ========================JSON===============================// GET /products: JSON index of all products.
app.get("/products", (request, response) => {
    // const seeds = require('./seeds-products.js');
    // res.json(seeds.products);
    db.collection('products').find().toArray( (error, result) => {
        
        if( error ){
            console.log('Query error: ', error);
            return response.sendStatus(500); // report erorr at HTTP 500 to browser
        }
            response.json( result ); // send the products DB results back to the browser as JSON.
            // console.log('response', response.json);

        });

}); // GET /products

// GET /product/:id JSON product details
app.get('/products/name', (request, response ) => {
    // response.json( request.params)
    db.collection('products').findOne(
        { name : request.params.name },
        (error, product ) => {
            if ( error ) {
                response.sendStatus(500);
                return console.log('Error finding product', error);
            }
            response.json ( product );
        
        } // query callback
    );

}) //GET /products/:id




