import React from "react";
import config from "../config.js";
import { toWords } from "number-to-words";
import SimpleInteraction from "./simpleInteraction";
import { request } from "../helpers/requests";
import { PageHeader } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import EditInput from "./modules/editInput";

/* this is pretty spaghetti at this point */

export default class ViewSkill extends React.Component {
  constructor(props) {
    super(props);

    this.inputs = [
      {
        name: "skillName",
        type: "text",
        placeholder: "",
        validations: [
          { message: "Field can't be empty", validate: i => i === "" }
        ]
      },
      {
        name: "shortDesc",
        type: "text",
        placeholder: "",
        validations: [
          { message: "Field can't be empty", validate: i => i === "" }
        ]
      },
      {
        name: "longDesc",
        type: "text",
        placeholder: "",
        validations: [
          { message: "Field can't be empty", validate: i => i === "" }
        ]
      },
      {
        name: "category",
        type: "text",
        placeholder: "",
        validations: [
          { message: "Field can't be empty", validate: i => i === "" }
        ]
      },
      {
        name: "status",
        type: "text",
        placeholder: "",
        static: true,
        validations: [
          { message: "Field can't be empty", validate: i => i === "" }
        ]
      },
      {
        name: "keywords",
        type: "text",
        placeholder: "",
        validations: [
          { message: "Field can't be empty", validate: i => i === "" }
        ]
      },
      {
        name: "invocation",
        type: "text",
        placeholder: "",
        validations: [
          { message: "Field can't be empty", validate: i => i === "" }
        ]
      },
      {
        name: "creationDate",
        type: "text",
        placeholder: "",
        static: true,
        validations: []
      },
      {
        name: "utterances",
        type: "text",
        group: "true",
        placeholder: "",
        validations: []
      },
      {
        name: "responses",
        type: "text",
        group: "true",
        placeholder: "",
        validations: []
      }
    ];

    this.state = {
      skill: {},
      loaded: false,
      isEditing: props.location.state && props.location.state.edit,
      errorBannerRef: React.createRef()
    };

    for (let input of this.inputs) {
      if (input.type == "text") {
        this.state[input.name] = {
          value: input.value,
          validations: input.validations || [],
          error: "",
          optional: input.optional,
          ref: React.createRef(),
          static: input.static
        };
      } else if (input.type == "radio") {
        this.state[input.name] = {
          value: input.value,
          ref: React.createRef()
        };
      } else {
        this.state[input.name] = {
          value: input.value,
          ref: React.createRef()
        };
      }
    }

    /*let skill =
      props.userData.skills.filter(
        sk => sk.SkillId == props.match.params.skillId
      )[0] || {};*/
  }

  requestSkill = () => {
    request(
      config.local + ":5004/getskill",
      { SkillId: this.props.match.params.skillId },
      resp => {
        let updateObj = {};
        let i = 0;
        while (i < 6) {
          let name = "utterance" + i;
          updateObj[name] = {
            value:
              (resp.data.Utterances[i] && resp.data.Utterances[i].Utter) || "",
            validations: this.state.utterances.validations || [],
            error: "",
            ref: React.createRef()
          };
          i += 1;
        }
        resp.data.Responses.forEach((v, i) => {
          let name = "response" + i;
          updateObj[name] = {
            value: v.Resp,
            validations: this.state.responses.validations || [],
            error: "",
            ref: React.createRef()
          };
        });

        console.log("skill response: ", resp);
        this.setState({
          skill: { ...this.skill, ...resp.data },
          loaded: true,
          ...updateObj
        });
      }
    );
  };

  componentDidMount = () => {
    this.requestSkill();
    if (!this.props.data) {
      request(
        config.local + ":5004/getprofile",
        {
          userId: localStorage.getItem("userId")
        },
        resp => {
          console.log(resp);
          this.props.updateGlobalState({ data: { ...resp.data } });
        }
      );
    }
  };

