const Trip = require('../models/Trip');

// Create a new trip
exports.createTrip = async (req, res) => {
    const { title, destination, startDate, endDate, itinerary } = req.body;

    try {
        const newTrip = new Trip({
            user: req.user.id,
            title,
            destination,
            startDate,
            endDate,
            itinerary
        });

        const trip = await newTrip.save();
        res.json(trip);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all trips for a user
exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.find({ user: req.user.id });
        res.json(trips);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get a single trip by ID
exports.getTripById = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ msg: 'Trip not found' });
        }

        // Ensure user owns the trip
        if (trip.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        res.json(trip);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update a trip
exports.updateTrip = async (req, res) => {
    const { title, destination, startDate, endDate, itinerary } = req.body;

    const tripFields = {
        title,
        destination,
        startDate,
        endDate,
        itinerary
    };

    try {
        let trip = await Trip.findById(req.params.id);

        if (!trip) {
            return res.status(404).json({ msg: 'Trip not found' });
        }

        // Ensure user owns the trip
        if (trip.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        trip = await Trip.findByIdAndUpdate(
            req.params.id,
            { $set: tripFields },
            { new: true }
        );

        res.json(trip);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a trip
exports.deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);

        if (!trip) {
            return res.status(404).json({ msg: 'Trip not found' });
        }

        // Ensure user owns the trip
        if (trip.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await trip.remove();
        res.json({ msg: 'Trip removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
