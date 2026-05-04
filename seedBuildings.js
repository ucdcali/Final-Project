import mongoose from "mongoose"
import dotenv from "dotenv"

import Building from "./models/Building.js"


dotenv.config()

await mongoose.connect(process.env.MONGODB_URI)

console.log("Connected to MongoDB")

await Artist.deleteMany({})

console.log("Old users removed")


const artists = [
    {
        building: "Science Building",
        rooms: ["Fish Room", "SB70", "SB71", "SB72", "SB73", "SB74", "SB75", "SB76", "SB80", "SB81", "SB82", "SB83", "SB84", "SB85", "SB86"]
    }, 
    {
        building: "Main Building",
        rooms: ["RM10", "RM11", "RM23", "RM24", "RM25", "RM26", "RM27", "Library", "College Counseling Offices", "STEAMWorks", "offices etc"]
    }, 
    {
        building: "Art Studio",
        rooms: ["AS30", "AS31", "AS32"]
    },
    {
        building: "Rothenberg Building",
        rooms: ["RB50", "RB60", "RB61", "RB62", "RB63", "RB64", "RB65", "Photo Lab", "Karsh", "Massar Gallery", "Community Room", "Commons", "SB85", "SB86"]
    },
    {
        building: "PAC(Performing Arts Center)",
        rooms: ["PAC Theater", "Black Box", "Theatre Offices", "Theatre Director's Office", "Rob's Office", "Costume Shop", "Amphitheatre", "Sigrid Burton Gallery"]
    },
    {
        building: "English Building",
        rooms: ["EC20", "EC21", "EC22", "EC23", "EC24"]
    },
    {
        building: "SMUD",
    },
    {
        building: "Gertrude Hall Building",
        rooms: ["RM X", "RM W"]
    },
    {
        building: "Braun Science Building",
        rooms: ["Middle School Science", "Lower School Science"]
    },
    {
        building: "Braun Music Center",
        rooms: ["Braun", "Choral Hall", "PA2", "Music Office"]
    },
    {
        building: "Ranney House",
        rooms: ["RH1", "RH2", "RH3", "RH4", "RH5", "RH6", "RH7", "RH10", "RH11", "RH12", "RH13", "RH14", "RH15", "RH16", "RH17", "RH18"]
    },
    {
        building: "Parking Lot",
    },
    {
        building: "Pitcairn",
    },
    {
        building: "Ceramics Studio",
    },
    {
        building: "Hoffman Gymnasium",
        rooms: ["Nurse", "Locker Room", "Athletics Director Office", "P.E. Office"]
    },
    {
        building: "Field",
    },
    {
        building: "Herrick Quad",
    },
    {
        building: "Madeline Court",
    },
    {
        building: "Ayrshire Courtyard",
    },
    {
        building: "Dance Studio",
        rooms: ["Dance Room", "Weight Room", "Dance Office", "Tiger Tail Boutique"]
    },
    {
        building: "MUDD",
        rooms: ["MD1", "MD3", "MD4", "LS/MS offices", "EC24"]
    },
]