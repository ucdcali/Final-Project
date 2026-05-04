import Event from '../models/Event.js'

//EVENT FORM
export const eventForm = async (req, res) => {
  try {
    const buildings = ("Science Building", "PAC", "Main Building", "Gym", "Library");
    const sbRooms = ("SB70", "SB71", "SB72", "SB73");
    res.render("index", { buildings });
  } 
  
  catch (err) {
    console.error(err);
    res.status(500).send("Error loading form");
  }
};