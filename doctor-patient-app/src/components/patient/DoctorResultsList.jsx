import React from 'react';
import DoctorCard from '../common/DoctorCard';

function DoctorResultsList({ doctors }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Doctors Found Nearby</h2>
      <div className="space-y-4">
        {doctors.map(doctor => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}

export default DoctorResultsList;