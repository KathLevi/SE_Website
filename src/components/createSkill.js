import React from "react";
import { NavLink } from "react-router-dom";
import { PageHeader } from "react-bootstrap";

const CreateSkill = () => (
  <div className="container page-container">
    <PageHeader>Select a Template</PageHeader>

    <div className="skill-template-container">
      <div className="skill-template-item">
        <div className="thumbnail thumbnail-ext">
          <div className="caption thumbnail-ext">
            <h3>Simple Interaction</h3>
            <p className="select-skill-text">
              This is a simple interaction skill. Provide some sentences to
              trigger the skill and Alexa will respond with a static response.
            </p>
            <NavLink
              className="btn btn-primary select-skill-btn emptyBtn"
              exact
              activeClassName="current"
              to="/create-skill/simple-interaction"
            >
              Choose skill
            </NavLink>
            <p />
          </div>
        </div>
      </div>

      <div className="skill-template-item">
        <div className="thumbnail thumbnail-ext">
          <div className="caption thumbnail-ext">
            <h3>Flash Briefing</h3>
            <p className="select-skill-text">
              This template allows you to upload an existing RSS feed as a flash
              briefing skill.
            </p>
            <NavLink
              className="btn btn-primary select-skill-btn emptyBtn"
              exact
              activeClassName="current"
              to="/create-skill/flash-briefing"
            >
              Choose skill
            </NavLink>
          </div>
        </div>
      </div>

      <div className="skill-template-item">
        <div className="thumbnail thumbnail-ext">
          <div className="caption thumbnail-ext">
            <h3>Complex Skill</h3>
            <p className="select-skill-text">
              This is a complex interaction skill. Provide multiple sentences to
              trigger the skill and Alexa will respond with dynamic responses.
            </p>
            <NavLink
              className="btn btn-primary select-skill-btn emptyBtn"
              exact
              activeClassName="current"
              to="/create-skill/flash-briefing"
            >
              Choose skill
            </NavLink>
            <p />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CreateSkill;
