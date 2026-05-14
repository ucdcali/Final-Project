import Building from '../models/Building.js'
import Event from '../models/Event.js'

//EVENT FORM
export const eventLogin = async (req, res) => {
  res.render("login")
}

export const eventForm = async (req, res) => {
  try {
    const buildings = await Building.find();
    res.render("index", { buildings });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading form");
  }
};

export const eventEdit = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render("edit", { event });
};

export const saveEventEdits = async (req, res) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, {
      event: req.body.event,
      description: req.body.description,
    });
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving edits");
  }
};

export const deleteEvent = async (req, res) => {
  try {
    console.log(req.body);
    const deletedEvent = await Event.findByIdAndDelete(req.body.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    console.log('deleted');
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting event");
  }
};

export const createEvent = async (req, res) => {
  try {
    const rooms = req.body.room
      ? Array.isArray(req.body.room)
        ? req.body.room
        : [req.body.room]
      : [];

    await Event.create({
      event: req.body.event,
      description: req.body.description,
      buildings: rooms,
    });

    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating event");
  }
};

export const viewEventMap = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send("Event not found");
    }

    const selectedRooms = Array.isArray(event.buildings)
      ? event.buildings.flat()
      : [];

    const buildings = await Building.find({ rooms: { $in: selectedRooms } });

    const locationKeys = {
      "Science Building": "sb",
      "Main Building": "mainbuilding",
      "Art Studio": "upperart",
      "Rothenberg Building": "rb",
      "PAC(Performing Arts Center)": "pac",
      "English Building": "upperenglish",
      "SMUD": "smud",
      "Gertrude Hall Building": "middlehumanities",
      "Braun Science Building": "middlescience",
      "Braun Music Center": "braun",
      "Ranney House": "ranney",
      "Parking Lot": "parkinglot",
      "Pitcairn": "pitcairn",
      "Ceramics Studio": "ceramics",
      "Hoffman Gymnasium": "gym",
      "Field": "field",
      "Herrick Quad": "quad",
      "Madeline Court": "madelinecourt",
      "Ayrshire Courtyard": "ayshirecourtyard",
      "Dance Studio": "dancestudio",
      "MUDD": "mudd",
    };

    const selectedLocations = buildings
      .map((building) => ({
        name: building.building,
        locationKey: locationKeys[building.building],
      }))
      .filter((loc) => loc.locationKey);

    res.render("addMap", { event, selectedLocations });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading event map");
  }
};