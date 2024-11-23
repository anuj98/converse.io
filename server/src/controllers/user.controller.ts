import { Request, Response } from "express";
import User from "../models/user.model";

export const getUsers = async (req: Request, res: Response) => {
  const { filter } = req.body;
  try {
    let allUsersDB = [];
    if (filter) {
      allUsersDB = await User.find({ fullName: { $regex: filter, $options: "i" } }).select([
        "-password",
        "-__v",
      ]);
    } else {
      allUsersDB = await User.find().select(["-password", "-__v"]);
    }
    res.status(200).json(allUsersDB);
  } catch (error) {
    console.log("Error in getUsers", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
