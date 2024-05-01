const Task = require('../models/Task');

const taskController = {
  //create task
  async createTask(req, res) {
    const { title, description, status, assignee_id } = req.body;
    try {
      const task = new Task();
      const newTask = await task.createTask(title, description, status, assignee_id);
      res.status(201).json(newTask);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  //get all tasks
  async getAllTasks(req, res) {
    try {
      const task = new Task();
      const tasks = await task.getAllTasks();
      res.json(tasks);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  //get task by id
  async getTaskById(req, res) {
    const { id } = req.params;
    try {
      const task = new Task();
      const foundTask = await task.getTaskById(id);
      if (!foundTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(foundTask);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  //update
  async updateTask(req, res) {
    const { id } = req.params;
    const { title, description, status, assignee_id } = req.body;
    try {
      const task = new Task();
      const updatedTask = await task.updateTask(id, title, description, status, assignee_id);
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(updatedTask);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },


  //delete
  async deleteTask(req, res) {
    const { id } = req.params;
    try {
      const task = new Task();
      const deletedTask = await task.deleteTask(id);
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = taskController;
