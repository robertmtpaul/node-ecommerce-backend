// Express server initialisation
const express = require('express');
const { Server } = require('http');
const app = express();
const axios = require('axios');

const PORT = 1337;

app.get('/', (request,response) => {
    console.log('get/')
    response.send('welcome to the home page')
});

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}...`)
})
