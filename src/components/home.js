import React from "react";
import home_logo from "../assets/home_logo.png";
import { NavLink } from "react-router-dom";

const Home = () => (
  <div className="container home-container page-container">
    <div className="home-section-2">
      <h1 className="home-header">
        <span>Blue</span>
        <wbr />marble
      </h1>
      <h3>Alexa skills made easy</h3>
      <NavLink
        className="btn btn-primary emptyBtn learnMoreBtn"
        exact
        activeClassName="current"
        to="/demo"
      >
        LEARN MORE
      </NavLink>
    </div>

    <div className="home-section-1">
      <img src={home_logo} alt="blue marble logo" />
    </div>
  </div>
);

export default Home;
