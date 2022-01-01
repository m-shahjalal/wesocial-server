const { model, Schema } = require('mongoose');

const postSchema = new Schema({
	title: {type: String, required: true},
    thumbs: {type: Number, default: 0},
    comments: [
        {
		name: { type: String },
		comment: { type: String },
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
        }
    ]
});

const Post = model('Post', postSchema);
module.exports = User;
