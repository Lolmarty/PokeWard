const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a User
      const user = new User({
        Username: req.body.Username,
        Password: req.body.Password,
        Type: req.body.Type
      });
    
      // Save User in the database
      User.create(user, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        else res.send(data);
      });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        else res.send(data);
      });
};

// Find a single User with a username
exports.findOne = (req, res) => {
    User.findByUsername(req.params.Username, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with Username${req.params.Username}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving User with Username" + req.params.Username
            });
          }
        } else res.send(data);
      });
};

// Update a User identified by the username in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      User.updateById(
        req.params.Username,
        new User(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found User with Username${req.params.Username}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating User with Username" + req.params.Username
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a User with the specified username in the request
exports.delete = (req, res) => {
    User.remove(req.params.Username, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with Username${req.params.Username}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete User with Username" + req.params.Username
            });
          }
        } else res.send({ message: `User was deleted successfully!` });
      });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all users."
          });
        else res.send({ message: `All Users were deleted successfully!` });
      });
};