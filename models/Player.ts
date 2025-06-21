import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: String,
  gender: String,
  played: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Player || mongoose.model("Player", playerSchema);
