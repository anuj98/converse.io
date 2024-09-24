import mongoose from "mongoose";

export interface IMessage extends Document {
    fromId: mongoose.Schema.Types.ObjectId;
    toId: mongoose.Schema.Types.ObjectId;
    message: string;
    createdOn: Date;
    updatedOn: Date;
}

export interface IUser extends Document {
    displayName: string;
    email: string;
    password: string;
    profileImage: string;
    createdOn: Date;
    updatedOn: Date;
}