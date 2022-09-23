import { prisma } from "../index.js";

export default async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { username: req.body.username.toLowerCase() },
  });

  return res.json(user.username);
};
