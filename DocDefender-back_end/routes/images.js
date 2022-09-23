import { prisma } from "../index.js";

export default async function (req, res) {
  const id = req.id;

  const images = await prisma.file.findMany({
    where: {
      author: {
        some: {
          id,
        },
      },
    },
  });

  res.json(images);
}
