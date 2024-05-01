const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasksController");
const authMiddleware = require("../middleware/authMiddleware");

// Create task
router.post("/task", authMiddleware, async (req, res) => {
  await taskController.createTask(req, res);
});


// Get all tasks
router.get("/task", authMiddleware, async (req, res) => {
  await taskController.getAllTasks(req, res);
});

// Get task by ID
router.get("/task/:id", authMiddleware, async (req, res) => {
  await taskController.getTaskById(req, res);
});

// Update task
router.put("/task/:id", authMiddleware, async (req, res) => {
  await taskController.updateTask(req, res);
});

// Delete task
router.delete("/task/:id", authMiddleware, async (req, res) => {
  await taskController.deleteTask(req, res);
});

module.exports = router;
