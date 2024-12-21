import mongoose from "mongoose";
import User from "./user.model.js";

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    joinCode: { type: String, unique: true, required: true }, // Unique alphanumeric code
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;