const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");

async function updateUser(req, res) {
	try {
		const { _id } = req.params;

		if (!_id) {
			return res.status(400).json({ message: "Bad Request" });
		}

		const { firstName, lastName, DOB, password, gender, hivStatus } = req.body;

		let user = await User.findById(_id);

		if (firstName) user.firstName = firstName;
		if (lastName) user.lastName = lastName;
		if (password)
			bcryptjs.hash(password, user.saltString, (err, hash) => {
				user.password = hash;
			});
		if (DOB) user.DOB = new Date(DOB);
		if (gender) user.gender = gender;
		if (hivStatus) user.hivStatus = hivStatus;

		await user.save();

		return res.status(200).json({ message: "User updated successfully!" });
	} catch (error) {
		console.error("Error creating user: " + error);
		return res.status(500).json({ message: "Internal Server error" });
	}
}

module.exports = {
	method: "put",
	route: "/users/:_id",
	controller: [updateUser],
};
