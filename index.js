// Express server initialisation
const express = require('express');
const app = express();
// const { Server } = require('http');

const PORT = 1337;

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}...`)
})