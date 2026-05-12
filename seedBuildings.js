import mongoose from "mongoose"
import dotenv from "dotenv"

import Building from "./models/Building.js"


dotenv.config()

await mongoose.connect(process.env.MONGODB_URI)

console.log("Connected to MongoDB")

await Building.deleteMany({})

console.log("Old users removed")


const artists = [
    {
        building: "Science Building",
        rooms: ["Fish Room", "SB70", "SB71", "SB72", "SB73", "SB74", "SB75", "SB76", "SB80", "SB81", "SB82", "SB83", "SB84", "SB85", "SB86"],
        use: "Home to all science classrooms, some math classes and both the science and math departments."
    }, 
    {
        building: "Main Building",
        rooms: ["RM10", "RM11", "RM23", "RM24", "RM25", "RM26", "RM27", "Library", "College Counseling Offices", "STEAMWorks", "offices etc"],
        use: "Home to the language department and several administrative offices. This building holds many language classes, and a few others. Through this building, you can access the library and the college counselor offices."
    }, 
    {
        building: "Art Studio",
        rooms: ["AS30", "AS31", "AS32"],
        use: "Home to the art department and most of Westridge's physical art aupplies. Classes such as Painting and Drawing, AASP, and AASI are held here"
    },
    {
        building: "Rothenberg Building",
        rooms: ["RB50", "RB60", "RB61", "RB62", "RB63", "RB64", "RB65", "Photo Lab", "Karsh", "Massar Gallery", "Community Room", "Commons", "SB85", "SB86"],
        use: "home to the History department and the Commons. Rothenberg hosts language and history classes, and even photography, computer science, and math classes in the basement."
    },
    {
        building: "PAC(Performing Arts Center)",
        rooms: ["PAC Theater", "Black Box", "Theatre Offices", "Theatre Director's Office", "Rob's Office", "Costume Shop", "Amphitheatre", "Sigrid Burton Gallery"],
        use: "Host to Westridge's wide theatre resources, this building has the PAC theatre as well as a gallery below. Beyond, you will find spaces for students to practice singing or instruments, and the black box and costume shop, where students practice their skills."
    },
    {
        building: "English Building",
        rooms: ["EC20", "EC21", "EC22", "EC23", "EC24"],
        use: "Home to the English department and several English classrooms on the upper floor. On the first floor, visitors will find a welcome area."
    },
    {
        building: "SMUD",
        rooms: ["SMUD"],
        use: "A building with many supplies for yoga and exercise."
    },
    {
        building: "Gertrude Hall Building",
        rooms: ["RM X", "RM W"],
        use: ""
    },
    {
        building: "Braun Science Building",
        rooms: ["Middle School Science", "Lower School Science"],
        use: ""
    },
    {
        building: "Braun Music Center",
        rooms: ["Braun", "Choral Hall", "PA2", "Music Office"],
        use: "Home to students' instruments and the music department. This is where students practice for with their music and choir classes."
    },
    {
        building: "Ranney House",
        rooms: ["RH1", "RH2", "RH3", "RH4", "RH5", "RH6", "RH7", "RH10", "RH11", "RH12", "RH13", "RH14", "RH15", "RH16", "RH17", "RH18"],
        use: ""
    },
    {
        building: "Parking Lot",
        rooms: ["Parking Lot"],
        use: ""
    },
    {
        building: "Pitcairn",
        rooms: ["Pitcairn"],
        use: ""
    },
    {
        building: "Ceramics Studio",
        rooms: ["Ceramics Studio"],
        use: ""
    },
    {
        building: "Hoffman Gymnasium",
        rooms: ["Nurse", "Locker Room", "Athletics Director Office", "P.E. Office"],
        use: ""
    },
    {
        building: "Field",
        rooms: ["Field"],
        use: ""
    },
    {
        building: "Herrick Quad",
        rooms: ["Herrick Quad"],
        use: ""
    },
    {
        building: "Madeline Court",
        rooms: ["Madeline Court"],
        use: ""
    },
    {
        building: "Ayrshire Courtyard",
        rooms: ["Ayrshire Courtyard"],
        use: ""
    },
    {
        building: "Dance Studio",
        rooms: ["Dance Room", "Weight Room", "Dance Office", "Tiger Tail Boutique"],
        use: ""
    },
    {
        building: "MUDD",
        rooms: ["MD1", "MD3", "MD4", "LS/MS offices", "EC24"],
        use: ""
    },
]
Building.insertMany(artists)