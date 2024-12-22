import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    roomCode: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

roomSchema.index({ roomCode: 1 }, { unique: true }); // Make sure this index is enforced

const Room = mongoose.model("Room", roomSchema);
export default Room;
