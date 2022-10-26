import { prisma } from "../index.js";

export default async (req, res) => {
  if (!req.body.username || !req.body.filename) {
    return res.status(400).send("Missing filename or username");
  }

  const user = await prisma.user.findUnique({
    where: { username: req.body.username.toLowerCase() },
  });

  const fileId = await prisma.file.findUnique({
    where: {
      title: req.body.filename,
      author: req.body.username,
    },
  });

  await prisma.file.upsert({
    where: {
      id: {},
      title: req.body.filename,
      authorId: req.id,
    },
    create: {
      author: user,
    },
  });

  return res.json({ success: "Successfully added user to file" });
};
