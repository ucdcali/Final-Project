import mongoose from "mongoose";

const buildingSchema = new mongoose.Schema({
  name: String
});

export default mongoose.model("Building", buildingSchema);