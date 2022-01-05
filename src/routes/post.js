const express = require('express');
const {
	getAllPosts,
	getSinglePost,
	createPost,
	updatePost,
	deletePost,
    createComment,
    thumbCounter,
} = require('../controllers/post');

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getSinglePost);
router.post('/', passport.authenticate('jwt', { session: false }), createPost);
router.put(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	updatePost
);
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	deletePost
);

router.post(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	createComment
);

router.post(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	thumbCounter
);
module.exports = router;
