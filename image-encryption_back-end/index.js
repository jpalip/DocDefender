import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import register from "./routes/register.js";
import login from "./routes/login.js";
import logout from "./routes/logout.js";

export const prisma = new PrismaClient();

const main = async () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

  app.use(express.json());

  app.post("/register", register);
  app.post("/login", login);
  app.post("/logout", logout);

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
