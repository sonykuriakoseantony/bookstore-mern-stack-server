// import express, crossOriginIsolated, and dotenv into indexedDB.js file

require('dotenv').config(); // Load environment variables from .env file into process.env by default by using .config() method of dotenv package
const express = require('express'); 
const cors = require('cors');

//import router
const router = require('./routes/router')

//import database
require('./config/db')

//create express server using express function
const bookstoreServer = express();

//enable cors in server
bookstoreServer.use(cors()); //unless you specify options inside cors() method it will aloow form all origins by default

//use json parser middleware to parse incoming JSON requests
bookstoreServer.use(express.json());

//use router in server
bookstoreServer.use(router)

//create a port for server to listen on
const PORT = 3000

//start server and listen on defined port
bookstoreServer.listen(PORT, () => {
    console.log(`Bookstore Server started and listening on PORT:${PORT}, Waiting for client request...`);
});

//resolve GET request to root route
bookstoreServer.get('/', (req, res) => {
    res.status(200).send(`<h1>Bookstore Server started and listening on PORT:${PORT}, Waiting for client request...</h1>`)
})
//resolve GET request to root route
bookstoreServer.post('/', (req, res) => {
    res.status(200).send(`<h1>Bookstore Server started and listening on PORT:${PORT}, Waiting for client request...</h1>`)
})


