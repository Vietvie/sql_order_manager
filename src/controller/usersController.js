const { Users } = require('../models');

const catchAsync = require('../utils/catchAsync');

exports.newUser = catchAsync(async (req, res, next) => {
    res.status(200).json('OK');
});
