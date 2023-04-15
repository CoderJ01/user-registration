const express = require('express');
const connectDB = require('./MongoDB');
require('dotenv').config();

const app = express();
const PORT = 3001;

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Testing');
});

app.listen(PORT, console.log(`Listening at port: ${PORT}...`));