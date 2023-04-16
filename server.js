const { MongoClient } = require('mongodb');
const express = require('express');
const connectDB = require('./MongoDB');
require('dotenv').config();
const client = new MongoClient(process.env.MONGO_URI);

const app = express();
const PORT = 3001;

connectDB();

const retrieveUser = async (email) => {
    let object;

    await client.connect()
    const db = client.db(process.env.DB);
    const cursor = await db.collection('users').findOne({ username: 'monkeySeeMonkeyDo' });
    object = cursor;
    
    setTimeout(() => {
        client.close();
    }, 1500)

    console.log(object)

    return object;
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    retrieveUser('');
    res.send('Hello World');
});

app.listen(PORT, console.log(`Listening at port: ${PORT}...`));

module.exports = app;