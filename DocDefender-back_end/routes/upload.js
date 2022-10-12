import { prisma } from "../index.js";
import multer from "multer";
import multerS3 from "multer-s3";

export default async (req, res) => {
  const upload = multer({
    storage: multerS3({
      s3,
      bucket: "docdefender-filestore",
      acl: "",
      key: function (request, file, cb) {
        console.log(file);
        cb(null, file.originalname);
      },
    }),
  }).single("file");

  upload(req, res, async function (err) {
    if (err) {
      console.log(err);
      return res.json({ error: err.message });
    }
    // await prisma.file.create({
    //   data: {
    //     authorId: req.id,
    //     url: file.name,
    //     author: {
    //       connect: {
    //         id: req.id,
    //       },
    //     },
    //     title: file.name,
    //   },
    // });
    return res.json({ success: "File has been successfully uploaded" });
  });
};
