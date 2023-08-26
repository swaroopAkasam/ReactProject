import React, { useEffect, useState } from 'react';

const CurrentLocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleError
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleSuccess = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const handleError = (error) => {
    setError(error.message);
  };

  return (
    <div>
      {latitude && longitude ? (
        <div>
          Latitude: {latitude}
          <br />
          Longitude: {longitude}
        </div>
      ) : (
        <div>{error ? error : 'Fetching location...'}</div>
      )}
    </div>
  );
};

export default CurrentLocation;
