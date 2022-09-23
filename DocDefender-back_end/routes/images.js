import { prisma } from "../index.js";

export default async function (req, res) {
  const id = req.id;

  const images = await prisma.file.findMany({
    where: {
      authorId: id,
    },
  });

  res.json(images);
}
