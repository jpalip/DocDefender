import argon2 from "argon2";
import {prisma} from "../index.js";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  if (!user || !(await argon2.verify(user.password, req.body.password))) {
    return res.json({ error: "Username or password is incorrect" });
  }

  const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 86400
  });

  res.json({ success: "Successfully logged in", token });
};