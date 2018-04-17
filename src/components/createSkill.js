import React from "react";
import { NavLink } from "react-router-dom";
import { PageHeader } from "react-bootstrap";

const CreateSkill = () => (
  <div className="container">
    <PageHeader>Select a Template</PageHeader>

    <div className="skill-template-container">
      <div className="skill-template-item">
        <div className="thumbnail">
          {" "}
          <div className="caption">
            {" "}
            <h3>Simple Interaction</h3>{" "}
            <NavLink
                className="btn btn-primary"
                exact
                activeClassName="current"
                to="/createSkill/simple-interaction"
              >
                Choose skill
              </NavLink>
            <p>
              This is a simple interaction skill. Provide some sentences to
              trigger the skill and Alexa will respond with a static response.
            </p>{" "}
            <p>
              
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
            <NavLink
                className="btn btn-primary"
                exact
                activeClassName="current"
                to="/createSkill/flash-briefing"
              >
                Choose skill
              </NavLink>
            <p>
              This template allows you to upload an existing RSS feed as a flash
              briefing skill.
            </p>{" "}
            <p>
            
            </p>{" "}
          </div>{" "}
        </div>
      </div>

            <div className="skill-template-item">
        <div className="thumbnail">
          {" "}
          <div className="caption">
            {" "}
            <h3>Complex Skill</h3>{" "}
            <NavLink
                className="btn btn-primary"
                exact
                activeClassName="current"
                to="/createSkill/flash-briefing"
              >
                Choose skill
              </NavLink>
            <p>
            This is a complex interaction skill. Provide multiple sentences to
              trigger the skill and Alexa will respond with dynamic responses.
            </p>{" "}
            <p>
              
            </p>{" "}
          </div>{" "}
        </div>
      </div>

    </div>
  </div>
);

export default CreateSkill;
