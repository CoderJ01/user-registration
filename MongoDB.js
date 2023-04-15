const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
require('dotenv').config();

async function retrieveUser(email) {
    let object;

    await client.connect()
    const db = client.db(process.env.DB);
    const coll = db.collection('users');
    const cursor = coll.find({ 'user.email': email });
    await cursor.forEach(
        session => {
            object = session
        }
    );

    setTimeout(() => {
        client.close();
    }, 1500)

    return object;
}

module.exports = { retrieveUser };