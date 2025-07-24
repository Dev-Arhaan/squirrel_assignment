import React, { useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { searchDoctors } from '../services/doctorService';
import DoctorResultsList from '../components/patient/DoctorResultsList';

function PatientSearchPage() {
  const [locationInput, setLocationInput] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false); // To track if a search has been performed

  // Load the Google Maps script and include the 'places' library for geocoding
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script-patient',
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!isLoaded || !locationInput) return;

    setLoading(true);
    setError(null);
    setDoctors([]);
    setSearched(true);

    // 1. Geocode the user's input string to get coordinates
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: locationInput }, async (results, status) => {
      if (status === 'OK' && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        const searchParams = {
          latitude: lat(),
          longitude: lng(),
          radiusKm: 10, // Default search radius
        };
        
        // 2. Call our backend with the geocoded coordinates
        try {
          const foundDoctors = await searchDoctors(searchParams);
          setDoctors(foundDoctors.data || []);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError('Location not found. Please try a more specific address.');
        setLoading(false);
      }
    });
  };

  return (
    <div className="container mx-auto p-4 sm:p-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Find a Doctor Near You</h1>
      
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-8">
        <input
          type="text"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          placeholder="Enter a location (e.g., 'Sector 15, Faridabad')"
          className="flex-grow block w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500"
          disabled={!isLoaded || loading}
          required
        />
        <button
          type="submit"
          disabled={!isLoaded || loading}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-3 px-6 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* --- Results Section --- */}
      <div className="mt-6">
        {loading && <p className="text-center text-gray-500">Searching for doctors...</p>}
        {error && <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
        
        {!loading && doctors.length > 0 && (<DoctorResultsList doctors={doctors} />)}
        
        {/* Empty State: Show only after a search has been made and no doctors were found */}
        {!loading && searched && doctors.length === 0 && !error && (
          <div className="text-center text-gray-500 py-8">
            <p>No doctors found in this area. Try a different location.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientSearchPage;