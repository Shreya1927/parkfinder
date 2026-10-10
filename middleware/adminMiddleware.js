// middleware/adminMiddleware.js - Restrict access to admin users only
const asyncHandler = require('express-async-handler');

const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Admin access required' });
});

module.exports = { admin };
