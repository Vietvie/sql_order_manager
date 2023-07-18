const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRouter');
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRouter);

module.exports = app;
