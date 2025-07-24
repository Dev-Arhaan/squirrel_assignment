import React from 'react';
import DoctorCard from '../common/DoctorCard';

function DoctorResultsList({ doctors }) {
  return (
    <div className="space-y-4">
      {doctors.map(doctor => (
        <DoctorCard key={doctor._id} doctor={doctor} />
      ))}
    </div>
  );
}
export default DoctorResultsList;