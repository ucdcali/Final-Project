import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
  },
  buildings: [String],
  description: String,
  id: String,
  creator: String,
  time: String,
});

export default mongoose.model("Event", eventSchema);