const Doctor = require('../models/Doctor');

const createDoctor = async (doctorData) => {
  const doctor = new Doctor(doctorData);
  await doctor.save();
  return doctor;
};

const findDoctorsNearby = async (lon, lat, radiusKm) => {
  const radiusInMeters = radiusKm * 1000;

  const doctors = await Doctor.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [lon, lat]
        },
        $maxDistance: radiusInMeters
      }
    }
  });
  return doctors;
};

module.exports = {
    createDoctor,
    findDoctorsNearby,
};