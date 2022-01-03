const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true },
		password: { type: String, required: true },
		profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
		roles: { type: Array, default: ['user'] },
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;
	next();
});

userSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);
	return compare;
};

const User = model('User', userSchema);
module.exports = User;
