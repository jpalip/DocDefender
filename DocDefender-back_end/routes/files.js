import { prisma } from "../index.js";

export default async function (req, res) {
  const id = req.id;

  const files = await prisma.file.findMany({
    where: {
      author: {
        some: {
          id,
        },
      },
    },
  });

  res.json(files);
}
