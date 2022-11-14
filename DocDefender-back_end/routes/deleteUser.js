import { s3, prisma } from "../index.js";

export default async function (req, res) {
  if (!req.body.username) {
    return res.status(400).json({ error: "Missing username" });
  }

  const id = req.id;
  const username = req.body.username;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (user.id !== id && !user.admin) {
    return res.status(403).json({ error: "Insufficient permissions" });
  }

  // remove all users files from s3

  await prisma.user.delete({
    where: {
      username: username,
    },
  });

  return res.json({ success: "User successfully deleted" });
}
