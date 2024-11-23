import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Response } from "express";
import { Types } from "mongoose";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const generateJWTToken = (userId: Types.ObjectId, res: Response) => {
  const jwtSecret: string = process.env.JWT_SECRET ?? "";
  const nodeEnv: string = process.env.NODE_ENV ?? "";
  if (jwtSecret.length == 0) {
    console.log("JWT_SECRET not set in the environment variables");
    return "Internal Server Error"; // Return exception from here
  }
  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // in milliseconds
    httpOnly: true, // prevent XSS attacks and cross-site scripting attacks
    sameSite: "strict",
    secure: nodeEnv !== "development",
  });
  return token;
};
