// Homework #1
// Copy Paste this code into chatgpt and come up with 5 questions for further research.

import { MongoClient } from "mongodb";
if (!process.env.MONGO_URL) {
  throw new Error("Missing MONGO_URL");
}

const mongoUrl = process.env.MONGO_URL;

export const connect = async () => {
  const client = new MongoClient(mongoUrl);
  await client.connect();
  const db = client.db("bicode");
  return { client, db }
}