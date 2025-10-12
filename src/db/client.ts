// Homework #1
// Copy Paste this code into chatgpt and come up with 5 questions for further research.

import { MongoClient } from "mongodb";
if (!process.env.MONGO_URL) {
  throw new Error("Missing MONGO_URL");
}
const client = new MongoClient(process.env.MONGO_URL);
await client.connect();
export const db = client.db("bicode");
export { client };
