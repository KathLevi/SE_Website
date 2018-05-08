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
    value: "test@example.com",
    label: "Email",
    placeholder: "",
    errorMessage: "Email is required",
    optional: false
  },
  {
    name: "platform",
    type: "radio",
    value: "amazon",
    inputs: [
      { value: "amazon", label: "Amazon Alexa" },
      { value: "google", label: "Google Voice" }
    ]
  },
  {
    name: "fName",
    type: "text",
    value: "Andrew",
    label: "First name",
    placeholder: "",
    errorMessage: "Enter first name",
    optional: false
  },
  {
    name: "lName",
    type: "text",
    value: "Peacock",
    label: "Last name",
    placeholder: "",
    errorMessage: "Enter last name",
    optional: false
  },
  {
    name: "skillName",
    type: "text",
    value: "MySkill2",
    label: "Skill name",
    placeholder: "",
    errorMessage: "Provide a name for your skill",
    optional: false
  },
  {
    name: "invocation",
    type: "text",
    value: "invocation phrase",
    label: "Invocation phrase",
    placeholder: "",
    errorMessage: "Provide an invocation phrase",
    optional: false
  },
  {
    name: "utterance1",
    type: "text",
    value: "sample utterance",
    label: "Utterances",
    placeholder: "",
    errorMessage: "Provide at least one utterance",
    optional: false
  },
  {
    name: "utterance2",
    type: "text",
    value: "",
    label: "",
    placeholder: "",
    errorMessage: "Invalid field",
    optional: true
  },
  {
    name: "utterance3",
    type: "text",
    value: "",
    label: "",
    placeholder: "",
    errorMessage: "Invalid field",
    optional: true
  },
  {
    name: "utterance4",
    type: "text",
    value: "",
    label: "",
    placeholder: "",
    errorMessage: "Invalid field",
    optional: true
  },
  {
    name: "utterance5",
    type: "text",
    value: "",
    label: "",
    placeholder: "",
    errorMessage: "Invalid field",
    optional: true
  },
  {
    name: "response",
    type: "text",
    value: "response",
    label: "Response",
    placeholder: "",
    errorMessage: "Provide a response",
    optional: false
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
    value: "short desc 1",
    label: "Short description",
    placeholder: "",
    errorMessage: "Provide a short description",
    optional: false
  },
  {
    name: "skillDescLong",
    type: "text",
    value: "long desc 1",
    label: "Long description",
    placeholder: "",
    errorMessage: "Provide a long description",
    optional: true
  },
  {
    name: "keywords",
    type: "text",
    value: "keywords",
    label: "Keywords",
    placeholder: "",
    errorMessage: "Invalid field",
    optional: true
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
    let data = {
      email: this.state.email.value,
      template: "Alexa Interaction",
      firstName: this.state.fName.value,
      lastName: this.state.lName.value,
      skillName: this.state.skillName.value,
      invocationName: this.state.invocation.value,
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
      category: this.state.category.value,
      shortDescription: this.state.skillDescShort.value,
      longDescription: this.state.skillDescLong.value,
      keywords: this.state.keywords.value.split(",").map(k => {
        return k.trim();
      })
    };

    console.log(data);

    /*request("http://127.0.0.1:5001/post", data, resp => {
      this.setState({ modalMessage: String(resp) });
      this.showModal(resp);
      console.log(resp);
    });*/

    let requestData = {
      userId: localStorage.getItem("userId"),
      skillName: data.skillName,
      amz_SkillId: 0,
      status: "In development",
      invocationName: data.invocationName,
      category: data.category,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      keywords: data.keywords,
      template: data.template,
      intents: data.intents,
      firstName: data.firstName,
      lastName: data.lastName
    };

    request("http://127.0.0.1:5004/newskill", requestData, resp => {
      console.log(resp);
      if (resp.data && resp.data.status === "SUCCESS") {
        let updatedSkills = this.props.userData.skills;
        updatedSkills.push(resp.data.skill);
        this.props.updateGlobalState({ userData: { skills: updatedSkills } });
        requestData.SkillId = resp.data.SkillId;
        console.log(requestData);
        request("http://127.0.0.1:5004/submit", requestData, resp => {
          console.log("Skill submit response: " + resp);
          console.log(resp);
          if (resp.data && resp.data.status === "SUCCESS") {
            this.props.history.push("/view-skills");
          }
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
          submitForm={this.submitForm}
          label={"Simple Interaction Form"}
          updateParentState={this.updateStateFromChild}
          inputs={inputs}
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
