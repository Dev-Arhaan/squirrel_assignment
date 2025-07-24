import React, { useState, useCallback, memo } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

// Default center (Faridabad, India)
const center = {
  lat: 28.4089,
  lng: 77.3178
};

function MapComponent({ onLocationSelect }) {
  // Load the Google Maps script
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
  });

  // State to hold the marker's position
  const [marker, setMarker] = useState(null);

  // useCallback ensures the function isn't recreated on every render
  const onMapClick = useCallback((event) => {
    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarker(newLocation);
    // Pass the selected location back to the parent component
    if (onLocationSelect) {
      onLocationSelect(newLocation);
    }
  }, [onLocationSelect]);

  if (loadError) {
    return <div className="text-red-500">Error loading map</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      onClick={onMapClick}
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
  ) : (
    <div className="h-[400px] w-full flex items-center justify-center bg-gray-200 rounded-md">
        <p className="text-gray-500">Loading Map...</p>
    </div>
  );
}

export default memo(MapComponent);