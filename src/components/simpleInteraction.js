import React from "react";
import Form from "./form";
import ResponseModal from "./modules/responseModal";
import Input from "./modules/input";
import Select from "./modules/select";
import { request } from "../helpers/requests.js";
import { categoryOptions } from "../constants/selectFieldOptions.js";

// input fields
const inputs = [
  {
    name: "email",
    type: "text",
    label: "Email",
    placeholder: "",
    validations: [
      { message: "Email is required", validate: i => i === "" },
      {
        message: "Email must be valid",
        validate: i => {
          var re = /\S+@\S+\.\S+/;
          return !re.test(i);
        }
      }
    ]
  },
  {
    name: "platform",
    type: "radio",
    inputs: [
      { value: "amazon", label: "Amazon Alexa" },
      { value: "google", label: "Google Voice" }
    ]
  },
  {
    name: "fName",
    type: "text",
    label: "First name",
    placeholder: "",
    validations: [{ message: "Enter first name", validate: i => i === "" }]
  },
  {
    name: "lName",
    type: "text",
    label: "Last name",
    placeholder: "",
    validations: [{ message: "Enter last name", validate: i => i === "" }]
  },
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
    name: "utterance1",
    type: "text",
    label: "Utterances",
    placeholder: "",
    validations: [
      { message: "Provide at least one utterance", validate: i => i === "" }
    ]
  },
  {
    name: "utterance2",
    type: "text",
    label: "",
    placeholder: ""
  },
  {
    name: "utterance3",
    type: "text",
    label: "",
    placeholder: ""
  },
  {
    name: "utterance4",
    type: "text",
    label: "",
    placeholder: ""
  },
  {
    name: "utterance5",
    type: "text",
    label: "",
    placeholder: ""
  },
  {
    name: "response",
    type: "text",
    label: "Response",
    placeholder: "",
    validations: [{ message: "Response is required", validate: i => i === "" }]
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

  updateStateFromChild = state => {
    this.setState({ ...state });
  };

  submitForm = e => {
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
      intents: [
        {
          intent: "intent",
          utterances: {
            "1": this.state.utterance1.value,
            "2": this.state.utterance2.value,
            "3": this.state.utterance3.value,
            "4": this.state.utterance4.value,
            "5": this.state.utterance5.value,
            "6": ""
          },
          response: this.state.response.value
        }
      ],
      firstName: this.state.fName.value,
      lastName: this.state.lName.value
    };

    console.log("sending skill data: ", requestData);

    /* create new skill and push to db */
    request("http://127.0.0.1:5004/newskill", requestData, resp => {
      console.log(resp);
      if (resp.data && resp.data.status === "SUCCESS") {
        let updatedSkills = this.props.userData.skills;
        //this.props.history.push("/view-skills");
        updatedSkills.push(resp.data.skill);
        this.props.updateGlobalState({ userData: { skills: updatedSkills } });
        requestData.SkillId = resp.data.SkillId;
        console.log(requestData);
        /*request("http://127.0.0.1:5004/submit", requestData, resp => {
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
