import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    rooms: [String],
    buildings: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Building"
    },
});

const eventSchema = new mongoose.Schema({
    event: String,
    buildings: [roomSchema],
    description: String,
    id: String,
    creator: String,
    time: String,
});

export default mongoose.model("Event", eventSchema);