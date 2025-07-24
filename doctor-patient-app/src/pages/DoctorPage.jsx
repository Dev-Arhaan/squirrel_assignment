import React, { useState } from 'react';
import MapComponent from '../components/common/MapComponent';
import { registerDoctorClinic } from '../services/doctorService'; // 1. Import the service

function DoctorPage() {
  const [clinicData, setClinicData] = useState({
    name: '',
    address: '',
    location: null,
  });
  
  // 2. Add state for loading and feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClinicData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (location) => {
    setClinicData(prev => ({ ...prev, location }));
  };
  
  // 3. Implement the final async handleSubmit logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clinicData.location) {
      setError("Please select a location on the map.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Prepare the data payload to match the backend's expected structure
    const payload = {
      name: clinicData.name,
      address: clinicData.address,
      latitude: clinicData.location.lat,
      longitude: clinicData.location.lng,
    };

    try {
      await registerDoctorClinic(payload);
      setSuccess('Clinic registered successfully! You can register another one.');
      // Reset the form for another entry
      setClinicData({ name: '', address: '', location: null });
      // Note: The marker on the map component will not reset automatically
      // as its state is internal. A more advanced implementation might involve
      // passing a 'reset' prop to the map component. For now, this is fine.

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Register Your Clinic</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Doctor Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={clinicData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            required
          />
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Clinic Address</label>
          <textarea
            name="address"
            id="address"
            rows={3}
            value={clinicData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            required
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Select Clinic Location</h3>
          <p className="text-sm text-gray-500 mb-4">Click on the map to drop a pin at your clinic's location.</p>
          <div className="rounded-lg overflow-hidden border border-gray-300">
            <MapComponent onLocationSelect={handleLocationSelect} />
          </div>
        </div>
        
        {clinicData.location && (
          <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
            <p className="text-sm font-medium text-blue-800">Selected Coordinates:</p>
            <p className="text-sm text-gray-600 font-mono">
              Lat: {clinicData.location.lat.toFixed(6)}, Lng: {clinicData.location.lng.toFixed(6)}
            </p>
          </div>
        )}
         {success && <div className="p-4 text-sm text-green-700 bg-green-100 rounded-lg">{success}</div>}
        {error && <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}

        <button
          type="submit"
          disabled={!clinicData.name || !clinicData.address || !clinicData.location}
          className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Registering...' : 'Register Clinic'}
        </button>
      </form>
    </div>
  );
}

export default DoctorPage;