const express = require('express');

const authController = require('../controller/authController');
const shopController = require('../controller/shopController');

const router = express.Router();

router.post('/newShop', authController.protect, shopController.newShop);
router.get('/:shopId', authController.protect, shopController.getShop);

module.exports = router;
