const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/db');

const authController = {
  //login
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

      if (user.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ user_id: user.rows[0].id }, 'your_secret_key', { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },


  //register
  async register(req, res) {
    const { username, password } = req.body;
    try {
      const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await pool.query(
        'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id',
        [username, hashedPassword]
      );

      const token = jwt.sign({ user_id: newUser.rows[0].id }, 'your_secret_key', { expiresIn: '1h' });
      res.status(201).json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = authController;
