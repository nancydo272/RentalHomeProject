const RentalController = require('../controllers/rental.controller');

module.exports = (app) => {
    app.get('/api/rentals', RentalController.getRentals);
    app.get('/api/rentals/:id', RentalController.getRentalById);
    app.post('/api/rentals/create', RentalController.createRental);
    app.put('/api/rentals/:id', RentalController.updateRental);
    app.delete('/api/rentals/:id', RentalController.deleteRental);
};