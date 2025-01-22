import React, { useRef } from "react";

const ARScene = () => {
  const audioRef = useRef(null);

  const handleAnimationPlay = (e) => {
    if (audioRef.current) {
      audioRef.current.play(); // Play audio when animation starts
    }
  };

  const handleAnimationPause = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause audio
      audioRef.current.currentTime = 0; // Reset audio playback
    }
  };

  return (
    
    <div className="ar-container">
      {/* Model Viewer */}
     
      <model-viewer
        src="/assets/student.glb"
        ios-src="/assets/student.usdz"
        alt="A 3D model of a chair"
        onClick={(e)=>{handleAnimationPlay(e)}}
        ar-modes="scene-viewer webxr quick-look"
        ar-placement="floor"
        camera-controls
        environment-image="neutral"
        shadow-intensity="1"
        auto-rotate
        autoplay
        style={{ width: "100%", height: "500px" }}
        onPlay={handleAnimationPlay}
        onPause={handleAnimationPause}
      >
        <button
          slot="ar-button"
          style={{ padding: "10px", background: "blue", color: "white" }}
        >
          View in AR
        </button>
      </model-viewer>

      {/* Audio Element */}
      <audio ref={audioRef} src="/assets/audio/mings.mp3" />
    </div>
  );
};

export default ARScene;
