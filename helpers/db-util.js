require("dotenv").config();
import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.gl1x3.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  await db.collection(collection).insertOne(document);
}

export async function getAllDocument(client, collection, sort, filter = {}) {
  const db = client.db();
  const document = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();
  return document;
}
