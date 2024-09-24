import mongoose from "mongoose";
import { UserSchema } from "./schemas";

interface User extends Document {
    displayName: string;
    email: string;
    password: string;
    profileImage: string;
    createdOn: Date;
    updatedOn: Date;
}

const User = mongoose.model<User>("users", UserSchema);

export default User;