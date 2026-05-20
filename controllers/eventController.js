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

    const selectedRooms = Array.isArray(event.buildings)
      ? event.buildings.flatMap((entry) =>
          Array.isArray(entry.rooms)
            ? entry.rooms.map((value) => String(value).trim()).filter(Boolean)
            : []
        )
      : [];

    const allBuildings = await Building.find();
    const buildings = allBuildings.filter((building) => {
      const buildingName = String(building.building).toLowerCase();
      const buildingWords = buildingName.split(/\s+/).filter(Boolean);
      const roomNames = building.rooms.map((room) => String(room).toLowerCase());

      return selectedRooms.some((selected) => {
        const normalized = String(selected).toLowerCase();
        const selectedWords = normalized.split(/\s+/).filter(Boolean);

        if (buildingName === normalized) {
          return true;
        }

        if (roomNames.includes(normalized)) {
          return true;
        }

        const isFullBuildingMatch =
          selectedWords.length > 1 &&
          buildingWords.every((word) => selectedWords.includes(word));

        if (isFullBuildingMatch) {
          return true;
        }

        const isFullBuildingNameIncluded =
          buildingWords.length > 1 &&
          buildingWords.every((word) => selectedWords.includes(word));

        if (isFullBuildingNameIncluded) {
          return true;
        }

        return roomNames.some((roomName) => {
          const roomWords = roomName.split(/\s+/).filter(Boolean);
          if (roomName === normalized) {
            return true;
          }
          if (roomWords.length > 1 && roomWords.every((word) => selectedWords.includes(word))) {
            return true;
          }
          if (selectedWords.length > 1 && selectedWords.every((word) => roomWords.includes(word))) {
            return true;
          }
          return false;
        });
      });
    });

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

    const selectedLocations = [...new Map(
      buildings
        .map((building) => ({
          name: building.building,
          locationKey: locationKeys[building.building],
        }))
        .filter((loc) => loc.locationKey)
        .map((loc) => [loc.locationKey, loc])
    )].map(([_, loc]) => loc);

    res.render("addMap", { event, selectedLocations });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading event map");
  }
};