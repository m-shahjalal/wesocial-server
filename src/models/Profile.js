const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	tagline: { type: String, required: true, trim: true },
	thumb: { type: String, required: true },
	country: { type: String, required: true, trim: true },
});

const Profile = model('Profile', profileSchema);
module.exports = Profile;
