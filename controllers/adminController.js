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
	res.send("hi")
  } 
  
  catch (err) {
	console.error(err);
	res.status(500).send("Error loading page");
  }
};



// CREATE MESSAGE
export const createMessage = async (req, res) => {
  try {
	await Message.create({ message: req.body.message });
	res.redirect("/");
  } catch (err) {
	console.error(err);
	res.status(500).send("Error creating message");
  }
};

// DELETE MESSAGE
export const deleteMessage = async (req, res) => {
  try {
	await Message.findByIdAndDelete(req.params.id);
	res.redirect("/");
  } catch (err) {
	console.error(err);
	res.status(500).send("Error deleting message");
  }
};

//EDIT MESSAGE
export const editMessage = async(req, res) => {
	try{
    	const message = await Message.findById(req.params.id);
    	res.render('edit', { message }); 
	}

	
	catch(err){
		console.error(err);
		res.status(500).send("Error editing message");
	}
};

//SAVE EDITED MESSAGE
export const saveMessage = async(req, res) => {
	try{
		await Message.findByIdAndUpdate(req.params.id, req.body);
		res.redirect("/");
	}
	catch(err){
		console.error(err);
		res.status(500).send("Error saving message");
	}

};
