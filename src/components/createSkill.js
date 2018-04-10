import React from "react";
import { NavLink } from "react-router-dom";

const CreateSkill = () => (
  <div className="container">
    <h1 className="page-header">Select a template</h1>
    <div className="skill-template-container">
      <div className="skill-template-item">
        <div className="thumbnail">
          {" "}
          <div className="caption">
            {" "}
            <h3>Simple Interaction</h3>{" "}
            <p>
              This is a simple interaction skill. Provide some sentences to
              trigger the skill and Alexa will respond with a static response.
            </p>{" "}
            <p>
              <NavLink
                className="btn btn-primary"
                exact
                activeClassName="current"
                to="/createSkill/simpleInteraction"
              >
                Choose skill
              </NavLink>
            </p>{" "}
          </div>{" "}
        </div>
      </div>
      <div className="skill-template-item">
        <div className="thumbnail">
          {" "}
          <div className="caption">
            {" "}
            <h3>Flash Briefing</h3>{" "}
            <p>
              This template allows you to upload an existing RSS feed as a flash
              briefing skill.
            </p>{" "}
            <p>
              <NavLink
                className="btn btn-primary"
                exact
                activeClassName="current"
                to="/createSkill/flashBriefing"
              >
                Choose skill
              </NavLink>
            </p>{" "}
          </div>{" "}
        </div>
      </div>
    </div>
  </div>
);

export default CreateSkill;
