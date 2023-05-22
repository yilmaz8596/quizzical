import React, { useState } from "react";
import "./App.css";
import Home from "./components/home";
import Quiz from "./components/quiz";
function App() {
  const [clicked, setClicked] = useState(false);
  const [start, setStart] = useState(false);
  const [getStart, setGetStart] = useState(false);
  const [nameEntered, setNameEntered] = useState("");
  const [getAns, setGetAns] = useState(false);

  function refreshPage() {
    window.location.reload(false);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("name submitted!");
  };

  const handleChange = (e) => {
    setNameEntered(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(true);
    setGetStart(true);
  };

  const handleStart = () => {
    setStart(true);
    setGetStart(false);
  };

  const handleGetAns = () => {
    setGetAns(true);
  };

  return (
    <div>
      {!getStart && !start && (
        <Home
          clicked={clicked}
          nameEntered={nameEntered}
          submit={handleSubmit}
          change={handleChange}
          click={handleClick}
          start={handleStart}
        />
      )}
      {start && !getStart && (
        <Quiz click={handleGetAns} getAns={getAns} reset={refreshPage} />
      )}
    </div>
  );
}

export default App;
