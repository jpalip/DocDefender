import { prisma } from "../index.js";

export default async (req, res) => {
  if (!req.body.username || !req.body.filename) {
    return res.status(400).send("Missing filename or username");
  }

  console.log("Username: ", req.body.username);
  console.log("Filename: ", req.body.filename);

  await prisma.file.update({
    where: {
      id: parseInt(fileId),
    },
    data: {
      url: fileURL,
    },
  });
};
