const express = require('express');
const app = express();
const PORT = 1337;
const data = require('./data.js');

//Prevent CORS errors from frontend requests.
const cors = require('cors');
app.use(cors());

app.use(express.json()); //enable support for JSON-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Express server initialisation
// app.get('/', (request,response) => {
//     console.log('get/')
//     response.send('welcome to the home page')
// });

app.get("/products", (req, res) => {
    res.json(data.products);
});

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}...`)
    console.log('server started at http://localhost:1337')
})

