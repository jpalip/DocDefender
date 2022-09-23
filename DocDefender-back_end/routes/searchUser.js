import { prisma } from "../index.js";

export default async (req, res) => {
  if (!req.query.username) {
    return res.status(400).json({ error: "Missing username" });
  }

  const users = await prisma.user.findMany({
    where: { username: { startsWith: req.query.username } },
    select: { username: true },
  });

  res.json({ success: users });
};
