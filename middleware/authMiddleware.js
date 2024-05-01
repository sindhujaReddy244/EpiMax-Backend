const jwt = require('jsonwebtoken');
const { jsonResponse } = require('../utils/responseUtils');
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (id, username, role) => {
  const payload = { id, username, role };
  const options = { expiresIn: '1h' }; // Token expires in 1 hour

  try {
    const token = jwt.sign(payload, JWT_SECRET, options);
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    return null;
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    // Store decoded user information in the request object
    req.user = decoded;
    next(); // Call next middleware or route handler
  });
};

module.exports = { generateToken, authenticateToken };


