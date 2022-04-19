import db from "../models/index.js";
const controller = {};
const name = "item";
// Create and Save a new Item
controller.createOne = (req, res) => {
    // Validate request
    if (!req.body.nameL) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create an Item
    const item = new db[name]({
        nameL: req.body.nameL,
        descL: req.body.descL,
        published: req.body.published ? req.body.published : false
    });
    // Save Item in the database
    item
        .save(item)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Item."
            });
        });
};
// Get all Items from the database
controller.getAll = (req, res) => {
    const condition = req.query.condition;
    db[name].find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting Items."
            });
        });
};
// Get a single Item with an id
controller.getOne = (req, res) => {
    const id = req.params.id;
    db[name].findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Item with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error getting Item with id=" + id });
        });
};
// Update an Item by the id in the request
controller.updateOne = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    db[name].findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Item with id=${id}. Maybe Item was not found!`
                });
            } else res.send({ message: "Item was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Item with id=" + id
            });
        });
};
// Delete an Item with the specified id in the request
controller.deleteOne = (req, res) => {
    const id = req.params.id;
    db[name].findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
                });
            } else {
                res.send({
                    message: "Item was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Item with id=" + id
            });
        });
};
// Delete all Items from the database
controller.deleteAll = (req, res) => {
    db[name].deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Items were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Items."
            });
        });
};
export default controller;