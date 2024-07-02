const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
	{
		userName: {
			type: String,
			min: 3,
			unique: true,
		},
		firstName: {
			type: String,
			required: true,
			min: 3,
		},
		lastName: {
			type: String,
			required: true,
			min: 3,
		},
		password: {
			type: String,
			required: true,
			min: 3,
		},
		DOB: {
			type: Date,
			required: true,
			min: 3,
		},
		gender: {
			type: String,
			required: true,
			min: 3,
		},
		hivStatus: {
			type: String,
			required: true,
			min: 3,
		},
		profileImage: {
			type: String,
			default: "",
		},
		saltString: String,
	},
	{
		timestamps: true,
	}
);

userSchema.methods.verifyPassword = async function (requestPassword) {
	try {
		return await bcryptjs.compare(requestPassword, this.password);
	} catch (error) {
		throw new Error(error);
	}
};

userSchema.methods.generateToken = async function () {
	try {
		const payload = {
			_id: this._id,
		};
		return await jwt.sign(payload, process.env.jwt_secret, {
			expiresIn: process.env.jwt_expires,
		});
	} catch (error) {
		throw new Error(error);
	}
};

userSchema.pre("save", function (next) {
	const avatarNames = [
		"Dusty",
		"Jasper",
		"Lola",
		"Jack",
		"Felix",
		"Bandit",
		"Kiki",
		"Buster",
		"Lucky",
		"Casper",
		"Whiskers",
		"Muffin",
		"Charlie",
		"Patches",
		"Bubba",
		"Milo",
		"Boots",
		"Tigger",
	];

	this.profileImage = `https://api.dicebear.com/7.x/adventurer/svg?seed=${
		avatarNames[Math.floor(Math.random() * avatarNames.length)]
	}`;

	function generateRandomNumbers() {
		return Math.floor(1000 + Math.random() * 9000);
	}

	this.userName =
		"@" +
		this.firstName.slice(0, 2) +
		generateRandomNumbers() +
		this.lastName.slice(-2);

	next();
});

module.exports = mongoose.model("user", userSchema);
