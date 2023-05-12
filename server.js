// Express.js
const express = require('express');

// dotenv
require('dotenv').config();

// MongoDB
const { MongoClient } = require('mongodb');

// other Node.js packages
const jwt = require('jsonwebtoken');

// other imports
const connectDB = require('./MongoDB');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.CLEAR_DB_DATABASE);

module.exports = sequelize;

const client = new MongoClient(process.env.MONGO_URI);

const app = express();
const PORT = 3002;

connectDB();

const updateUserZelp = async (userEmail) => {
    await client.connect()
    const db = client.db(process.env.DB);
    await db.collection('users').findOneAndUpdate({ email: userEmail }, { $set: { verified: true }});
    client.close();
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/auth/verify/:email/:token', async (req, res) => {    
    jwt.verify(req.params.token, process.env.SECRET_KEY, function(err, decoded) {
        if (err) {
            console.log(err);
            res.send('Email verification failed, possibly the link is invalid or expired');
        }
        else {
            res.send('Email verifified successfully. You are able to login now.');
            updateUserZelp(req.params.email);
        }
    });
});

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, console.log(`Listening on PORT ${PORT}...`));
});

module.exports = app;