import React from "react";
import { NavLink } from "react-router-dom";
import { PageHeader } from "react-bootstrap";
import axios from "axios";

class ViewSkills extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: JSON.parse(localStorage.getItem("skills")) || []
    };
  }

  render() {
    return (
      <div className="container">
        <PageHeader>
          My Skills
          <NavLink
            className="btn btn-primary pull-right emptyBtn"
            exact
            activeClassName="current"
            to="/create-skill"
          >
            Create New Skill
          </NavLink>
        </PageHeader>
        <table className="table">
          <tbody>
            <tr>
              <th>SKILL NAME</th>
              <th>LANGUAGE</th>
              <th>TYPE</th>
              <th>MODIFIED</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
            {this.state.skills.map(skill => {
              return (
                <tr key={skill.SkillId}>
                  <td>{skill.Name}</td>
                  <td>{"English"}</td>
                  <td>{skill.TemplateId}</td>
                  <td>{skill.CreationDate}</td>
                  <td>{skill.Status}</td>
                  <td>
                    <NavLink className="skills-btn" exact to="/view-skills">
                      Edit
                    </NavLink>{" "}
                    |
                    <NavLink className="skills-btn" exact to="/view-skills">
                      Delete
                    </NavLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ViewSkills;
