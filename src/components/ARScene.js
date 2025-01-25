import React, { useEffect, useState, useRef } from "react";

const ARScene = () => {
  // Target location coordinates
  const targetLatitude = 24.855794;
  const targetLongitude = 121.830580;

  const [isClose, setIsClose] = useState (false);
  const audioRef = useRef(null);

  // Haversine formula to calculate distance between two coordinates
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
    return distance * 1000; // Convert to meters
  };

  useEffect(() => {
    // Watch user's location in real time
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;

        // Calculate distance to the target coordinates
        const distance = haversine(userLatitude, userLongitude, targetLatitude, targetLongitude);

        // If within 5 meters, set the user as "close"
        if (distance < 15) {
          setIsClose(true);
          playAudio();
        } else {
          setIsClose(false);
        }
      },
      (error) => {
        console.error("Error watching position:", error);
      },
      { enableHighAccuracy: true }
    );

    // Cleanup watcher on component unmount
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="ar-container">
      {isClose ? (
        <div className="stay">
          <img
            src="/assets/sandwichTreasure.webp"
            alt="treasure"
            style={{
              imageRendering: "pixelated",
              width: "150px",
            }}
          />
          <p>Congratulations, you have found the hidden sandwich treasure!</p>
          <p>
            Now go here: 24°51'24.2"N 121°49'55.0"E to commune with those who
            have gone before you, came and went, and thought such thoughts as:
          </p>
          <p>"Fantastic sourdough, insanely good cakes and pies."</p>
          <p>or</p>
          <p>"A treasure shop that I discovered by chance when traveling to Yilan!"</p>
        </div>
      ) : (
        <>
          <img
            src="/assets/adventureCat.webp"
            alt="Walking Cat"
            style={{
              imageRendering: "pixelated",
              width: "150px",
            }}
          />
          <div className="intro"></div>
        </>
      )}

      {/* Hidden audio element */}
      <audio ref={audioRef} src="/assets/audio/mings.mp3" />
    </div>
  );
};

export default ARScene;
