import { Request, Response } from "express";
import Message from "../models/message.model";

export const getTopMessages = async (req: Request, res: Response) => {
  const userDetails = req.user;
  try {
    let messages = await Message.aggregate([
      {
        $match: {
          $or: [{ senderId: userDetails._id }, { receiverId: userDetails._id }],
        },
      },
      {
        $addFields: {
          friendId: {
            $cond: {
              if: { $eq: ["$senderId", userDetails._id] },
              then: "$recieverId",
              else: "$senderId",
            },
          },
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort messages by `createdAt` in descending order
      },
      {
        $group: {
          _id: "$friendId", // Group by the friendId (unique friend)
          lastMessage: { $first: "$$ROOT" }, // Get the most recent message for each group
        },
      },
      {
        $replaceRoot: { newRoot: "$lastMessage" }, // Replace the root document with the last message
      },
      {
        $sort: { createdAt: -1 }, // Sort messages by `createdAt` in descending order
      },
      {
        $project: {
          "id": "$_id",
          "senderId": "$senderId",
          "recieverId": "$recieverId",
          "text": "$text",
          "createdAt": "$createdAt",
          "updatedAt": "$updatedAt"
        }
      }
    ]);
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessagesForSingleFriend = async (
  req: Request,
  res: Response
) => {
  try {
    const userDetails = req.user;
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Friends userId is required" });
    }
    const messages = await Message.find({
      $or: [
        { senderId: userDetails._id, recieverId: id },
        { senderId: id, recieverId: userDetails._id },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessagesForSingleFriend", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const insertMessage = async (req: Request, res: Response) => {
  const { recieverId, text, picture } = req.body;
  console.log("Input as text, reciever, picture", text, recieverId, picture);
  const userDetails = req.user;
  try {
    if (!recieverId) {
      return res.status(400).json({ message: "recievedId is required" });
    } else if (!text && !picture) {
      return res
        .status(400)
        .json({ message: "Either text or picture is required" });
    }

    // Create message object
    const message = new Message({
      text: text,
      senderId: userDetails._id,
      recieverId: recieverId,
      picture,
    });

    if (message) {
      await message.save();

      // TODO: Real time functionality with Socket
    } else {
      res.status(400).json({ message: "Invalid message data" });
    }
    res.status(201).json({
      id: message._id,
      senderId: message.senderId,
      recieverId: message.recieverId,
      text: message.text,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    });
  } catch (error) {
    console.log("Error in insertMessage", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateMessage = async (req: Request, res: Response) => {
  const { text, picture } = req.body;
  const id = req.params.id;
  const userDetails = req.user;
  try {
    if (!id) {
      return res.status(400).json({ message: "recievedId is required" });
    } else if (!text && !picture) {
      return res
        .status(400)
        .json({ message: "Either text or picture is required" });
    }

    // Find message
    const message = await Message.findOne({
      _id: id,
      senderId: userDetails._id,
    });

    if (message) {
      const response = await Message.findByIdAndUpdate(
        id,
        { text, picture },
        { returnDocument: "after" }
      );

      if (response) {
        res.status(200).json({
          id: response._id,
          senderId: response.senderId,
          recieverId: response.recieverId,
          text: response.text,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        });
      } else {
        res.status(500).json({ message: "Failed to save message" });
      }
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    console.log("Error in updateMessage", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userDetails = req.user;
  try {
    if (!id) {
      return res.status(400).json({ message: "recievedId is required" });
    }

    // Find message
    const message = await Message.findOne({
      _id: id,
      senderId: userDetails._id,
    });

    if (message) {
      // Delete message
      await Message.deleteOne({ _id: id });
      res.status(200).json({ message: "Delete message successfull" });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    console.log("Error in deleteMessage", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
