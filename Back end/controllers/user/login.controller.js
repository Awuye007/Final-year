const User = require("../../models/user.model");
const bcryptjs = require("bcryptjs");

async function login(req, res) {
	try {
		const { userName, password } = req.body;

		if (!userName || !password) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		const user = await User.findOne({ userName });

		if (!user) {
			return res.status(400).json({ message: " User not Found " });
		}

		if (!user.verifyPassword(password)) {
			return res.status(400).json({ message: " Incorrect Password " });
		}

		const token = await user.generateToken();

		return res
			.status(200)
			.json({ message: "Login successful. Welcome " + user.userName, token });
	} catch (error) {
		console.error("Error creating user: " + error);
		return res.status(500).json({ message: "Internal Server error" });
	}
}

module.exports = {
	method: "post",
	route: "/login",
	controller: [login],
};
