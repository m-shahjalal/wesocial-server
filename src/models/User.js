const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	name: { type: String, required: true, trim: true },
	email: { type: String, required: true, trim: true, lowercase: true },
	password: { type: String, required: true },
	profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
	roles: { type: Array, default: ['user'] },
}, {timestamps: true});

const User = model('User', userSchema);
module.exports = User;
