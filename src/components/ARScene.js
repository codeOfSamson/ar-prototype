import React, { useEffect, useState, useRef } from "react";

const ARScene = () => {
  // const targetLatitude = 24.855636;
  // const targetLongitude = 121.830489;

  //xietianlu down the streed
  const targetLatitude =   24.855794;
  const targetLongitude = 121.830580;

  const [isClose, setIsClose] = useState(false);
  const audioRef = useRef(null);
  const modelViewerRef = useRef(null);

  const haversine = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance * 1000;
  };

  useEffect(() => {
    // Watch the user's location
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;
  
        // Calculate the distance to the target coordinates
        const distance = haversine(userLatitude, userLongitude, targetLatitude, targetLongitude);
  
        // If the distance is less than 50 meters, allow the model to show in AR
        if (distance < 5) {
          setIsClose(true); // User is close to the target location
        } else {
          setIsClose(false); // User is too far
        }
      },
      (error) => {
        console.error("Error watching position:", error);
      },
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const playAudioAndAnimation = () => {
    if (audioRef.current && modelViewerRef.current) {
      const audioDuration = audioRef.current.duration * 1000; // Audio duration in milliseconds
      const animationDuration = modelViewerRef.current.getAttribute("animation-duration") || 3000; // Default to 3 seconds if undefined

      // Play both audio and animation
      audioRef.current.play();
      modelViewerRef.current.play();

      // Stop animation and audio after the longer of the two durations
      const duration = Math.max(audioDuration, animationDuration);
      setTimeout(() => {
        stopAnimation();
      }, duration);
    }
  };

  const stopAnimation = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.pause(); // Stop animation
    }
    if (audioRef.current) {
      audioRef.current.pause(); // Stop audio
      audioRef.current.currentTime = 0; // Reset audio to the beginning
    }
  };

  return (
    <div className="ar-container">
      {isClose ? (
        <div className="stay">

         <img
         src="/assets/sandwichTreasure.webp" // Replace with your GIF path
         alt="treasure"
         style={{
           imageRendering: "pixelated",
           width: "150px",
         }}
       />\        
       <p>Congratulations you have found the hidden sandwich treasure!</p>
       <p>Now go here: 24°51'24.2"N 121°49'55.0"E to commune with those who have gone before you, came and went, and though such thoughts as:</p>
       <p>"Fantastic sourdough, insanely good cakes and pies."</p>
       <p>or</p>
       <p>"A treasure shop that I discovered by chance when traveling to Yilan! "</p>

       </div>
      ) : (
        <>

        <img
        src="/assets/adventureCat.webp" // Replace with your GIF path
        alt="Walking Cat"
        style={{
          imageRendering: "pixelated",
          width: "150px",
        }}
      
      />

        <p>Please move closer to the white cat.  Listen to him, trust his guidance....</p>
        </>
      )}
  
      

      <audio ref={audioRef} src="/assets/audio/mings.mp3" />
    </div>
  );
};

export default ARScene;
