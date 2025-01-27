import React, { useState, useEffect } from "react";

function LocationTracker() {
  const [isClose, setIsClose] = useState(false);
  const [speed, setSpeed] = useState(null); // Speed in m/s
  const [direction, setDirection] = useState(null); // Compass direction
  const targetLatitude = 24.85577206180976;
  const targetLongitude = 121.8306137550298;

  useEffect(() => {
    let previousPosition = null; // To calculate direction and speed

    const haversine = (lat1, lon1, lat2, lon2) => {
      const R = 6371e3; // Earth radius in meters
      const toRad = (val) => (val * Math.PI) / 180;
      const deltaLat = toRad(lat2 - lat1);
      const deltaLon = toRad(lon2 - lon1);

      const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in meters
    };

    const calculateDirection = (prev, current) => {
      const deltaLon = current.longitude - prev.longitude;
      const deltaLat = current.latitude - prev.latitude;
      const angle = (Math.atan2(deltaLon, deltaLat) * 180) / Math.PI; // Angle in degrees
      const compassDirections = [
        "N", "NE", "E", "SE", "S", "SW", "W", "NW", "N",
      ];
      const index = Math.round((angle + 360) % 360 / 45);
      return compassDirections[index];
    };

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, speed: gpsSpeed } = position.coords;
        const distance = haversine(latitude, longitude, targetLatitude, targetLongitude);

        // Distance logic
        setIsClose(distance < 15);
        if (distance < 15)

          // Speed logic (fallback for devices without speed data)
          if (gpsSpeed !== null) {
            setSpeed(gpsSpeed); // Speed in meters/second
          } else if (previousPosition) {
            const timeElapsed = (position.timestamp - previousPosition.timestamp) / 1000; // in seconds
            const calculatedSpeed = haversine(
              previousPosition.latitude,
              previousPosition.longitude,
              latitude,
              longitude
            ) / timeElapsed;
            setSpeed(calculatedSpeed);
          }

        // Direction logic
        if (previousPosition) {
          const calculatedDirection = calculateDirection(previousPosition, { latitude, longitude });
          setDirection(calculatedDirection);
        }

        previousPosition = { latitude, longitude, timestamp: position.timestamp };
      },
      (error) => {
        console.error("Error watching position:", error);
      },
      { enableHighAccuracy: true }
    );

    // Clean up the watcher when the component unmounts
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div>
      <h1>Location Tracker</h1>
      <p>{isClose ? "You are close to the target!" : "You are far from the target."}</p>
      <p>Speed: {speed ? `${(speed * 3.6).toFixed(2)} km/h` : "Calculating..."}</p>
      <p>Direction: {direction || "Calculating..."}</p>
    </div>
  );
}

export default LocationTracker;
