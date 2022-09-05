import jwt from "jsonwebtoken";
import {prisma} from "../index.js";

export default (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.id = user.id;

      next();
    });
  } else {
    return res.sendStatus(401);
  }
}