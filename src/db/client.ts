// Homework #1
// Copy Paste this code into chatgpt and come up with 5 questions for further research.

import { MongoClient } from 'mongodb'
const url = 'mongodb://localhost:27017';
const dbName = 'bicode'

// This function connects to the mongodb server at `url`.
// It returns the client, the db, and the collection.
// This function returns as an object for destructuring use.
export const connect = async () => {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('main');
    return { client, db, collection }
}
