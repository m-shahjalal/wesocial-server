const { model, Schema } = require('mongoose');

const postSchema = new Schema({
	content: { type: String, required: true },
	thumbs: [
		{
			user: {
				type: Schema.Types.ObjectId,
				required: true,
				ref: 'User',
			},
		},
	],
	comments: [
		{
			name: { type: String },
			comment: { type: String },
			user: {
				type: Schema.Types.ObjectId,
				required: true,
				ref: 'User',
			},
		},
	],
}, {timestamps: true});

const Post = model('Post', postSchema);
module.exports = Post;
