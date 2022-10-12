import { s3, prisma } from "../index.js";

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

  return res.json({ success: files });

  let encodedFiles = [];

  if (files.length != 0) {
    return getFile(files[0].title)
      .then((fileData) => {
        encodedFiles.push(encode(fileData.Body));
        res.json({ success: encodedFiles });
      })
      .catch((e) => {
        res.send(e);
      });
  }

  res.json({ error: "No files found" });
}
