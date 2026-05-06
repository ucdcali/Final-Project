import Building from "../models/Building.js"; 
// CREATE USER
export const createBuilding = async (req, res) => {
  try {
	await Building.create({ name: req.body.name });
	res.redirect("/");
  } catch (err) {
	console.error(err);
	res.status(500).send("Error creating building");
  }
};

// DELETE BUILDING
export const deleteBuilding = async (req, res) => {
  try {
	await Building.findByIdAndDelete(req.params.id);
	res.redirect("/");
  } catch (err) {
	console.error(err);
	res.status(500).send("Error deleting building");
  }
};

