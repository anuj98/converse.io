import { Request, Response } from "express";
import User from "../models/user.model";
import { generateJWTToken, hashPassword } from "../lib/utils";
import bcrypt from "bcryptjs";

export const signup = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  try {
    if (
      !fullName ||
      fullName.length == 0 ||
      !email ||
      email.length == 0 ||
      !password ||
      password.lenght < 6
    ) {
      return res.status(400).json({
        message:
          "fullName, email and password are required. Password must by at least 6 characters",
      });
    }
    let user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    // Create a new user object
    user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (user) {
      // Save in DB
      await user.save();

      // Generate JWT token if successfully created a user
      generateJWTToken(user._id, res);

      res.status(201).json(user);
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || email.length == 0 || !password || password.lenght < 6) {
      return res.status(400).json({
        message:
          "email and password are required. Password must by at least 6 characters",
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      console.log("Email not found in the DB");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log("Password is not matching with DB credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateJWTToken(user._id, res);

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req: Request, res: Response) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
