import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const tokenGenerator = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.cookie("authToken", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 1000,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};
