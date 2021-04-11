import {
  connectDatabase,
  insertDocument,
  getAllDocument,
} from "../../../helpers/db-util";

export default async function handler(req, res) {
  const { eventId } = req.query;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  // POST
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalide comment." });
      client.close();
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      await insertDocument(client, "comments", newComment);
      res.status(201).json({ message: "Added comment.", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
    }
  }

  // GET
  if (req.method === "GET") {
    let comments = [];

    try {
      comments = await getAllDocument(
        client,
        "comments",
        { _id: -1 },
        { eventId }
      );
      res.status(200).json({ comments });
    } catch (error) {
      res.status(500).json({ message: "Reading database failed!" });
    }
  }
  client.close();
}
