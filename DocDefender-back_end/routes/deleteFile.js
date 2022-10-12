import { s3, prisma } from "../index.js";

export default async function (req, res) {
  if (!req.body.fileId) {
    return res.status(400).json({ error: "Missing fileId" });
  }

  const id = req.id;
  const fileId = req.body.fileId;

  const file = await prisma.file.findUnique({
    where: {
      id: fileId,
    },
  });

  if (file.authorId != id) {
    return res
      .status(403)
      .json({ error: "Insufficient permissions to delete this file" });
  }

  await prisma.file.delete({
    where: {
      id: fileId,
    },
  });

  s3.deleteObject(
    { Bucket: process.env.DO_SPACES_NAME, Key: file.title },
    function (err, _data) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Unable to delete file" });
      }

      return res.json({ success: "File successfully deleted" });
    }
  );
}
