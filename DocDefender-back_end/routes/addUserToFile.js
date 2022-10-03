import { prisma } from "../index.js";

export default async (req, res) => {
  if (!req.body.username || !req.body.filename) {
    return res.status(400).send("Missing filename or username");
  }

  const user = await prisma.user.update({
    where: {
      data: {
        username: req.body.username,
      },
    },
  });
};
