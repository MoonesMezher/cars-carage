const express = require('express');
const logger = require('morgan')

// Routes
const userRouter = require('./routes/userRoute');
const messageRouter = require('./routes/messageRoute');
const carRouter = require('./routes/carRoute');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/api/users',userRouter);
app.use('/api/cars',carRouter);
app.use('/api/messages',messageRouter);

module.exports = app;