import { Request, Response } from "express";
import Message from "../models/message.model";
import { Types } from "mongoose";

export const getMessages = async (req: Request, res: Response) => {
  const userDetails = req.user;
  try {
    const messages = await Message.find({
      $or: [{ senderId: userDetails._id }, { receiverId: userDetails._id }],
    }).select("-__v");
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const insertMessage = async (req: Request, res: Response) => {
  const { text, recieverId, picture } = req.body;
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
      text,
      senderId: userDetails._id,
      recieverId,
      picture,
    });

    if (message) {
      await message.save();
    } else {
      res.status(400).json({ message: "Invalid message data" });
    }
    res.status(200).json({
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
  console.log("MessageId:", id);
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
    const message = await Message.findOne({ _id: id, senderId: userDetails._id });

    if (message) {
      const response = await Message.findByIdAndUpdate(
        id,
        { text, picture },
        { returnDocument: "after" }
      ).select("-__v");

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
    console.log("Error in insertMessage", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log("MessageId:", id);
  const userDetails = req.user;
  try {
    if (!id) {
      return res.status(400).json({ message: "recievedId is required" });
    }

    // Find message
    const message = await Message.findOne({ _id: id, senderId: userDetails._id });

    if (message) {
      // Delete message
      await Message.deleteOne({ _id: id });
      res.status(200).json({ message: "Delete message successfull" });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    console.log("Error in insertMessage", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};