import itemsController from '../controllers/item.controller.js';
import express from 'express';
// Creating a router as a module, loading a middleware functions in it,
// defining routes, and mountings the router module on a path in the main app.
// It's needed to routing pathes after /api/collections/item path
// #7 in diagram
const router = express.Router();
// Create and Save a new Item
router.post("/", itemsController.createOne);
// Get all Items from the database
router.get("/", itemsController.getAll);
// Get a single Item with an id
router.get("/:id", itemsController.getOne);
// Update an Item by the id in the request
router.put("/:id", itemsController.updateOne);
// Delete an Item with the specified id in the request
router.delete("/:id", itemsController.deleteOne);
// Delete all Items from the database
router.delete("/", itemsController.deleteAll);
export default router;