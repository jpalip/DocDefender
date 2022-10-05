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
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(path.dirname(__filename));

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

  app.use(express.static(__dirname + "/Files"));

  app.use(fileUpload());

  app.post("/login", login);
  app.post("/register", register);
  app.post("/upload", verifyAuth, upload);
  app.get("/images", verifyAuth, images);
  app.get("/searchUser", searchUser);
  app.get("/getUsername", verifyAuth, getUsername);
  app.get("/searchFile", searchFile);

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
