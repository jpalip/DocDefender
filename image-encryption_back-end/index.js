import express from "express";
import argon2 from "argon2";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

  app.use(express.json());

  app.post("/register", async (req, res) => {
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
    const user = await prisma.user.findUnique({
      where: { username: req.body.username },
    });

    if (!user || !(await argon2.verify(user.password, req.body.password))) {
      return res.json({ error: "Username or password is incorrect" });
    }

    res.json({ id: user.id });
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
