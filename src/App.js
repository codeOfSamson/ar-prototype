import './App.css';
import React, { useState, useRef } from "react";
import ARScene from "./components/ARScene";
import { introWelcome } from './speech/intro';
import LocationTracker from './components/LocationTracker';

function App() {
  const [begin, setBegin] = useState(false)
  const [notTrusted, setNotTrusted] = useState(false)

  // Create a ref for the div
  const myDivRef = useRef(null);

  // Create a ref for the audio element
  const audioRef = useRef(new Audio('/assets/audio/mings.mp3')); // Replace with your audio file path

  function printStringByWord(e) {
    let words = introWelcome.split(" "); // Step 1: Split the string into words.
    let index = 0; // Step 2: Initialize an index to track the current word.
    let intervalId = setInterval(function () { // Step 3: Set up a timer to run repeatedly.
      if (myDivRef.current) {
        myDivRef.current.innerHTML += words[index] + " "; // Step 4: Append the current word to the myDiv content.
      }
      index++; // Step 5: Move to the next word.
      if (index == words.length) { // Step 6: Check if all words are printed.
        clearInterval(intervalId); // Step 7: Stop the timer if done.
        audioRef.current.pause(); // Stop the audio when done
        audioRef.current.currentTime = 0; // Reset audio to the start
      }
    }, 200); // Step 8: Run this function every 200 milliseconds.

    // Start playing the audio when the function is triggered
    audioRef.current.play();
  }

  return (
    <div className="App">
      <h1>Toucheng Adventure Cat</h1>
      <button onClick={(e) => { printStringByWord(e) }} >Trust </button>
      {/* Use the ref for the div */}
      <ARScene />
      <LocationTracker />
      <div id='game-textbox' ref={myDivRef}></div>
    </div>
  );
}

export default App;
