const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Static files (Audio)
app.use('/audio', express.static(path.join(__dirname, 'audio')));

// API Routes
app.use('/api', apiRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('TuneFlow Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
