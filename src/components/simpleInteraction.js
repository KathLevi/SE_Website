import React from "react";
import config from "../config.js";
import Form from "./form";
import ResponseModal from "./modules/responseModal";
import Input from "./modules/input";
import Select from "./modules/select";
import { request } from "../helpers/requests.js";
import { categoryOptions } from "../constants/selectFieldOptions.js";
import { toWords } from "number-to-words";

// input fields
const inputs = [
  {
    name: "skillName",
    type: "text",
    label: "Skill name",
    placeholder: "",
    validations: [
      {
        message: "Please provide a name for your skill",
        validate: i => i === ""
      }
    ]
  },
  {
    name: "invocation",
    type: "text",
    label: "Invocation phrase",
    placeholder: "",
    validations: [
      { message: "Provide an invocation phrase", validate: i => i === "" }
    ]
  },
  {
    name: "intentGroup",
    type: "intentGroup",
    label: "intents",
    placeholder: "",
    validations: []
  },
  {
    name: "category",
    type: "select",
    value: "Business & Finance",
    label: "Category",
    options: categoryOptions
  },
  {
    name: "skillDescShort",
    type: "text",
    label: "Short description",
    placeholder: "",
    validations: [
      { message: "Provide a short description", validate: i => i === "" }
    ]
  },
  {
    name: "skillDescLong",
    type: "text",
    label: "Long description",
    placeholder: "",
    validations: [
      { message: "Provide a long description", validate: i => i === "" }
    ]
  },
  {
    name: "keywords",
    type: "text",
    label: "Keywords",
    placeholder: ""
  }
];

class SimpleInteraction extends React.Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
      modalMessage: ""
    };
  }

  componentDidMount = () => {
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

  updateStateFromChild = state => {
    this.setState({ ...state });
  };

  submitForm = e => {
    if (!this.props.data) {
      return;
    }

    let keywords = this.state.keywords.value
      .split(",")
      .map(k => {
        return k.trim();
      })
      .join(", ");

    let requestData = {
      userId: localStorage.getItem("userId"),
      skillName: this.state.skillName.value,
      amz_SkillId: 0,
      status: "Draft",
      invocationName: this.state.invocation.value,
      category: this.state.category.value,
      shortDescription: this.state.skillDescShort.value,
      longDescription: this.state.skillDescLong.value,
      keywords: keywords,
      template: "Alexa Interaction",
      intents: [...Array(this.state.intentNum).keys()].map(i => ({
        intent:
          "intent_" +
          toWords(i)
            .split(" ")
            .join(""),
        utterances: [...Array(this.state["utterance" + i + "Num"]).keys()]
          .map(j => this.state["utterance" + j + "_" + i].value)
          .filter(x => x),
        response: this.state["response" + i].value
      })),
      firstName: this.props.data.firstName,
      lastName: this.props.data.lastName
    };

    console.log("sending skill data: ", requestData);

    /* create new skill and push to db */
    request(config.local + ":5004/newskill", requestData, resp => {
      console.log(resp);
      if (resp.data && resp.data.status === "SUCCESS") {
        let updatedSkills = this.props.userData.skills;
        //this.props.history.push("/view-skills");
        updatedSkills.push(resp.data.skill);
        this.props.updateGlobalState({ userData: { skills: updatedSkills } });
        requestData.SkillId = resp.data.SkillId;
        console.log(requestData);
        /*request(config.local + ":5004/submit", requestData, resp => {
          console.log("Skill submit response: " + resp);
          console.log(resp);
          if (resp.data && resp.data.status === "SUCCESS") {
            //this.props.history.push("/view-skills");
            console.log("SUCCESS: Skill submitted...", resp.data);
          }
        });*/
      } else {
        this.setState({
          showModal: true,
          modalMessage: "Server error: Please wait a few minutes and try again"
        });
      }
    });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className="page-container">
        <Form
          editForm={this.props.saveSkill}
          submitForm={this.submitForm}
          label={this.props.title || "Simple Interaction Form"}
          updateParentState={this.updateStateFromChild}
          inputs={inputs}
          submitButtonLabel={"Save skill"}
        />

        <ResponseModal
          show={this.state.showModal}
          closeModal={this.closeModal}
          message={this.state.modalMessage}
        />
      </div>
    );
  }
}

export default SimpleInteraction;
