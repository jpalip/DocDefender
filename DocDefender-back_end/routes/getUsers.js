import { prisma } from "../index.js";

export default async function (req, res) {
  const id = req.id;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (user !== null && !user.admin) {
    return res.json({ error: "You do not have permission" });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      admin: true,
      file: true,
    },
  });

  return res.json({ success: users });
}
