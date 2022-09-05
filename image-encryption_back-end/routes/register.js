import argon2 from "argon2";
import {prisma} from "../index.js";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  const { username, password } = req.body;

  if (username === undefined || password === undefined) {
    res.status(400).json({ error: "Missing username or password" });
    return;
  }

  if (username.length < 3) {
    res
      .json({ error: "Username must be greater than 2 characters" });
    return;
  }

  if (password.length < 5) {
    res
      .json({ error: "Password must be greater than 5 characters" });
    return;
  }

  if (
    await prisma.user.count({
      where: { username },
    })
  ) {
    res.json({ error: "Username already exists" });
    return;
  }

  const user = await prisma.user.create({
    data: {
      username,
      password: await argon2.hash(password),
    },
  });

  const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 86400
  });

  res.json({ success: "User created successfully", token });
};