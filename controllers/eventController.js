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

export const eventEdit = async (req, res) => {
  const event = events.find(
    e => e.id == req.params.id
  );

  res.render("edit", { event });
};

export const saveEventEdits = async (req, res) => {
  const event = events.find(
    e => e.id == req.params.id
  );

  event.event = req.body.event;
  event.description = req.body.description;

  res.redirect("/events");
};