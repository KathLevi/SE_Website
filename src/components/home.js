import React from "react";
import home_logo from "../assets/home_logo.png";
import { NavLink } from "react-router-dom";

const Home = () => (
  <div className="home-section">
    <div className="home-section-2">
      <h1>Blue <span>Marble</span></h1>
      <h3>Create a new skill with one simple form.</h3>
      <NavLink
      className="btn btn-primary"
      exact
      activeClassName="current"
      to="/demo">
      LEARN MORE
      </NavLink>
    </div>
  
    <div className="home-section-1">
      <img src={home_logo} alt="blue marble logo" />
    </div>
  </div>
);

export default Home;
