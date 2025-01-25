<model-viewer
ref={modelViewerRef}
onClick={playAudioAndAnimation}
src="/assets/student.glb"
//ios-src="/assets/student.usdz"
alt="A 3D model of a student"
ar
ar-modes="quick-look"
ar-placement="floor"
camera-controls
scale="4 4 4" 
ar-scale="auto"
//environment-image="/assets/environment.hdr"
shadow-intensity="1"
autoplay
style={{ width: "100%", height: "1000px" }}
>

<button
  slot="ar-button"
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
{/* <button
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
</button> */}
</model-viewer>