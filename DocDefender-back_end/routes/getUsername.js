import { prisma } from "../index.js";

export default async (req, res) => {
  const id = req.id;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      username: true,
    },
  });

  res.json({ username: user.username });
};
