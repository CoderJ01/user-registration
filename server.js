const { MongoClient } = require('mongodb');
const express = require('express');
const connectDB = require('./MongoDB');
require('dotenv').config();
const client = new MongoClient(process.env.MONGO_URI);
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;

connectDB();

const retrieveUser = async (userEmail) => {
    let object;

    await client.connect()
    const db = client.db(process.env.DB);
    const cursor = await db.collection('users').findOne({ email: userEmail });
    object = cursor;
    
    setTimeout(() => {
        client.close();
    }, 1500)

    return object;
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/verify/:email/:token', async (req, res) => {
    let user = retrieveUser(req.params.email);
    
    jwt.verify(req.params.token, process.env.SECRET_KEY, function(err, decoded) {
        if (err) {
            console.log(err);
            res.send('Email verification failed, possibly the link is invalid or expired');
        }
        else {
            res.send('Email verifified successfully. You are able to login now.');
            user.verified = true;
            user.save();
        }
    });
});

app.listen(PORT, console.log(`Listening at port: ${PORT}...`));

module.exports = app;