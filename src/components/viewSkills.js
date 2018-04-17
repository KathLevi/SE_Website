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
      </table>
  </div>
);

export default ViewSkills;
