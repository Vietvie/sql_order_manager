const express = require('express');
const userController = require('../controller/usersController');
const authController = require('../controller/authController');

const router = express.Router();

router
    .route('/getUser')
    .get(
        authController.protect,
        authController.restrictTo('admin'),
        userController.newUser
    );
router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

module.exports = router;
