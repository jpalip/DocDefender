import express from "express";
import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const app = express();
  app.use(express.json());

  app.post("/createUser", async (req, res) => {
    const { username, password } = req.body;

    if (username === undefined || password === undefined) {
      res.status(400).json({ error: "Missing username or password" });
      return;
    }

    if (username.length < 3) {
      res
        .status(400)
        .json({ error: "Username must be greater than 2 characters" });
      return;
    }

    if (password.length < 5) {
      res
        .status(400)
        .json({ error: "Password must be greater than 5 characters" });
      return;
    }

    if (
      await prisma.user.count({
        where: { username },
      })
    ) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }

    const user = await prisma.user.create({
      data: {
        username,
        password: await argon2.hash(password),
      },
    });

    res.status(200).json({ id: user.id });
  });

  app.post("/login", async (req, res) => {
    return res.send(200);
  });

  app.post("/logout", async (req, res) => {
    return res.send(200);
  });

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
