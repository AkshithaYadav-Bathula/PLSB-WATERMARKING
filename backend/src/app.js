const express = require('express');
const cors = require('cors');
const path = require('path');
const imageRoutes = require('./routes/imageRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from outputs directory
app.use('/outputs', express.static(path.join(__dirname, '../outputs')));

// Routes
app.use('/api', imageRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Image Watermarking API is running');
});

module.exports = app;