import { prisma, s3 } from "../index.js";

export default async (req, res) => {
  const fileInfo = req.query.filename.split("/");
  var fileId = fileInfo[1];
  var filename = fileInfo[0];

  if (!req.query.filename) {
    console.log(req.query);
    return res.status(400).json({ error: "Missing filename and/or fileId" });
  }

  var params = {
    Bucket: process.env.DO_SPACES_NAME,
    Key: filename,
    Expires: 60,
  };

  var fileURL = s3.getSignedUrl("getObject", params);

  const result = await prisma.file.findUnique({
    where: {
      id: parseInt(fileId),
    },
  });

  // Fixes security vulnerability - only the owner of the image can request access
  if (result.authorId != req.id) {
    return res.status(401);
  }

  await prisma.file.update({
    where: {
      id: parseInt(fileId),
    },
    data: {
      url: fileURL,
    },
  });

  return res.json({ success: "View has been successfully requested" });
};
