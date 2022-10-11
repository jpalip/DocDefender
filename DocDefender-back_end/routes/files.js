import { response } from "express";
import { s3, prisma } from "../index.js";

async function getFile(Key) {
  const data = s3
    .getObject({
      Bucket: "docdefender-filestore",
      Key,
    })
    .promise();

  return data;
}

function encode(data) {
  let buf = Buffer.from(JSON.stringify(data));
  let base64 = buf.toString("base64");
  return base64;
}

export default async function (req, res) {
  const id = req.id;

  const files = await prisma.file.findMany({
    where: {
      author: {
        some: {
          id,
        },
      },
    },
  });

  let encodedFiles = [];

  if (files.length != 0) {
    getFile(files[0].title)
      .then((fileData) => {
        encodedFiles.push(encode(fileData.Body));
        res.json({ success: encodedFiles });
      })
      .catch((e) => {
        res.send(e);
      });
  }

  res.json({ error: "No files found" });
}
