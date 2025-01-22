import React from "react";
// import "./ARScene.css"; // optional styles

const ARScene = () => {
  return (
    <div className="ar-container">
  <model-viewer
  src="/assets/globe.glb"
 ios-src="/assets/globe.usdz"
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
<button slot="ar-button" style={{ padding: "10px", background: "blue", color: "white" }}>
    View in AR
  </button>
</model-viewer>

    </div>
  );
};

export default ARScene;
