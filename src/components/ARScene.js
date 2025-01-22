import React from "react";
// import "./ARScene.css"; // optional styles

const ARScene = () => {
  return (
    <div className="ar-container">
      <model-viewer
        src="/assets/globe.glb"  // Replace with your .glb/.gltf file path
        alt="A 3D model of an NPC"
        ar
        ar-modes="scene-viewer webxr"
        camera-controls
        shadow-intensity="1"
        environment-image="neutral"
        auto-rotate
        style={{ width: "100%", height: "500px" }}
      ></model-viewer>
    </div>
  );
};

export default ARScene;
