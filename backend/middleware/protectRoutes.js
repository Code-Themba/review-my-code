import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import { User } from "../models/User.js";

export const protectRoutes = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.authToken;

  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decode.userId, {
        attributes: {
          exclude: "password",
        },
      });
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});
