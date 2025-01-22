import logo from './logo.svg';
import './App.css';
import React from "react";
import ARScene from "./components/ARScene";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       
          Edit <code>src/App.js</code> and save to reload.
   
      </header>
      <div className="App">
      <h1>React AR Prototype</h1>
      <ARScene />
    </div>

    </div>
  );
}

export default App;
