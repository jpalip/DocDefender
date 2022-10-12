import { prisma, s3 } from "../index.js";
import multer from "multer";
import multerS3 from "multer-s3";

export default async (req, res) => {
  const upload = multer({
    storage: multerS3({
      s3,
      bucket: "docdefender-filestore",
      acl: "",
      key: function (request, file, cb) {
        cb(null, file.originalname);
      },
    }),
  }).single("file");

  upload(req, res, async function (err) {
    if (err) {
      console.log(err);
      return res.json({ error: err.message });
    }
    await prisma.file.create({
      data: {
        authorId: req.id,
        url: req.file.originalname,
        author: {
          connect: {
            id: req.id,
          },
        },
        title: req.file.originalname,
      },
    });
    return res.json({ success: "File has been successfully uploaded" });
  });
};
