const express = require('express');
const router = express.Router();
const tracks = require('../data/tracks');

// Get all tracks
router.get('/tracks', (req, res) => {
    res.json(tracks);
});

// Search tracks
router.get('/search', (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.json([]);
    }

    const query = q.toLowerCase();
    const results = tracks.filter(track =>
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query)
    );

    res.json(results);
});

module.exports = router;
