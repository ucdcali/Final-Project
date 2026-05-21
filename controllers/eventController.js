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
    const selected = req.body.room
      ? Array.isArray(req.body.room)
        ? req.body.room
        : [req.body.room]
      : [];

    const buildingMap = {};
    for (const safeIdRaw of selected) {
      const safeId = String(safeIdRaw).trim();
      if (!safeId) continue;
      // safeId format: b_<buildingId>_<index>
      const parts = safeId.split('_');
      if (parts.length < 3) continue;
      const buildingId = parts[1];
      const roomName = req.body[`roomName_${safeId}`] || '';
      const roomDesc = req.body[`roomDesc_${safeId}`] || '';
      if (!buildingMap[buildingId]) buildingMap[buildingId] = { rooms: [], roomDescriptions: [], buildings: buildingId };
      buildingMap[buildingId].rooms.push(String(roomName).trim());
      buildingMap[buildingId].roomDescriptions.push(String(roomDesc).trim());
    }

    const update = {
      event: req.body.event,
      description: req.body.description,
      buildings: Object.values(buildingMap),
    };

    await Event.findByIdAndUpdate(req.params.id, update);
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving edits");
  }
};


export const deleteEvent = async (req, res) => {
   try {
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

export const editEvent = async (req, res) => {
  try {
    console.log (req.params);
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send("Event not found");
    }
    const buildings = await Building.find();
    res.render('edit', { event, buildings });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading event for edit");
  }
};

export const createEvent = async (req, res) => {
  try {
    if (req.body.event == "" || req.body.description == ""){
      return res.redirect ("/");
    }
    const selected = req.body.room
      ? Array.isArray(req.body.room)
        ? req.body.room
        : [req.body.room]
      : [];

    const buildingMap = {};
    for (const safeIdRaw of selected) {
      const safeId = String(safeIdRaw).trim();
      if (!safeId) continue;
      const parts = safeId.split('_');
      if (parts.length < 3) continue;
      const buildingId = parts[1];
      const roomName = req.body[`roomName_${safeId}`] || '';
      const roomDesc = req.body[`roomDesc_${safeId}`] || '';
      if (!buildingMap[buildingId]) buildingMap[buildingId] = { rooms: [], roomDescriptions: [], buildings: buildingId };
      buildingMap[buildingId].rooms.push(String(roomName).trim());
      buildingMap[buildingId].roomDescriptions.push(String(roomDesc).trim());
    }

    const eventData = {
      event: req.body.event,
      description: req.body.description,
      buildings: Object.values(buildingMap),
    };

    await Event.create(eventData);

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

    const allBuildings = await Building.find();
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

    const selectedBuildings = (Array.isArray(event.buildings) ? event.buildings : []).map((entry) => {
      const buildingId = String(entry.buildings);
      const buildingDoc = allBuildings.find((building) => String(building._id) === buildingId);
      const buildingName = buildingDoc?.building || "Unknown Building";
      const rooms = Array.isArray(entry.rooms)
        ? entry.rooms.map((room, idx) => ({
            name: String(room || "").trim(),
            description: Array.isArray(entry.roomDescriptions) ? String(entry.roomDescriptions[idx] || "").trim() : "",
          })).filter((room) => room.name)
        : [];

      return {
        buildingId,
        name: buildingName,
        locationKey: locationKeys[buildingName] || null,
        rooms,
      };
    });

    const selectedLocations = selectedBuildings
      .filter((building) => building.locationKey)
      .map((building) => ({
        name: building.name,
        locationKey: building.locationKey,
      }));

    res.render("addMap", { event, selectedBuildings, selectedLocations });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading event map");
  }
};