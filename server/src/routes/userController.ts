import { Request, Response } from "express";
import { User } from "../models/schemas";

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
}

export const getUser = async (req: Request, res: Response) => {
    const userName = req.params.name as string;
    let users = []
    if (userName && userName.length > 0) {
        users = await User.find({name: {$regex: userName, $options: 'i'}});
        res.json(users);
    }
    else {
        res.status(400);
        res.json({"detail": "name parameter cannot be null or empty"})
    }
}

export const registerUser = async (req: Request, res: Response) => {
    const data = req.body;
    const userMetdata = new User(data);
    const response = await userMetdata.save();
    res.json(response);
}

export const loginUser = async (req: Request, res: Response) => {
    const data = req.body;
    const email = data.email;
    const pass = data.password;
    const user = await User.findOne({email: email, password: pass});
    res.json(user);
}