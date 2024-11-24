import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recieverId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

messageSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id; // Add `id` field
    delete ret._id; // Remove `_id` field
    delete ret.__v; // Remove `__v` field
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
