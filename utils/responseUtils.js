const jsonResponse = (res, statusCode, data) => {
  res.status(statusCode).json(data);
};

module.exports = { jsonResponse };
  