const express = require('express');
const users = require('../controllers/user');

const router = express.Router();

router.post('/register', users.createUser);
router.post('/login', users.login);

module.exports = router;
