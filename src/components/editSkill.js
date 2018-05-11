import React from "react";
import SimpleInteraction from "./simpleInteraction";
import { request } from "../helpers/requests";

export default class EditSkill extends React.Component {
  constructor(props) {
    super(props);
    let skill =
      props.userData.skills.filter(
        sk => sk.SkillId == props.match.params.skillId
      )[0] || {};
    console.log(skill);
    request(
      "http://127.0.0.1:5004/getskill",
      { SkillId: props.match.params.skillId },
      resp => {
        console.log("skill response: ", resp);
        this.setState({
          skill: { ...this.skill, ...resp.data },
          loaded: true
        });
      }
    );

    this.state = {
      skill: skill,
      loaded: false
    };
  }

  submitSkill = () => {};
  editSkill = () => {};

  render() {
    return (
      <div className="container page-container">
        <button
          className="btn btn-primary pull-right emptyBtn"
          onClick={this.editSkill}
        >
          Edit
        </button>

        {Object.keys(this.state.skill).map(key => (
          <p>{key + ": \t" + this.state.skill[key]}</p>
        ))}
        {this.state.loaded ? (
          <button
            className="btn btn-primary form-submit"
            onClick={this.submitSkill}
          >
            Submit Skill
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
}
