import User from "../models/User.js"; 
// CREATE USER
export const createUser = async (req, res) => {
  try {
	await User.create({ name: req.body.name });
	res.redirect("/");
  } catch (err) {
	console.error(err);
	res.status(500).send("Error creating user");
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
	await User.findByIdAndDelete(req.params.id);
	res.redirect("/");
  } catch (err) {
	console.error(err);
	res.status(500).send("Error deleting user");
  }
};