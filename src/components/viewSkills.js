import React from "react";
import { NavLink } from "react-router-dom";
import { PageHeader } from "react-bootstrap";

const ViewSkills = () => (
  <div className="container">
    <PageHeader>My Skills
      <NavLink
        className="btn btn-primary pull-right"
          exact
          activeClassName="current"
          to="/create-skill"
              >
          Create New Skill
      </NavLink>
    </PageHeader>
      <table className="table"> 
        <tr>
          <th>SKILL NAME</th> 
          <th>LANGUAGE</th>
          <th>TYPE</th>
          <th>MODIFIED</th>
          <th>STATUS</th>
          <th>ACTIONS</th>
        </tr>
        <tr>
          <td>Test 01</td>
          <td>English (US)</td>
          <td>Flash Briefing</td>
          <td>04-16-2018</td>
          <td>In Development</td>
          <td>
          <NavLink
                className="btn"
                exact
                activeClassName="current"
                to="/view-skills"
              >
                Edit
              </NavLink> | 
              <NavLink
                className="btn"
                exact
                activeClassName="current"
                to="/view-skills"
              >
                Delete
              </NavLink>
            </td>
        </tr>
        <tr>
          <td>Test 02</td>
          <td>English (UK)</td>
          <td>Simple Skill</td>
          <td>04-17-2018</td>
          <td>In Certification</td>
          <td>
          <NavLink
                className="btn"
                exact
                activeClassName="current"
                to="/view-skills"
              >
                Edit
              </NavLink> | 
              <NavLink
                className="btn"
                exact
                activeClassName="current"
                to="/view-skills"
              >
                Delete
              </NavLink>
            </td>
        </tr>
      </table>
  </div>
);

export default ViewSkills;
