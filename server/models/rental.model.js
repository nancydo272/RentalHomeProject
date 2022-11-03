const mongoose = require('mongoose');

const RentalSchema = new mongoose.Schema(
    {
    // _id is auto generated ObjectID the type is mongoose.Schema.Types.ObjectId
        title: {
            type: String,
            required: [true, 'A rental title is required!!!'],
            minlength: [2, 'The title length must be at least 2 characters!']
        },
        streetAddress: {
            type: String,
            required: [true, 'Street address is required'],
            minlength: [8, 'The street address must be at least 8 characters!']
        },
        owner: {
            type: String,
            required: [true, "The owner's name is required!"]
        },
        location: {
            type: String
        },
        description: {
            type: [String],
            required: [true, 'Description of the rental home is required'],
            minlength: [8, 'The rental home description must be at least 8 characters!']
        },
        image: {
            type: String,
        },
        city: {
            type: String,
            required: [true, 'The city/town is required'],
            minlength: [3, 'The city/town length must be at least 3 characters!']
        },
        state:{
            type:String, 
            required: [true, 'The state of the rental home is required'],
            maxlength: [2, 'The state must have 2 characters!']
        }, 
        zipcode:{
            type:Number,
            required: [true, 'Zipcode is required'],
            minlength: [5, 'The zipcode must be at least 5 characters!']
        }, 
        type: {
            type: String,
            required: [true, 'A rental home type is required'],
            enum: [
                'Apartment Complex',
                'Luxury Condos',
                'Single Family Home',
                'Twin Family Home',
                'Row Home',
                'Rancher'
            ],
        },
        // this will connect rental model to user model 
        agent: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true },
);

const Rental = mongoose.model('Rental', RentalSchema);

module.exports = Rental;

//need to export so that we can use it in our frontend 
//location is for the longtitude and latitude for google maps api
//type: mongoose.Schema.Types.ObjectId,