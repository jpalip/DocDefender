import { prisma } from "../index.js";

export default async (req, res) => {
  if (!req.query.filename) {
    return res.status(400).json({ error: "Missing filename" });
  }

  const files = await prisma.file.findMany({
    where: { title: { startsWith: req.query.title } },
    select: { title: true },
  });

  res.json({ success: files });
};
