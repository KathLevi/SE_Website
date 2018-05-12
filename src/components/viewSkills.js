import React from "react";
import { NavLink, Link } from "react-router-dom";
import { PageHeader } from "react-bootstrap";
import axios from "axios";
import { request } from "../helpers/requests";

class ViewSkills extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: Object.values(props.userData.skills)
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ skills: Object.values(props.userData.skills) });
  }

  componentDidMount() {
    if (!this.props.skillsLoaded) {
      axios
        .post("http://127.0.0.1:5004/viewskills", {
          UserId: localStorage.getItem("userId")
        })
        .then(resp => {
          this.props.updateGlobalState({
            userData: { skills: Object.values(resp.data) },
            skillsLoaded: true
          });
          console.log(resp);
        })
        .catch(error => {
          this.props.updateGlobalState({
            skillsLoaded: true
          });
          console.log(error);
        });
    }
  }

  deleteSkill = skillId => {
    this.props.updateGlobalState({
      skillsLoaded: false
    });
    console.log("skillId: ", skillId);
    request("http://127.0.0.1:5004/deleteskill", { SkillId: skillId }, resp => {
      console.log("skill response: ", resp);
      if (resp.data === "SUCCESS") {
        this.props.updateGlobalState({
          userData: {
            skills: this.state.skills.filter(s => s.SkillId !== skillId)
          },
          skillsLoaded: true
        });
      } else {
        this.props.updateGlobalState({
          skillsLoaded: true
        });
      }
    });
  };

  render() {
    return (
      <div className="container page-container">
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
        {!this.state.skills.length &&
          this.props.skillsLoaded && (
            <div className="container" style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "18px" }}>
                No Alexa skills.{" "}
                <NavLink exact activeClassName="current" to="/create-skill">
                  Add one now!
                </NavLink>
              </h1>
            </div>
          )}
        {this.state.skills.length > 0 &&
          this.props.skillsLoaded && (
            <div className="view-skills-table">
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
                        <td>
                          <Link to={"view-skill/" + skill.SkillId}>
                            {skill.Name}
                          </Link>
                        </td>
                        <td>{"English"}</td>
                        <td>{skill.Template}</td>
                        <td>{skill.CreationDate}</td>
                        <td>{skill.Status}</td>
                        <td>
                          <NavLink
                            className="skills-btn"
                            exact
                            to="/view-skills"
                          >
                            Edit
                          </NavLink>{" "}
                          |
                          <a
                            className="skills-btn"
                            onClick={() => this.deleteSkill(skill.SkillId)}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        {!this.props.skillsLoaded && <div className="spinner" />}
      </div>
    );
  }
}

export default ViewSkills;
