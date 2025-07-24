const Doctor = require('../models/Doctor');

const createDoctor = async (doctorData) => {
  const doctor = new Doctor(doctorData);
  await doctor.save();
  return doctor;
};

const findDoctorsNearby = async (lon, lat, radiusKm) => {
  const doctors = await Doctor.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lon, lat] // [longitude, latitude]
        },
        distanceField: 'distanceKm', // Field to add with calculated distance
        distanceMultiplier: 0.001, // Convert distance from meters to kilometers
        spherical: true // Calculate distance on a sphere
      }
    },
    {
      // Filter the results to be within the specified radius
      $match: {
        distanceKm: { $lte: radiusKm }
      }
    }
  ]);
  return doctors;
};

module.exports = {
    createDoctor,
    findDoctorsNearby,
};