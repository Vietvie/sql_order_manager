const { Shop, User } = require('../models');
const catchAsync = require('../utils/catchAsync');

exports.newShop = catchAsync(async (req, res, next) => {
    const newShop = await Shop.create({
        shopname: req.body.shopname,
        ownerId: req.user.userId,
    });

    res.status(200).json({
        status: 'success',
        data: newShop,
    });
});

exports.getShop = catchAsync(async (req, res, next) => {
    const currentShop = await Shop.findByPk(req.params.shopId, {
        include: User,
    });

    console.log(currentShop);
    res.status(200).json({
        status: 'success',
        data: currentShop,
    });
});
