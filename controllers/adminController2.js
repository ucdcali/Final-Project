import Admin from '../models/Admin.js'
import Building from '../models/Building.js'

// HOME PAGE
export const loadPage = async (req, res) => {
  try {
	
  } 
  
  catch (err) {
	console.error(err);
	res.status(500).send("Error loading page");
  }
};

//ADMIN PAGE
export const adminLogin = async (req, res) => {
  try {
	
  } 
  
  catch (err) {
	console.error(err);
	res.status(500).send("Error loading page");
  }
};

//EVENT FORM
export const eventForm = async (req, res) => {
  try {
    const buildings = ("Science Building", "PAC", "Main Building", "Gym", "Library");
    const sbRooms = ("SB70", "SB71", "SB72", "SB73");
	await Admin.findById(req.params.id);
	formDetails = req.body;
	res.render("index", { buildings });
  } 
  
  catch (err) {
	console.error(err);
	res.status(500).send("Error loading form");
  }
};

// CREATE MESSAGE
export const createEvent = async (req, res) => {
  try {
	await Admin.create({ event: req.body.event });
	res.redirect("/");
  } catch (err) {
	console.error(err);
	res.status(500).send("Error creating event");
  }
};

// DELETE MESSAGE
export const deleteEvent = async (req, res) => {
  try {
	await Admin.findByIdAndDelete(req.params.id);
	res.redirect("/");
  } catch (err) {
	console.error(err);
	res.status(500).send("Error deleting event");
  }
};

//EDIT MESSAGE
export const editEvent = async(req, res) => {
	try{
    	const event = await Admin.findById(req.params.id);
    	res.render('edit', { event }); 
	}

	
	catch(err){
		console.error(err);
		res.status(500).send("Error editing event");
	}
};

//SAVE EDITED MESSAGE
export const saveEvent = async(req, res) => {
	try{
		await Admin.findByIdAndUpdate(req.params.id, req.body);
		res.redirect("/");
	}
	catch(err){
		console.error(err);
		res.status(500).send("Error saving event");
	}

};
