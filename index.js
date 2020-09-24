const express = require('express');
// Import express router:
const router = express.Router()
// module.exports = router:
const app = express();
// Import mongoose module:
const mongoose = require("mongoose");
// Give access to mongoose models:
const Product = require('./models/Product')
const User = require('./models/User')
// For accessing the routes definded in userRoute.js:
const userRoute = require('./routes/userRoute')
// For preventing CORS errors from frontend requests.
const cors = require('cors');
app.use(cors());
// For hashing passwords on login:
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

// For login decoding:
const jwtAuthenticate = require('express-jwt')
// For storing keys, URLs securely
const dotenv = require('dotenv').config();
//To enable support for JSON-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 1337;
// =============================MONGOOSE==============================//

// establish mongoose connection to mongoDB URL
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    //Bind connection to error event (in order to get notifications of connection errors)
    .catch((error) => console.log(error.reason));

//Get the default connection
let db = mongoose.connection;

// ====================EXPRESS/CORS/JSON/ETC==========================//

//Initialise Express server
app.listen(PORT, () => {
    console.log(`server listening on port ${process.env.PORT || 1337 }...`)
    console.log(`server started at http://localhost:${process.env.PORT || 1337}`)
})

// ====================LOGINS===============================//
// Function to lock down routes that should be for logged-in users only
const checkAuth = () => {
    return jwtAuthenticate({
        secret: SERVER_SECRET_KEY,
        algorithms:  ['HS256']
    });
};

//TODO: move to .env
const SERVER_SECRET_KEY = 'CHICKEN'; 

    app.post('/login', (request, response ) => {
    console.log('posted data: ', request.body );

    const { email, password } = request.body;

    User.findOne({ email }, (err, user) => {

        if( err ){
            response.status(500).json({ message: 'Server error' });
            return console.log('Error retrieving user', err);
        }

        console.log('User found:', user );
        //Check that found a user with the specified email, and
        // also that the password given matches password for that user.

        if( user && bcrypt.compareSync( password, user.passwordDigest) ){
            // Successful login

            // Generate JWT signed token which contains the user data:
            const token = jwt.sign(
                {
                    _id: user._id,
                    email: user.email,
                    name: user.name
                },
                SERVER_SECRET_KEY,
                { expiresIn: '72h'}
            );

            response.json({ user, token, success: true});
        } else {
            // User not found, or passwords didn't match, therefore failed login
            response.status(401).json({ message: 'Authentication failed' });
        } 

    }); // find user

}) // POST / login


// ========================JSON===============================// 

// GET /users: JSON index of all users.
// TODO2:
// --> checkAuth() 
app.get("/users", checkAuth(), (request, response) => {
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
// TODO2:
// --> checkAuth() 
app.get("/products", checkAuth(), (request, response) => {
    // const seeds = require('./seeds-products.js');
    // res.json(seeds.products);
    // should alwasy have .then / catch if using mongoose models. 
    Product.find() 
        .then(products => {
            response.json(products)
        } )
        .catch(error => {
            console.log('Query error: ', error);
            return response.sendStatus(500); // report erorr at HTTP 500 to  })
        });
}); // GET /products

// GET /product/:id JSON product details
// TODO2:
// --> checkAuth() 
app.get('/products/:id', checkAuth(), (request, response) => {
    // response.json( request.params)
    console.log('Fetched product', request.params)
    Product.findOne(
        { _id : request.params.id },
        (error, product) => {
            if (error) {
                response.sendStatus(500);
                return console.log('Error finding product', error);
            }
            response.json(product);

        } // query callback
    );

}) //GET /products/:id




