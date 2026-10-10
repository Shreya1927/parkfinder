// middleware/errorMiddleware.js
// Centralized error handling middleware
// It catches errors passed to next(err) and returns a JSON response without leaking stack traces in production.

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || 'Server Error',
    // In development, include stack for easier debugging
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
