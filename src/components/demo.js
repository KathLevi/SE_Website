import React from "react";
import logo from "../assets/logo.png";
import { PageHeader } from "react-bootstrap";

const Demo = () => (
  <div className="container">
    <PageHeader>How It Works</PageHeader>
    <div className="demoVid" align="center">
      <video width="800" height="500" controls poster={logo}>
        <source src="" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
);

export default Demo;
