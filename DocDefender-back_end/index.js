import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import register from "./routes/register.js";
import login from "./routes/login.js";
import verifyAuth from "./middleware/verifyAuth.js";
import images from "./routes/images.js";
import searchUser from "./routes/searchUser.js";
import getUsername from "./routes/getUsername.js";
import searchFile from "./routes/searchFile.js";
import upload from "./routes/upload.js";
import fileUpload from "express-fileupload";

export const prisma = new PrismaClient();

const main = async () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

  app.use(express.json());

  app.use(fileUpload());

  app.post("/login", login);
  app.post("/register", register);
  app.post("/upload", verifyAuth, upload);
  app.get("/images", verifyAuth, images);
  app.get("/searchUser", searchUser);
  app.get("/getUsername", verifyAuth, getUsername);
  app.get("/searchFile", searchFile);

  app.listen(8393, () => console.log("Listening on port 8393"));
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
