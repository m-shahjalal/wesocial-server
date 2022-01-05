const Post = require('../models/Post');

const post = {};

post.getAllPosts = async (req, res, next) => {
	try {
		const posts = await Post.find();
		res.json({ posts });
	} catch (error) {
		next(error);
	}
};

post.getSinglePost = async (req, res, next) => {
	const { id } = req.params;
	try {
		const post = await Post.findOne({ _id: id });
		res.json({ post });
	} catch (error) {
		next(error);
	}
};

post.createPost = (req, res, next) => {
	try {
		const cretePost = await Post.create({ content: req.body.content });
		res.json({ cretePost });
	} catch (error) {
		next(error);
	}
};

post.updatePost = (req, res, next) => {
	const { id } = req.params;
	const obj = { content: req.body.content };
	try {
		const post = await Post.findOneAndUpdate(
			{ _id: id },
			{ $set: obj },
			{ new: true }
		);
		res.json({ post });
	} catch (error) {
		next(error);
	}
};

post.thumbCounter = (req, res, next) => {
	const { id } = req.params;
	const state = req.body.state;
	const user = req.body.user;

	try {
		const post = await Post.findOne({ _id: id });

		const thumbs = [...post.thumbs];

		if (state === 'add') {
			thumbs.push({ user });
		}
		if (state === 'remove') {
			thumbs.filter((item) => item.user !== user);
		}

		const update = await Post.findOneAndUpdate(
			{ _id: id },
			{ $set: thumbs },
			{ new: true }
		);
	} catch (error) {
		next(error);
	}
};

post.createComment = (req, res, next) => {
	const { id } = req.params;
	const { name, comment, user } = req.body;
	try {
		const post = await Post.findOne({ _id: id });

		const comments = { ...post.comments };
		comments.push({ name, comment, user });

		const update = await Post.findOneAndUpdate(
			{ _id: id },
			{ $set: comments },
			{ new: true }
		);
		res.status(201).json({ update });
	} catch (error) {
		next(error);
	}
};

post.deletePost = (req, res, next) => {
	const { id } = req.params;
	try {
		const post = await Post.findOneAndDelete({ _id: id });
		res.status(200).json({ post });
	} catch (error) {
		next(error);
	}
};

module.exports = post;
