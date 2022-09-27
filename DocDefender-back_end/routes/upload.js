import { prisma } from "../index.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename), "..");

export default async (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file;
  const uploadPath = __dirname + "/Files/" + file.name;

  file.mv(uploadPath, async (err) => {
    if (err) return res.status(400).json({ error: err });

    await prisma.file.create({
      data: {
        authorId: req.id,
        url: uploadPath,
        author: {
          connect: {
            id: req.id,
          },
        },
        title: file.name,
      },
    });

    res.json({ success: "File uploaded" });
  });
};
