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
    
    if (category) {
        if (typeof category !== 'string' || category.length > 50 || !/^[a-zA-Z0-9\s-_]+$/.test(category)) {
            return res.status(400).json({ error: 'Invalid category parameter' });
        }
        if (category !== 'All') {
            return res.json(tours.filter(t => t.category === category));
        }
    }
    res.json(tours);
});

// GET single tour by slug
router.get('/:slug', (req, res) => {
    const { slug } = req.params;
    
    if (typeof slug !== 'string' || slug.length > 100 || !/^[a-zA-Z0-9-_]+$/.test(slug)) {
        return res.status(400).json({ error: 'Invalid slug parameter' });
    }
    
    const tour = tours.find(t => t.slug === slug);
    if (!tour) return res.status(404).json({ error: 'Tour not found' });
    res.json(tour);
});

module.exports = router;
