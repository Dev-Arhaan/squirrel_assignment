const express = require('express');
const doctorRoutes = require('./routes/doctorRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');
var cors = require('cors');

const app = express();

// Core Middleware
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(cors())

// API Routes
app.use('/api/doctors', doctorRoutes);

// 404 Not Found Middleware
app.use(notFound);

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;