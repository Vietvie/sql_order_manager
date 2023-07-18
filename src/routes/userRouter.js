const express = require('express');
const usersController = require('../controller/usersController');

const router = express.Router();

router.route('/').post(usersController.newUser);

module.exports = router;
