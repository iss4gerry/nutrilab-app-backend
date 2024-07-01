const httpStatus = require('http-status');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR
  const message = err.message || 'Internal Server Error'

  res.status(statusCode).json({
    status: statusCode,
    message: message,
  })
}

module.exports = errorHandler