  submitSkill = () => {
    if (this.state.submitted) {
      return;
    }

    this.setState({ submitted: true });

    let requestData = {
      userId: localStorage.getItem("userId"),
      skillId: this.state.skill.SkillId,
      skillName: this.state.skill.Name,
      amz_SkillId: this.state.skill.AMZ_SkillId,
      invocationName: this.state.skill.Invoke,
      category: this.state.skill.Category,
      shortDescription: this.state.skill.ShortDesc,
      longDescription: this.state.skill.LongDesk,
      keywords: [this.state.skill.Keywords],
      template: "Alexa Interaction",
      intents: this.state.skill.Responses.map((r, i) => ({
        intent:
          "intent_" +
          toWords(i)
            .split(" ")
            .join(""),
        utterances: this.state.skill.Utterances.map((u, j) => ({
          val: this.state["utterance" + j].value,
          intentId: u.IntentId
        }))
          .filter(x => x.intentId == r.IntentId)
          .map(x => x.val),
        response: this.state["response" + i].value
      })),
      firstName: this.props.data.firstName,
      lastName: this.props.data.lastName
    };

    this.setState({
      errorMessage: "",
      violations: []
    });

    console.log("requestData", requestData);

    request(config.local + ":5004/submit", requestData, resp => {
      console.log("Skill submit response: " + resp);
      console.log(resp);
      this.setState({ submitted: false });
      if (resp.data && resp.data.error) {
        let violations = [];
        if (resp.data.error.violations) {
          violations = resp.data.error.violations.map(v => v.message);
        }
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

  editSkill = () => {
    if (this.state.skill.Template === "Alexa Interaction") {
      this.setState({ isEditing: true });
    }
  };

  handleInputChange = event => {
    const target = event.target;

    this.setState(prevState => ({
      [target.name]: {
        ...prevState[target.name],
        value: target.value,
        error: ""
      }
    }));
  };

  handleInputBlur = event => {
    const target = event.target;
    let error = "";
    for (let validation of this.state[target.name].validations) {
      if (validation.validate(target.value)) {
        error = validation.message;
        break;
      }
    }
    this.setState(prevState => ({
      [target.name]: {
        ...prevState[target.name],
        error: error
      }
    }));
  };

  validate = () => {
    let isValid = true;
    for (let inputName of this.inputs
      .filter(i => i.type === "text")
      .map(inp => inp.name)
      .reverse()) {
      let error = "";
      for (let validation of this.state[inputName].validations) {
        if (validation.validate(this.state[inputName].value)) {
          error = validation.message;
          isValid = false;
          this.state[inputName].ref.current.focus();
          break;
        }
      }
      this.setState(prevState => ({
        [inputName]: {
          ...prevState[inputName],
          error: error
        }
      }));
    }
    return isValid;
  };

  renderField = (v, name) => {
    if (this.state.isEditing && !this.state[name].static) {
      return (
        <EditInput
          key={name}
          value={v}
          name={name}
          handleInputChange={this.handleInputChange}
          handleInputBlur={this.handleInputBlur}
          setRef={this.state[name].ref}
          placeholder={""}
          error={this.state[name].error}
        >
          {v}
        </EditInput>
      );
    } else {
      return <p key={name}>{v}</p>;
    }
  };

  saveSkill = () => {
    if (!this.validate()) return;
    console.log("saving skill");

    let requestData = {
      SkillId: this.state.skill.SkillId,
      userId: localStorage.getItem("userId"),
      skillName: this.state.skillName.value || this.state.skill.Name,
      amz_SkillId: 0,
      status: "Draft",
      invocation: this.state.invocation.value || this.state.skill.Invoke,
      category: this.state.category.value || this.state.skill.Category,
      shortDescription:
        this.state.shortDesc.value || this.state.skill.ShortDesc,
      longDescription: this.state.longDesc.value || this.state.skill.LongDesk,
      keywords: this.state.keywords.value || this.state.skill.Keywords,
      template: "Alexa Interaction",
      intents: this.state.skill.Responses.map((r, i) => ({
        intent:
          "intent_" +
          toWords(i)
            .split(" ")
            .join(""),
        utterances: this.state.skill.Utterances.map((u, j) => ({
          val: this.state["utterance" + j].value,
          intentId: u.IntentId
        }))
          .filter(x => x.intentId == r.IntentId)
          .map(x => x.val),
        response: this.state["response" + i].value
      })),
      firstName: this.props.data.firstName,
      lastName: this.props.data.lastName
    };

    console.log("sending skill data: ", requestData);

    this.setState({ loaded: false });

    /* create new skill and push to db */
    request(config.local + ":5004/editskill", requestData, resp => {
      console.log(resp);
      if (resp.data && resp.data.status === "SUCCESS") {
        let updatedSkills = this.props.userData.skills;
        //this.props.history.push("/view-skills");
        updatedSkills.push(resp.data.skill);
        this.props.updateGlobalState({ userData: { skills: updatedSkills } });
        /*request(config.local + ":5004/submit", requestData, resp => {
          console.log("Skill submit response: " + resp);
          console.log(resp);
          if (resp.data && resp.data.status === "SUCCESS") {
            //this.props.history.push("/view-skills");
            console.log("SUCCESS: Skill submitted...", resp.data);
          }
        });*/
        this.requestSkill();
      } else {
        console.log("SERVER ERROR at edit skill submit");
      }
    });

    this.setState({ isEditing: false });
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
          {"Skill Details"}
          {this.state.loaded &&
            (!this.state.isEditing ? (
              <button
                className="btn btn-primary pull-right emptyBtn"
                onClick={this.editSkill}
              >
                Edit
              </button>
            ) : (
              <button
                className={"btn btn-primary pull-right emptyBtn"}
                onClick={this.saveSkill}
              >
                Save Skill
              </button>
            ))}
        </PageHeader>
        {this.state.loaded ? (
          <div>
            <div className="edit-skill-container">
              <table className="view-skill-table">
                {this.state.skill.Responses.map((r, idx) => (
                  <tbody className="view-skill-table-body">
                    {idx == 0 && (
                      <tr>
                        <th>Skill name </th>
                        <td>
                          {this.renderField(this.state.skill.Name, "skillName")}
                        </td>
                      </tr>
                    )}
                    {idx == 0 && (
                      <tr>
                        <th>Short description </th>
                        <td>
                          {this.renderField(
                            this.state.skill.ShortDesc,
                            "shortDesc"
                          )}
                        </td>
                      </tr>
                    )}
                    {idx == 0 && (
                      <tr>
                        <th>Long description </th>
                        <td>
                          {this.renderField(
                            this.state.skill.LongDesk,
                            "longDesc"
                          )}
                        </td>
                      </tr>
                    )}
                    {idx == 0 && (
                      <tr>
                        <th>Category </th>
                        <td>
                          {this.renderField(
                            this.state.skill.Category,
                            "category"
                          )}
                        </td>
                      </tr>
                    )}
                    {idx == 0 && (
                      <tr>
                        <th>{"Status "}</th>
                        <td>
                          {this.renderField(this.state.skill.Status, "status")}
                        </td>
                      </tr>
                    )}
                    {idx == 0 && (
                      <tr>
                        <th>{"Keywords "}</th>
                        <td>
                          {this.renderField(
                            this.state.skill.Keywords,
                            "keywords"
                          )}
                        </td>
                      </tr>
                    )}
                    {idx == 0 && (
                      <tr>
                        <th>{"Invocation phrase "}</th>
                        <td>
                          {this.renderField(
                            this.state.skill.Invoke,
                            "invocation"
                          )}
                        </td>
                      </tr>
                    )}
                    {idx == 0 && (
                      <tr>
                        <th>{"Creation date "}</th>
                        <td>
                          {this.renderField(
                            this.state.skill.CreationDate,
                            "creationDate"
                          )}
                        </td>
                      </tr>
                    )}
                    <tr className="table-intent">
                      <th>{"Intent " + (idx + 1)}</th>
                      <td />
                    </tr>
                    <tr>
                      <th>{"Utterances "}</th>
                      <td>
                        {this.state.skill.Utterances.filter(
                          u => u.IntentId == r.IntentId
                        ).map((x, idx) =>
                          this.renderField(x.Utter, "utterance" + idx)
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>{"Responses "}</th>
                      <td>
                        {this.state.skill.Responses.filter(
                          x => x.IntentId == r.IntentId
                        ).map((x, idx) =>
                          this.renderField(x.Resp, "response" + idx)
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
            {!this.state.isEditing ? (
              <button
                className={
                  "btn btn-primary submit-skill-btn" +
                  (this.state.submitted ? " disabled disabled-btn" : "")
                }
                onClick={this.submitSkill}
              >
                Submit to Amazon Store
              </button>
            ) : (
              <button
                className={
                  "btn btn-primary submit-skill-btn" +
                  (this.state.submitted ? " disabled disabled-btn" : "")
                }
                onClick={this.saveSkill}
              >
                Save Skill
              </button>
            )}
            {this.state.submitted && <div className="spinner-inline" />}
          </div>
        ) : (
          <div className="spinner" />
        )}
      </div>
    );
  }
}
