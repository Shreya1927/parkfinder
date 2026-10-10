// routes/parkingRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const {
  getAllParkingAreas,
  getParkingAreaById,
  createParkingArea,
  updateParkingArea,
  deleteParkingArea,
  searchParkingAreas,
} = require('../controllers/parkingController');

const router = express.Router();

// Public routes
router.get('/', getAllParkingAreas);
router.get('/search', searchParkingAreas);
router.get('/:id', getParkingAreaById);

// Admin protected routes
router.post('/', protect, admin, createParkingArea);
router.put('/:id', protect, admin, updateParkingArea);
router.delete('/:id', protect, admin, deleteParkingArea);

module.exports = router;
