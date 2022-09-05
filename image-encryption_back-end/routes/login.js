import argon2 from "argon2";
import {prisma} from "../index.js";

export default async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  if (!user || !(await argon2.verify(user.password, req.body.password))) {
    return res.json({ error: "Username or password is incorrect" });
  }

  res.json({ id: user.id });
};