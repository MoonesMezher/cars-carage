const express = require('express');
const logger = require('morgan')

// Routes
const userRouter = require('./routes/userRoute');
const bookingRouter = require('./routes/bookingRoute');
const carRouter = require('./routes/carRoute');
const brandRouter = require('./routes/brandRoute');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/api/users',userRouter);
app.use('/api/cars',carRouter);
app.use('/api/bookings',bookingRouter);
app.use('/api/brands',brandRouter);

module.exports = app;