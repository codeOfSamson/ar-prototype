import React, { useEffect, useState, useRef } from "react";

const ARScene = () => {
  const targetLatitude = 24.855636;
  const targetLongitude = 121.830489;

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
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;
        const distance = haversine(userLatitude, userLongitude, targetLatitude, targetLongitude);
        setIsClose(distance < 50);
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
      {/* {isClose ? (
        <model-viewer
          ref={modelViewerRef}
          src="/assets/student.glb"
          ios-src="/assets/student.usdz"
          alt="A 3D model of a student"
          ar
          ar-modes="scene-viewer webxr quick-look"
          ar-placement="floor"
          camera-controls
          //environment-image="/assets/environment.hdr"
          shadow-intensity="1"
          animation-name="Idle" // Specify the animation name
          style={{ width: "100%", height: "500px" }}
        >
          <button
            slot="ar-button"
            style={{
              padding: "10px",
              background: "blue",
              color: "white",
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            View in AR
          </button>

          <button
            slot="hotspot-1"
            data-position="0m 0m 0m"
            data-normal="0m 1m 0m"
            style={{
              padding: "10px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={playAudioAndAnimation}
          >
            Replay Audio & Animation
          </button>
        </model-viewer>
      ) : (
        <p>Please move closer to the target location to view the model in AR.</p>
      )} */}
    <model-viewer
          ref={modelViewerRef}
          src="/assets/student.glb"
          //ios-src="/assets/student.usdz"
          alt="A 3D model of a student"
          ar
          ar-modes="scene-viewer webxr quick-look"
          ar-placement="floor"
          camera-controls
          //environment-image="/assets/environment.hdr"
          shadow-intensity="1"
          animation-name="Idle" // Specify the animation name
          style={{ width: "100%", height: "1000px" }}
        >
          <button
            slot="ar-button"
            style={{
              padding: "10px",
              background: "blue",
              color: "white",
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            View in AR
          </button>

          <button
            slot="hotspot-1"
            data-position="0m 1m 0m"
            data-normal="0m 1m 0m"
            style={{
              padding: "10px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={playAudioAndAnimation}
          >
            Replay Audio & Animation
          </button>
        </model-viewer>
      <audio ref={audioRef} src="/assets/audio/mings.mp3" />
    </div>
  );
};

export default ARScene;
