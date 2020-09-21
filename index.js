// ====================MONGODB===========================//

// DB initialisation
const { MongoClient, ObjectId } = require('mongodb')
let db; // initialise global variable to store the db connection object.


MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    
    if( err ) return console.log( err );
    
    db: client.db( 'shopping'); // success!
    console.log('Connected, using db:shopping');
    
}); // .connect() mongoDB

// TODO: initialise mongoose , install bcrypt
// const mongoose = require("mongoose");

// ====================EXPRESS/CORS/JSON/ETC==========================//
const SERVER_SECRET_KEY = 'CHICKEN'; //TODO: move to .env
const PORT = 3333;
const express = require('express');
const app = express();

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

// ========================REQUESTS===============================///
app.get("/products", (request, response) => {
    // const seeds = require('./seeds-products.js');
    // res.json(seeds.products);
    db.collection('products').find().toArray( (error, result) => {
        
        if( error ){
            console.log('Query error: ', error);
            return response.sendStatus(500); // report erorr at HTTP 500 to browser
        }
            response.json( result ); // send the products DB results back to the browser as JSON.
 
        });

}); // GET /products


