export default function handler(req, res) {
  const { eventId } = req.query;

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
      return;
    }
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };
    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Max", text: "First comment" },
      { id: "c2", name: "Max2", text: "First comment2" },
      { id: "c3", name: "Max3", text: "First comment3" },
    ];
    res.status(200).json({ comments: dummyList });
  }
}
