import { prisma } from "../index.js";

export default async (req, res) => {
  const id = req.id;

  if (!req.body.username || !req.body.filename) {
    return res.status(400).send("Missing filename or username");
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      file: true,
    },
  });

  const fileId = await prisma.file.findMany({
    where: {
      title: req.body.filename,
    },
  });

  var fileID = fileId[0].id;

  console.log(user);

  // const authorList = await prisma.file.update({
  //   where: {
  //     id: fileID,
  //   },
  //   data: {
  //     author: { set: user },
  //   },
  // });

  return res.json({ success: "Successfully added user to file" });
};
