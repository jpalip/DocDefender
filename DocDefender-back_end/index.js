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
import requestView from "./routes/requestView.js";
import aws from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const spacesEndpoint = new aws.Endpoint(process.env.DO_SPACES_ENDPOINT);

export const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

export const prisma = new PrismaClient();

const main = async () => {
  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: "*",
    })
  );

  app.use(express.json());

  app.post("/login", login);
  app.post("/register", register);
  app.post("/upload", verifyAuth, upload);
  app.post("/deleteFile", verifyAuth, deleteFile);
  app.get("/files", verifyAuth, files);
  app.get("/searchUser", searchUser);
  app.get("/getUsername", verifyAuth, getUsername);
  app.get("/searchFile", verifyAuth, searchFile);
  app.get("/requestView", verifyAuth, requestView);

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
