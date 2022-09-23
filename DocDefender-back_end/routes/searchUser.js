import { prisma } from "../index.js";

export default async (req, res) => {
  if (!req.query.username) {
    return res.status(400).json({ error: "Missing username" });
  }

  const user = await prisma.User.findUnique({
    where: { username: req.query.username },
  });

  if (!user) {
    return res.json({ error: "Username is incorrect" });
  }

  res.json({ success: "Found User!" });
};
