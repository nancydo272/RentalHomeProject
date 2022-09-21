const RentalController = require('../controllers/rental.controller');

module.exports = (app) => {
    app.get('/api/rentals', RentalController.getRentals);
    // Line 6 use email to grab all the agent listing example http://localhost:8000/api/agent/awd@awd.com
    app.get('/api/agent/:id', RentalController.AgentList);
    app.get('/api/rentals/:id', RentalController.getRentalById);
    app.post('/api/rentals/create', RentalController.createRental);
    app.put('/api/rentals/:id', RentalController.updateRental);
    app.delete('/api/rentals/:id', RentalController.deleteRental);
};