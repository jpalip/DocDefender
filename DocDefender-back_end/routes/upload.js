import { prisma, s3 } from "../index.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename), "..");

export default async (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file;

  const fileContent = Buffer.from(file.data, "binary");

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.name,
    Body: fileContent,
  };

  await prisma.file.create({
    data: {
      authorId: req.id,
      url: process.env.DYNO
        ? `https://docdefender-backend.herokuapp.com/${file.name}`
        : `http://localhost:8393/${file.name}`,
      author: {
        connect: {
          id: req.id,
        },
      },
      title: file.name,
    },
  });

  s3.upload(params, function (err, data) {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.json({ success: "File uploaded" });
  });
};
