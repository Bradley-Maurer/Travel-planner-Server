const Budget = require('../models/Budget');

// Create or update a budget for a trip
exports.createOrUpdateBudget = async (req, res) => {
    const { tripId, totalBudget, expenses } = req.body;

    const budgetFields = {
        tripId,
        totalBudget,
        expenses
    };

    try {
        let budget = await Budget.findOne({ tripId: tripId });

        if (budget) {
            // Update existing budget
            budget = await Budget.findOneAndUpdate(
                { tripId: tripId },
                { $set: budgetFields },
                { new: true }
            );

            return res.json(budget);
        }

        // Create new budget
        budget = new Budget(budgetFields);
        await budget.save();
        res.json(budget);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get the budget for a specific trip
exports.getBudgetByTripId = async (req, res) => {
    try {
        const budget = await Budget.findOne({ tripId: req.params.tripId });

        if (!budget) {
            return res.status(404).json({ msg: 'Budget not found' });
        }

        res.json(budget);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a budget
exports.deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findOne({ tripId: req.params.tripId });

        if (!budget) {
            return res.status(404).json({ msg: 'Budget not found' });
        }

        await budget.remove();
        res.json({ msg: 'Budget removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
