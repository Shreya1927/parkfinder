// models/ParkingSlot.js
const mongoose = require('mongoose');

const parkingSlotSchema = new mongoose.Schema(
  {
    parkingArea: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingArea', required: true },
    slotNumber: { type: String, required: true },
    status: {
      type: String,
      enum: ['available', 'reserved', 'occupied', 'maintenance'],
      default: 'available',
    },
  },
  { timestamps: true }
);

// Ensure a slot number is unique within a parking area
parkingSlotSchema.index({ parkingArea: 1, slotNumber: 1 }, { unique: true });

module.exports = mongoose.model('ParkingSlot', parkingSlotSchema);
