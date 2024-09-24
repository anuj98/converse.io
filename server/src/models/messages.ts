import mongoose from "mongoose";
import { MessageSchema } from "./schemas";

interface Message extends Document {
    fromId: string;
    toId: string;
    message: string;
    createdOn: Date;
    updatedOn: Date;
}

const Message = mongoose.model<Message>("messages", MessageSchema);

export default Message;