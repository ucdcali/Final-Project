import mongoose from "mongoose";

const buildingSchema = new mongoose.Schema({
  building: {
    type: String,
    required: true
  },
  rooms: [ {
    type: String,
    required: true,
  }],
  inUse: Boolean

});

export default mongoose.model("Building", buildingSchema);