import "./App.css";
import React, { useState, useEffect } from "react";

import PrintForm from "./components/PrintForm";
import ProfileBadge from "./components/ProfileBadge";

function App() {
  const [isStarting, setIsStarting] = useState(true);



  function someRequest() {
    //Simulates a request; makes a "promise" that'll run for 2.5 seconds
    return new Promise((resolve) => setTimeout(() => resolve(), 2000));
  }

  useEffect(() => {
    someRequest().then(() => {
      const loaderElement = document.querySelector(".loader-container");
      if (loaderElement) {
        loaderElement.remove();
        setIsStarting(!isStarting);
      }
    });
  });

  if (isStarting) {
    return null;
  }

  return (
      <div className="App">
        <PrintForm />
        <ProfileBadge />
      </div>
  );
}

export default App;
