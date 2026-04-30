import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    event: String,
    rooms: String,
    descriptions: String,
    id: String,
    creator: String,
    time: String,
});

export default mongoose.model("Event", eventSchema);