import { prisma } from "../index.js";

export default async (req, res) => {
  const id = req.id;

  if (!req.body.username || !req.body.filename) {
    return res.status(400).send("Missing filename or username");
  }

  const fileId = await prisma.file.findMany({
    where: {
      title: req.body.filename,
    },
  });

  var fileID = fileId[0].id;

  const user = await prisma.user.update({
    where: {
      username: req.body.username,
    },
    data: {
      file: {
        connect: {
          id: fileID,
        },
      },
    },
  });

  return res.json({ success: "Successfully added user to file" });
};
