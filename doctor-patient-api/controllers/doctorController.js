const doctorService = require('../services/doctorService');
const AppError = require('../utils/AppError');

const registerDoctor = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
      return next(new AppError('All fields (name, address, latitude, longitude) are required', 400));
    }

    // IMPORTANT: Format coordinates as [longitude, latitude]
    const doctorData = {
      name,
      address,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    };

    const doctor = await doctorService.createDoctor(doctorData);
    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

const searchDoctors = async (req, res, next) => {
  try {
    const { latitude, longitude, radiusKm } = req.query;

    if (!latitude || !longitude || !radiusKm) {
      return next(new AppError('Query parameters latitude, longitude, and radiusKm are required', 400));
    }

    const doctors = await doctorService.findDoctorsNearby(
      parseFloat(longitude),
      parseFloat(latitude),
      parseFloat(radiusKm)
    );

    res.status(200).json({ success: true, count: doctors.length, data: doctors });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  registerDoctor,
  searchDoctors,
};