import { prisma, s3 } from "../index.js";

export default async (req, res) => {
  var fileId = parseInt(req.query.fileId);
  var filename = req.query.filename;

  if (!filename) {
    return res.status(400).json({ error: "Missing or invalid filename" });
  }

  if (!fileId) {
    return res.status(400).json({ error: "Missing or invalid fileId" });
  }

  var params = {
    Bucket: process.env.DO_SPACES_NAME,
    Key: filename,
    Expires: 60,
  };

  var fileURL = s3.getSignedUrl("getObject", params);

  const result = await prisma.file.findUnique({
    where: {
      id: fileId,
    },
  });

  // Fixes security vulnerability - only the owner of the image can request access
  if (result.authorId != req.id) {
    return res.status(401);
  }

  await prisma.file.update({
    where: {
      id: fileId,
    },
    data: {
      url: fileURL,
    },
  });

  return res.json({ success: "View has been successfully requested" });
};
