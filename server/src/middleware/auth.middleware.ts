import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const protectRoute = async (req: Request, res: Response, next: any) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const jwtSecret = process.env.JWT_SECRET ?? "";
    const decodedToken = jwt.verify(token, jwtSecret);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(
      (decodedToken as jwt.JwtPayload).userId
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
