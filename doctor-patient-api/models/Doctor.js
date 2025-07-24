const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Doctor name is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Clinic address is required'],
    trim: true,
  },
  // GeoJSON Point for location
  location: {
    type: {
      type: String,
      enum: ['Point'], // 'location.type' must be 'Point'
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number], // Array of numbers for [longitude, latitude]
      required: true,
    }
  }
}, { timestamps: true });

// Add the 2dsphere index for geospatial queries
doctorSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Doctor', doctorSchema);