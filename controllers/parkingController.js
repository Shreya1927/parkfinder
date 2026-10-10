// controllers/parkingController.js
const asyncHandler = require('express-async-handler');
const ParkingArea = require('../models/ParkingArea');

// @desc Get all active parking areas
// @route GET /api/parking
// @access Public
const getAllParkingAreas = asyncHandler(async (req, res) => {
  const areas = await ParkingArea.find({ active: true });
  res.json(areas);
});

// @desc Get a parking area by ID
// @route GET /api/parking/:id
// @access Public
const getParkingAreaById = asyncHandler(async (req, res) => {
  const area = await ParkingArea.findById(req.params.id);
  if (!area) {
    return res.status(404).json({ message: 'Parking area not found' });
  }
  res.json(area);
});

// @desc Search parking areas by name or address
// @route GET /api/parking/search?query=...
// @access Public
const searchParkingAreas = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Query param required' });
  }
  const regex = new RegExp(query, 'i');
  const results = await ParkingArea.find({
    $or: [{ name: regex }, { address: regex }],
    active: true,
  });
  res.json(results);
});

// @desc Create a new parking area (admin only)
// @route POST /api/parking
// @access Admin
const createParkingArea = asyncHandler(async (req, res) => {
  const { name, address, coordinates, pricePerHour, totalSlots } = req.body;
  const area = await ParkingArea.create({
    name,
    address,
    coordinates,
    pricePerHour,
    totalSlots,
  });
  res.status(201).json(area);
});

// @desc Update a parking area (admin only)
// @route PUT /api/parking/:id
// @access Admin
const updateParkingArea = asyncHandler(async (req, res) => {
  const area = await ParkingArea.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!area) {
    return res.status(404).json({ message: 'Parking area not found' });
  }
  res.json(area);
});

// @desc Deactivate (soft delete) a parking area (admin only)
// @route DELETE /api/parking/:id
// @access Admin
const deleteParkingArea = asyncHandler(async (req, res) => {
  const area = await ParkingArea.findByIdAndUpdate(
    req.params.id,
    { active: false },
    { new: true }
  );
  if (!area) {
    return res.status(404).json({ message: 'Parking area not found' });
  }
  res.json({ message: 'Parking area deactivated' });
});

module.exports = {
  getAllParkingAreas,
  getParkingAreaById,
  searchParkingAreas,
  createParkingArea,
  updateParkingArea,
  deleteParkingArea,
};
