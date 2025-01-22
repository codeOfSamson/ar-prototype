import React, { useEffect, useState } from "react";

const ARScene = () => {
  // Set the target GPS coordinates (example: a specific location in latitude and longitude)
  const targetLatitude =  24.858529;//Target latitude
  const targetLongitude = 121.824833; // Target longitude (e.g., San Francisco)


  const [isClose, setIsClose] = useState(false); // State to track if user is close to target location

  // Function to calculate the distance between two GPS coordinates
  const haversine = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance * 1000; // Return distance in meters
  };

  useEffect(() => {
    // Get user's current location using the Geolocation API
    navigator.geolocation.getCurrentPosition((position) => {
      const userLatitude = position.coords.latitude;
      const userLongitude = position.coords.longitude;

      // Calculate the distance to the target coordinates
      const distance = haversine(userLatitude, userLongitude, targetLatitude, targetLongitude);

      // If the distance is less than 50 meters, allow the model to show in AR
      if (distance < 50) {
        setIsClose(true); // User is close to the target location
      } else {
        setIsClose(false); // User is too far
      }
    });
  }, []);

  return (
    <div className="ar-container">
      {isClose ? (
        <model-viewer
          src="/assets/student.glb"
          ios-src="/assets/student.usdz"
          alt="A 3D model of a chair"
          ar
          ar-modes="scene-viewer webxr quick-look"
          ar-placement="floor"
          camera-controls
          environment-image="neutral"
          shadow-intensity="1"
          auto-rotate
          autoplay
          style={{ width: "100%", height: "500px" }}
        >
          <button
            slot="ar-button"
            style={{
              padding: "10px",
              background: "blue",
              color: "white",
            }}
          >
            View in AR
          </button>
        </model-viewer>
      ) : (
        <p>Please move closer to the target location to view the model in AR.</p>
      )}
    </div>
  );
};

export default ARScene;
