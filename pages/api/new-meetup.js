import { MongoClient } from "mongodb";

// /api/new-meetup

const user = process.env.MONGO_USER;
const pw = process.env.MONGO_PASSWORD;
const dbName = process.env.MONGO_DB_NAME;

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      // connect returns a promise, so can turn into async function
      const client = await MongoClient.connect(
        `mongodb+srv://${user}:${pw}@cluster0.1ykyz.mongodb.net/${dbName}?retryWrites=true&w=majority`
      );
      const db = client.db();

      const meetupsCollection = db.collection("meetups");

      const result = await meetupsCollection.insertOne(data);

      client.close();

      // response object
      res.status(201).json({ message: "Meetup inserted!" });
    } catch (error) {
      console.error(error);
    }
  }
}

export default handler;
