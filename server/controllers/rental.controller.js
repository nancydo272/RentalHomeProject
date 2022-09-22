const Rental = require('../models/rental.model');
const jwt = require("jsonwebtoken");
const User = require('../models/user.model');
require('dotenv').config();
const SECRET = process.env.JWT_KEY;

module.exports = {
    getRentals: (req, res) => {
        Rental.find({})
            .populate('agent', 'email firstName lastName')
            .then((allRentals) => {res.json(allRentals);})
            .catch((err) =>
                res.status(400).json({ message: 'something went wrong with findAll', error: err.errors }),
            );
    },
    createRental: (req, res) => {
        const user = jwt.verify(req.cookies.userToken, SECRET);
        Rental.create({...req.body, agent: user._id})
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
    //agentlist connect  rental to agent 
    AgentList: (req, res) => {
        //change User to 
        User.findOne({ _id: req.params.id}).then((user) => {
            Rental.find({ agent: user._id })
                    .populate('agent', 'email firstName lastName')
                    .then((rentals) => {res.json(rentals);})
                    .catch((err) => {res.status(401).json({message:  "agent listing controller problem", error: err});});
        });
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