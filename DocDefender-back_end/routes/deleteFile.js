import { prisma } from "../index.js";

export default async function (req, res) {
  const id = req.id;
  const imageId = req.file.id;

  const files = await prisma.file.findUnique({
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
