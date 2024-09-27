import { Request, Response } from "express";
import { Message } from "../models/schemas";

export const lastMessageUniqueUsers = async (req: Request, res: Response) => {
    const userId = req.params.id as string;
        // const messages = await Message.find({$or: [{fromId: userId}, {toId: userId}], $sort: {"createdAt": -1}});
        try {
        const distinctUserLastMessage = await Message.aggregate([
            {$match: {$or: [{fromId: userId}, {toId: userId}]}},
            {$group: 
                {
                    _id: {$cond: [{$eq: ["$fromId", userId]}, "$toId", "$fromId"]},
                    lastMessage: { $last: "$$ROOT" }
                }
            },
            {$project:
                {
                    _id: 0,
                    userId: "$_id",
                    lastMessage: 1
                }
            },
            {$sort: {"lastMessage.createdAt": -1}}
        ])
        res.json(distinctUserLastMessage);
    }
    catch (exception) {
        console.error(exception);
        res.status(500).json({ message: "Error fetching distinct users" });
    } 
}

export const getMessagesForUser = async (req: Request, res: Response) => {
    const userId = req.params.id as string;
    const messages = await Message.find({$or: [{fromId: userId}, {toId: userId}]});
    res.json(messages);
}

export const sendMessage = async (req: Request, res: Response) => {
    const data = req.body;
    const message = new Message(data);
    const response = await message.save();
    res.json(response);
}

export const deleteMessage = async (req: Request, res: Response) => {
    const messageId = req.params.id as string;
    const response = await Message.deleteOne({_id: messageId});
    res.json(response);
}