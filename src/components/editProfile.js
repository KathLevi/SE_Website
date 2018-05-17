import React from "react";
import SimpleInteraction from "./simpleInteraction";
import Input from "./modules/input";
import { request } from "../helpers/requests";
import { PageHeader } from "react-bootstrap";
import config from "../config.js";

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    let skill =
      props.userData.skills.filter(
        sk => sk.SkillId == props.match.params.skillId
      )[0] || {};
    console.log(skill);
    request(
      config.local + ":5004/getskill",
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
      loaded: false,
      errorBannerRef: React.createRef()
    };
  }

  saveSkill = () => {};

  render() {
    return (
      <div className="container page-container">
        {this.state.errorMessage && (
          <div
            ref={this.state.errorBannerRef}
            tabIndex="1"
            className="error-banner"
          >
            <div className="error-banner-title">
              {"ERROR: " + this.state.errorMessage}
            </div>
            {this.state.violations.map(v => (
              <div key={v} className="error-banner-violation">
                {v}
              </div>
            ))}
          </div>
        )}
        <PageHeader>Edit Profile</PageHeader>
        {this.state.loaded ? (
          <div>
            <div className="edit-skill-container">
              <h4>{"Skill name: "}</h4>
              <p>{this.state.skill.Name}</p>
              <h4>{"Short description: "}</h4>
              <p>{this.state.skill.ShortDesc}</p>
              <h4>{"Long description: "}</h4>
              <p>{this.state.skill.LongDesk}</p>
              <h4>{"Category: "}</h4>
              <p>{this.state.skill.Category}</p>
              <h4>{"Status: "}</h4>
              <p>{this.state.skill.Status}</p>
              <h4>{"Keywords: "}</h4>
              <p>{this.state.skill.Keywords}</p>
              <h4>{"Creation date: "}</h4>
              <p>{this.state.skill.CreationDate}</p>
              <h4>{"Invocation: "}</h4>
              <p>{this.state.skill.Invoke}</p>
              <h4>{"Utterances: "}</h4>
              <p>
                {this.state.skill.Utterances &&
                  this.state.skill.Utterances.map(x => x.Utter)
                    .filter(x => x)
                    .join(", ")}
              </p>
              <h4>{"Responses: "}</h4>
              <p>
                {this.state.skill.Responses &&
                  this.state.skill.Responses.map(x => x.Resp)
                    .filter(x => x)
                    .join(", ")}
              </p>
            </div>

            <button
              className={
                "btn btn-primary submit-skill-btn emptyBtn" +
                (this.state.submitted ? " disabled disabled-btn" : "")
              }
              onClick={this.saveSkill}
            >
              Save Skill
            </button>
            {this.state.submitted && <div className="spinner-inline" />}
          </div>
        ) : (
          <div className="spinner" />
        )}
      </div>
    );
  }
}
