import React, { useState } from 'react';
import './App.css';


const buttonStyle = {
  "width": "100px",
  "height": "50px",
  "backgroundColor": "white",
  "fontWeight": "bold"
}


function App() {


  function Hello(){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage((tabs[0].id as number), {action: true}, function(res) {});
    });
  }

  return (
    <div className="App" style={{"width" : "200px", "height" : "200px"}}>
      <header className="App-header">
        <div style={{fontSize: "1 em", marginBottom: "25px"}}>
          <p><span style={{fontWeight: "bold"}}>Bio</span>nic <span style={{fontWeight: "bold"}}>Read</span>ing</p>
        </div>

        <button onClick={Hello} style={buttonStyle}>
          Apply To Tab
        </button>
      </header>
    </div>
  );
}

export default App;
