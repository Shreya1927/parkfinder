// routes/slotRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const {
  getSlotsByParkingArea,
  createSlot,
  checkSlotAvailability,
} = require('../controllers/slotController');

const router = express.Router();

// Get slots for a specific parking area (public)
router.get('/parking/:id', getSlotsByParkingArea);

// Admin routes
router.post('/', protect, admin, createSlot);
router.get('/:id/availability', protect, checkSlotAvailability);

module.exports = router;
