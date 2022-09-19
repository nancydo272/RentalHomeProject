const Rental = require('../models/rental.model');

    module.exports = {
    getRentals: (req, res) => {
        Rental.find({})
        .then((allRentals) => {
            console.log(allRentals);
            res.json(allRentals);
        })
        .catch((err) =>
            res.status(400).json({ message: 'something went wrong with findAll', error: err.errors }),
        );
    },
    createRental: (req, res) => {
        console.log(req.body);
        Rental.create(req.body)
        .then((newRental) => {
            console.log(newRental);
            res.json(newRental);
        })
        .catch((err) =>
            res.status(400).json({ message: 'something went wrong with create', error: err.errors }),
        );
    },
    getRentalById: (req, res) => {
        Rental.findOne({ _id: req.params.id })
        .then((rental) => {
            console.log(rental);
            res.json(rental);
        })
        .catch((err) =>
            res.status(400).json({ message: 'something went wrong with find one', error: err.errors }),
        );
    },
    deleteRental: (req, res) => {
        Rental.deleteOne({ _id: req.params.id })
        .then((rental) => {
            console.log(rental);
            res.json(rental);
        })
        .catch((err) =>
            res.status(400).json({ message: 'something went wrong with delete', error: err.errors }),
        );
    },
    updateRental: (req, res) => {
        Rental.updateOne({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then((rental) => {
            console.log(rental);
            res.json(rental);
        })
        .catch((err) =>
            res.status(400).json({ message: 'something went wrong with update', error: err.errors }),
        );
    },
};