import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import register from "./routes/register.js";
import login from "./routes/login.js";
import verifyAuth from "./middleware/verifyAuth.js";
import files from "./routes/files.js";
import searchUser from "./routes/searchUser.js";
import getUsername from "./routes/getUsername.js";
import searchFile from "./routes/searchFile.js";
import upload from "./routes/upload.js";
import deleteFile from "./routes/deleteFile.js";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import aws from "aws-sdk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename));

aws.config.update({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

export const s3 = new aws.S3();

export const prisma = new PrismaClient();

const main = async () => {
  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: "*",
      methods: "GET,POST,OPTIONS",
      optionsSuccessStatus: 200,
    })
  );

  app.use(express.json());

  app.use(express.static(__dirname + "/Files"));

  app.use(fileUpload());

  app.post("/login", login);
  app.post("/register", register);
  app.post("/upload", verifyAuth, upload);
  app.post("/deleteFile", verifyAuth, deleteFile);
  app.get("/files", verifyAuth, files);
  app.get("/searchUser", searchUser);
  app.get("/getUsername", verifyAuth, getUsername);
  app.get("/searchFile", verifyAuth, searchFile);

  const port = process.env.PORT || 8393;
  app.listen(port, () => console.log("Listening on port", port));
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
