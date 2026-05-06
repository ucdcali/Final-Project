import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    event: String,
    rooms: [{
        location: String,
        description: String,
    }],
    description: String,
    id: String,
    creator: String,
    time: String,
});

export default mongoose.model("Event", eventSchema);