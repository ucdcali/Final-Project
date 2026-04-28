import mongoose from "mongoose";

const buildingSchema = new mongoose.Schema({
  name: String,
  inUse: Boolean

});

export default mongoose.model("Building", buildingSchema);