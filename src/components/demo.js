import React from "react";
import logo from "../assets/logo.png";

const Demo = () => (
  <div>
    <h1 className="pageHeader">Demo</h1>

    <div className="demoVid" align="center">
      <video width="800" height="500" controls poster={logo}>
        <source src="" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
);

export default Demo;
