import React from 'react';

function DoctorCard({ doctor }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
      <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
      <p className="text-gray-600 mt-2">{doctor.address}</p>
      {/* <p className="text-sm font-medium text-indigo-600 mt-2">
        Distance: {doctor.distanceKm} km away
      </p> */}
    </div>
  );
}

export default DoctorCard;