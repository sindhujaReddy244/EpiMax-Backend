

const pool = require('../config/db');

class Task {
  //create
  async createTask(title, description, status, assignee_id) {
    try {
      const query = 'INSERT INTO Tasks (title, description, status, assignee_id) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [title, description, status, assignee_id];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error('Error creating task');
    }
  }

  //get all tasks
  async getAllTasks() {
    try {
      const query = 'SELECT * FROM Tasks';
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw new Error('Error fetching tasks');
    }
  }

  //get task by id
  async getTaskById(id) {
    try {
      const query = 'SELECT * FROM Tasks WHERE id = $1';
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw new Error('Error fetching task by ID');
    }
  }


  //update
  async updateTask(id, title, description, status, assignee_id) {
    try {
      const query = 'UPDATE Tasks SET title = $1, description = $2, status = $3, assignee_id = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *';
      const values = [title, description, status, assignee_id, id];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error('Error updating task');
    }
  }

  //delete
  async deleteTask(id) {
    try {
      const query = 'DELETE FROM Tasks WHERE id = $1 RETURNING *';
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw new Error('Error deleting task');
    }
  }
}

module.exports = Task;
