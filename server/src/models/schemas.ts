import ObjectId, { Schema } from "mongoose";
import { validateEmail, validatePassword } from "../helper";

const UserSchema = new Schema({
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

const MessageSchema = new Schema({
    fromId: {
        type: ObjectId,
        required: true
    },
    toId: {
        type: ObjectId,
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

export { UserSchema, MessageSchema };