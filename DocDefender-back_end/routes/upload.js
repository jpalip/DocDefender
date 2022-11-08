import { prisma, s3 } from "../index.js";
import multer from "multer";
import multerS3 from "multer-s3";

export default async (req, res) => {
  var filename;

  const getFileType = (param) => param.split(".").pop();
  const getFileName = (param) =>
    param.substring(0, param.length - getFileType(param).length);

  const upload = multer({
    storage: multerS3({
      s3,
      bucket: process.env.DO_SPACES_NAME,
      acl: "",
      key: async function (request, file, cb) {
        // The Following code prevents duplicate file names - It adds (1),(2),(3),...etc to the filename if it exists already, then uploads it
        var fileExists = await prisma.file.count({
          where: {
            title: filename,
          },
        });

        var title = getFileName(file.originalname);
        var fileType = getFileType(file.originalname);

        console.log(title, fileType);

        var count = 1;
        while (fileExists > 0) {
          title += "(" + count.toString() + ")";
          filename = title + "." + fileType;
          count++;
          fileExists = await prisma.file.count({
            where: {
              title: filename,
            },
          });
        }

        cb(null, filename); // file.originalname is the name uploaded to Bucket
      },
    }),
  }).single("file");

  upload(req, res, async function (err) {
    if (err) {
      console.log(err);
      return res.json({ error: err.message });
    }

    var params = {
      Bucket: process.env.DO_SPACES_NAME,
      Key: filename,
      Expires: 60,
    };

    var fileURL = s3.getSignedUrl("getObject", params);

    await prisma.file.create({
      data: {
        authorId: req.id,
        url: fileURL,
        author: {
          connect: {
            id: req.id,
          },
        },
        title: filename,
      },
    });

    return res.json({ success: "File has been successfully uploaded" });
  });
};
