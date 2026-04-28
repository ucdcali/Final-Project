import mongoose from "mongoose";

const buildingSchema = new mongoose.Schema({
  name: String,
  buildings: {
    type: Array,
    required: true
  },
  rooms: {
    type: Array,
    required: true
  },
  inUse: Boolean
});

export default mongoose.model("Building", buildingSchema);