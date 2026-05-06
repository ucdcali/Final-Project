import Building from '../models/Building.js'

//EVENT FORM
export const eventForm = async (req, res) => {
  try {
    const buildings = await Building.find();
    res.render("index", { buildings });
  } 
  
  catch (err) {
    console.error(err);
    res.status(500).send("Error loading form");
  }
};