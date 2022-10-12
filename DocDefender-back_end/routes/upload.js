import { prisma, s3 } from "../index.js";
import multer from "multer";
import multerS3 from "multer-s3";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "docdefender-filestore",
    acl: "",
    key: function (request, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
}).array("upload", 1);

export default async (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file;

  upload(req, res, async function (err) {
    if (err) {
      console.log(err);
      return res.json({ error: err });
    }
    await prisma.file.create({
      data: {
        authorId: req.id,
        url: file.name,
        author: {
          connect: {
            id: req.id,
          },
        },
        title: file.name,
      },
    });
    return res.json({ success: "File has been successfully uploaded" });
  });
};
