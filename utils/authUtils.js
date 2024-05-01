const jwt = require('jsonwebtoken');
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

module.exports = { generateToken };
