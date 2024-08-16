const express = require('express');
const router = express.Router();
const {
    createOrUpdateBudget,
    getBudgetByTripId,
    deleteBudget,
} = require('../controllers/budgetController');
const auth = require('../middleware/auth');

// @route   POST /api/budgets
// @desc    Create or update a budget for a trip
// @access  Private
router.post('/', auth, createOrUpdateBudget);

// @route   GET /api/budgets/:tripId
// @desc    Get the budget for a specific trip
// @access  Private
router.get('/:tripId', auth, getBudgetByTripId);

// @route   DELETE /api/budgets/:tripId
// @desc    Delete the budget for a specific trip
// @access  Private
router.delete('/:tripId', auth, deleteBudget);

module.exports = router;
