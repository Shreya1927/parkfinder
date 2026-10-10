// models/ParkingArea.js
const mongoose = require('mongoose');

const parkingAreaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    pricePerHour: { type: Number, required: true },
    totalSlots: { type: Number, required: true },
    active: { type: Boolean, default: true },
    // Additional fields can be added as needed (e.g., imageUrl, description)
  },
  { timestamps: true }
);

module.exports = mongoose.model('ParkingArea', parkingAreaSchema);
