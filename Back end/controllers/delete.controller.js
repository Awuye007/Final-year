const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");

async function deleteUser(req, res) {
	try {
		const { _id } = req.params;

		if (!_id) {
			return res.status(400).json({ message: "Bad Request" });
		}

		await User.findByIdAndDelete(_id);

		return res.status(200).json({ message: "User deleted successfully!" });
	} catch (error) {
		console.error("Error creating user: " + error);
		return res.status(500).json({ message: "Internal Server error" });
	}
}

module.exports = {
	method: "delete",
	route: "/users/:_id",
	controller: [deleteUser],
};
