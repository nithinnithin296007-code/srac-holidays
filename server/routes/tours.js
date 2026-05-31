const express = require('express');
const router = express.Router();
const tours = require('../data/tours');

// GET all categories — must be before /:slug
router.get('/meta/categories', (req, res) => {
    const categories = ['All', ...new Set(tours.map(t => t.category))];
    res.json(categories);
});

// GET all tours
router.get('/', (req, res) => {
    const { category } = req.query;
    if (category && category !== 'All') {
        return res.json(tours.filter(t => t.category === category));
    }
    res.json(tours);
});

// GET single tour by slug
router.get('/:slug', (req, res) => {
    const tour = tours.find(t => t.slug === req.params.slug);
    if (!tour) return res.status(404).json({ error: 'Tour not found' });
    res.json(tour);
});

module.exports = router;
