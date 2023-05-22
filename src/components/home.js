import React from "react";
import cloudOne from "../images/cloud1.png";
import cloudTwo from "../images/cloud2.png";

function Home(props) {
  return (
    <div>
      <img src={cloudOne} className="cloud-one" />
      <img src={cloudTwo} className="cloud-two" />

      <nav className="nav--container">
        <h1 className="nav--header">Quizzical</h1>
        {!props.clicked && <h3 className="nav--text">Let's Play!</h3>}
        {props.clicked && props.nameEntered !== "" && (
          <h3>Welcome {props.nameEntered}</h3>
        )}
        <div className="nav--child">
          <button className="start" onClick={props.start}>
            Start quiz
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Home;
