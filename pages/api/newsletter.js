export default function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalide email address." });
      return;
    }

    const newUser = {
      id: new Date().toISOString(),
      email,
    };
    res.status(201).json({ message: `Successful subscription (${email})` });
  }
}
