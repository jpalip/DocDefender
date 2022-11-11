import argon2 from "argon2";
import { prisma } from "../index.js";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  let { email, username, password } = req.body;

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ error: "Missing username, password or email" });
  }

  if (username.length < 3 || username.length > 20) {
    return res.json({ error: "Username must be between 3 and 20 characters" });
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return res.json({
      error: "Username must only contain alphanumeric characters",
    });
  }

  //ADD CHECK FOR EMAIL VALIDATION
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return res.json({
      error: "Please enter a valid email",
    });
  }

  if (password.length < 5) {
    return res.json({ error: "Password must be greater than 5 characters" });
  }

  if (
    await prisma.user.count({
      where: { username },
    })
  ) {
    return res.json({ error: "Username already exists" });
  }

  if (
    await prisma.user.count({
      where: { email },
    })
  ) {
    return res.json({ error: "Email already in use" });
  }

  const user = await prisma.user.create({
    data: {
      email,
      ipAddr: ip,
      username,
      password: await argon2.hash(password),
    },
  });

  const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 86400,
  });

  res.json({ success: "User created successfully", token });
};
