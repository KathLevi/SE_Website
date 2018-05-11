import React from "react";
import SimpleInteraction from "./simpleInteraction";
import { request } from "../helpers/requests";
import { PageHeader } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default class ViewSkill extends React.Component {
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
      loaded: false,
      errorBannerRef: React.createRef()
    };
  }

  submitSkill = () => {
    if (this.state.submitted) {
      return;
    }

    this.setState({ submitted: true });

    let requestData = {
      userId: localStorage.getItem("userId"),
      skillName: this.state.skill.Name,
      amz_SkillId: 0,
      status: "In development",
      invocationName: this.state.skill.Invoke,
      category: this.state.skill.Category,
      shortDescription: this.state.skill.ShortDesc,
      longDescription: this.state.skill.LongDesk,
      keywords: [this.state.skill.Keywords],
      template: "Alexa Interaction",
      intents: [
        {
          intent: "intent",
          utterances: {
            "1": this.state.skill.Utterances[0].Utter,
            "2": this.state.skill.Utterances[1].Utter,
            "3": this.state.skill.Utterances[2].Utter,
            "4": this.state.skill.Utterances[3].Utter,
            "5": this.state.skill.Utterances[4].Utter,
            "6": ""
          },
          response: this.state.skill.Responses[0].Resp
        }
      ],
      firstName: "FIRSTNAME",
      lastName: "LASTNAME"
    };

    request("http://127.0.0.1:5004/submit", requestData, resp => {
      console.log("Skill submit response: " + resp);
      console.log(resp);
      this.setState({ submitted: false });
      if (resp.data && "error" in resp.data) {
        let violations = resp.data.error.violations.map(v => v.message);
        this.setState({
          errorMessage: resp.data.error.message,
          violations: violations
        });
        this.state.errorBannerRef.current.focus();
      }
      if (resp.data && resp.data.status === "SUCCESS") {
        //this.props.history.push("/view-skills");
        console.log("SUCCESS: Skill submitted...", resp.data);
      }
    });
  };

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
        <PageHeader>
          View skill
          {this.state.loaded ? (
            <NavLink
              className="btn btn-primary pull-right emptyBtn"
              to={"/edit-skill/" + this.props.match.params.skillId}
            >
              Edit
            </NavLink>
          ) : (
            ""
          )}
        </PageHeader>
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
                {this.state.skill.Utterances.map(x => x.Utter)
                  .filter(x => x)
                  .join(", ")}
              </p>
              <h4>{"Responses: "}</h4>
              <p>
                {this.state.skill.Responses.map(x => x.Resp)
                  .filter(x => x)
                  .join(", ")}
              </p>
            </div>

            <button
              className={
                "btn btn-primary submit-skill-btn" +
                (this.state.submitted ? " disabled disabled-btn" : "")
              }
              onClick={this.submitSkill}
            >
              Submit to Amazon Store
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
