import mongoose from "mongoose";

const buildingSchema = new mongoose.Schema({
  name: String
  name: String,
  buildings: {
    type: Array,
    required: true
  },
  rooms: {
    type: Array,
    required: true
  }
});

export default mongoose.model("Building", buildingSchema);