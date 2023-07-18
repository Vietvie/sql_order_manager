const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controller/errorController');

const userRouter = require('./routes/userRouter');
const shopRouter = require('./routes/shopRouter');
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Read body, cookies form body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRouter);
app.use('/shops', shopRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`can not found ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
