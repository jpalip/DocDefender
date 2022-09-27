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

    await prisma.user.update({
      create: {
        file: {
          id: {
            increment: 1,
          },
          title: file.name,
          url: uploadPath,
          authorId: req.id,
        },
      },
    });
    res.json({ success: "File uploaded" });
  });
};
