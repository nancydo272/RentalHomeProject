const UserController = require('../controllers/user.controller');

module.exports = (app) => {
    app.post("/register", UserController.register);
    app.post("/login", UserController.login);
    app.post("/logout", UserController.logout);
    app.get("/users", UserController.getLogUser);
    app.get("/user/:id", UserController.updateUser);
};