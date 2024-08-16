const express = require('express');
const router = express.Router();
const {
    createTrip,
    getTrips,
    getTripById,
    updateTrip,
    deleteTrip,
} = require('../controllers/tripController');
const auth = require('../middleware/auth');

// @route   POST /api/trips
// @desc    Create a new trip
// @access  Private
router.post('/', auth, createTrip);

// @route   GET /api/trips
// @desc    Get all trips for the logged-in user
// @access  Private
router.get('/', auth, getTrips);

// @route   GET /api/trips/:id
// @desc    Get a trip by ID
// @access  Private
router.get('/:id', auth, getTripById);

// @route   PUT /api/trips/:id
// @desc    Update a trip by ID
// @access  Private
router.put('/:id', auth, updateTrip);

// @route   DELETE /api/trips/:id
// @desc    Delete a trip by ID
// @access  Private
router.delete('/:id', auth, deleteTrip);

module.exports = router;
