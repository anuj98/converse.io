import mongoose from "mongoose";
import { validateEmail, validatePassword } from "../helper";
import { IUser, IMessage } from "./models";

const UserSchema = new mongoose.Schema<IUser>({
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validateEmail, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 16,
        validate: [validatePassword, 'Please fill a valid password']
    },
    profileImage: {
        data: Buffer,
        contentType: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
});

const MessageSchema = new mongoose.Schema<IMessage>({
    fromId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", UserSchema);
const Message = mongoose.model("Message", MessageSchema);

export { User, Message };