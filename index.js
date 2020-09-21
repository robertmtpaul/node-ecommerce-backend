const express = require('express');
// const router = express.Router()
// module.exports = router
const app = express();
// Import mongoose module
const mongoose = require("mongoose");
const Product = require('./models/Product')
const User = require('./models/User')
const userRoute = require('./routes/userRoute')

//For preventing CORS errors from frontend requests.
const cors = require('cors');
const { response } = require('express');
app.use(cors());

//To enable support for JSON-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====================MONGOOSE===========================//

//Set up the default mongoose connection
const mongoDB = 'mongodb://127.0.0.1:27017/shopping'
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    //Bind connection to error event (in order to get notifications of connection errors)
    .catch((error) => console.log(error.reason));

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Get the default connection
let db = mongoose.connection;

// ====================EXPRESS/CORS/JSON/ETC==========================//
const SERVER_SECRET_KEY = 'CHICKEN'; //TODO: move to .env
const PORT = 1337;


//Initialise Express server
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}...`)
    console.log('server started at http://localhost:3333')
})

// ====================LOGINS===============================//

// TODO: install bcrypt
//For checking passwords on login
// const bcrypt = require...



// ========================JSON===============================// 

// GET /users: JSON index of all users.
app.get("/users", (request, response) => {
    // const seeds = require('./seeds-products.js');
    // res.json(seeds.products);
    db.collection('users').find().toArray((error, result) => {

        if (error) {
            console.log('Query error: ', error);
            return response.sendStatus(500); // report erorr at HTTP 500 to browser
        }
        response.json(result); // send the products DB results back to the browser as JSON.
        // console.log('response', response.json);

    });

}); // GET /users


// GET /products: JSON index of all products.
app.get("/products", (request, response) => {
    // const seeds = require('./seeds-products.js');
    // res.json(seeds.products);
    db.collection('products').find().toArray((error, result) => {

        if (error) {
            console.log('Query error: ', error);
            return response.sendStatus(500); // report erorr at HTTP 500 to browser
        }
        response.json(result); // send the products DB results back to the browser as JSON.
        // console.log('response', response.json);

    });

}); // GET /products

// GET /product/:id JSON product details
app.get('/products/:id', (request, response) => {
    // response.json( request.params)
    db.collection('products').findOne(
        { product_id : request.params._id },
        (error, product) => {
            if (error) {
                response.sendStatus(500);
                return console.log('Error finding product', error);
            }
            response.json(product);

        } // query callback
    );

}) //GET /products/:id




