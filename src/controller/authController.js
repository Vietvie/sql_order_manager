const { User } = require('../models');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const changedPasswordAfter = require('../utils/changePasswordAfter');
const checkPasswordCorrect = require('../utils/checkPasswordCorrect');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.userId);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('access_token', token, cookieOptions);

    // Remove password from output
    user.password = undefined;
    user.passwordConfirm = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        user,
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const { name, email, password, passwordConfirm } = req.body;
    const newUser = await User.create({
        name,
        email,
        password,
        passwordConfirm,
    });
    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    //input {email/username: abcd, password: 123456}
    const { email, password } = req.body;

    //1, check input
    if (!email || !password)
        return next(new AppError('please provide email and password', 400));

    //2, check exist user and password //Do not show exactly user or password is incorrect!
    const currentUser = await User.findOne({
        where: { email: req.body.email.toLowerCase() },
    });

    if (
        !currentUser ||
        !(await checkPasswordCorrect(password, currentUser.password))
    )
        return next(new AppError('user or password is incorrect!!', 401));

    //3, If everithing ok, start send Token
    createSendToken(currentUser, 201, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    //1, get Token from req.cookies
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
        token = req.cookies.access_token;
    }
    if (!token) {
        return next(new AppError('please login to access!', 401));
    }

    //2, check user exits with id from Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findByPk(decoded.id);
    if (!currentUser) {
        return next(new AppError('User not exist, please login again!!', 401));
    }

    //3, check expires token
    if (changedPasswordAfter(decoded.iat, currentUser.changePasswordAt)) {
        return next(
            new AppError('user changed password, plesae login again!', 401)
        );
    }

    //provide currentUser to next action
    req.user = currentUser;

    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You don't have permission", 401));
        }
        next();
    };
};
