import { prisma } from "../index.js";

export default async (req, res) => {
  const id = req.id;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  return res.json({ username: user.username });
};
