import mongoose from "mongoose";

const buildingSchema = new mongoose.Schema({
  name: String,
  building: {
    type: String,
    required: true
  },
  rooms: {
    type: Array,
    required: true,
  },
  inUse: Boolean

});

export default mongoose.model("Building", buildingSchema);