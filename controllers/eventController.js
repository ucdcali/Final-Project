import Admin from '../models/Admin.js'
import Building from '../models/Building.js'
import Event from '../models/Event.js'

//EVENT FORM
export const eventLogin = async (req, res) =>{
  res.render("login")
}


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

export const deleteEvent = async (req, res) => {
   try {
    console.log(req.body);
    const deletedEvent = await Event.findByIdAndDelete(req.body.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    else console.log('deleted');

    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting event");
  }
};
export const createEvent = async (req, res) => {

   try {
    const rooms = Array.isArray(req.body.room)
      ? req.body.room
      : [req.body.room];
    await Event.create({
      event: req.body.event,
      description: req.body.description,
      buildings: [rooms]
    });

    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating event");
  }
};