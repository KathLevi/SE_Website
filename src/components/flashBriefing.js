import React from "react";
import { request } from "../helpers/requests.js";
import ResponseModal from "./modules/responseModal";
import {
  categoryOptions,
  updateFrequencies,
  contentGenres
} from "../constants/selectFieldOptions.js";
import Input from "./modules/input";
import Form from "./form";

const inputs = [
  {
    name: "email",
    type: "text",
    value: "",
    label: "Email",
    placeholder: "",
    validations: [{ message: "Field is required", validate: i => i === "" }]
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
    value: "",
    label: "First name",
    placeholder: "",
    validations: [{ message: "Field is required", validate: i => i === "" }]
  },
  {
    name: "lName",
    type: "text",
    value: "",
    label: "Last name",
    placeholder: "",
    validations: [{ message: "Enter first name", validate: i => i === "" }]
  },
  {
    name: "skillName",
    type: "text",
    value: "",
    label: "Skill name",
    placeholder: "",
    validations: [{ message: "Field is required", validate: i => i === "" }]
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
    value: "",
    label: "Short description",
    placeholder: "",
    validations: [{ message: "Field is required", validate: i => i === "" }]
  },
  {
    name: "skillDescLong",
    type: "text",
    value: "",
    label: "Long description",
    placeholder: "",
    validations: [{ message: "Field is required", validate: i => i === "" }]
  },
  {
    name: "keywords",
    type: "text",
    value: "",
    label: "Keywords",
    placeholder: "",
    validations: [{ message: "Field is required", validate: i => i === "" }]
  },
  {
    name: "feedName",
    type: "text",
    value: "",
    label: "Feed name",
    placeholder: "",
    validations: [{ message: "Field is required", validate: i => i === "" }]
  },
  {
    name: "preamble",
    type: "text",
    value: "",
    label: "Preamble",
    placeholder: "",
    validations: [{ message: "Field is required", validate: i => i === "" }]
  },
  {
    name: "updateFrequency",
    type: "select",
    value: "",
    label: "Update frequency",
    options: updateFrequencies
  },
  {
    name: "contentGenre",
    type: "select",
    value: "Headline News",
    label: "Content genre",
    options: contentGenres
  },
  {
    name: "feedURL",
    type: "text",
    value: "",
    label: "Feed URL",
    placeholder: "",
    validations: [{ message: "Field is required", validate: i => i === "" }]
  }
];

class FlashBriefing extends React.Component {
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
      userId: localStorage.getItem("userId"),
      email: this.state.email.value,
      template: "Alexa Flash Briefing",
      firstName: this.state.fName.value,
      lastName: this.state.lName.value,
      skillName: this.state.skillName.value,
      category: this.state.category.value,
      shortDescription: this.state.skillDescShort.value,
      longDescription: this.state.skillDescLong.value,
      keywords: this.state.keywords.value.split(",").map(k => {
        return k.trim();
      }),
      feedName: this.state.feedName.value,
      preamble: this.state.preamble.value,
      updateFrequency: this.state.updateFrequency.value,
      contentGenre: this.state.contentGenre.value,
      feedURL: this.state.feedURL.value
    };

    console.log(data);

    /*request("http://127.0.0.1:5003/post", data, resp => {
      this.setState({ modalMessage: String(resp) });
      this.showModal(resp);
    });*/

    request(
      "http://127.0.0.1:5004/newskill",
      {
        userId: localStorage.getItem("userId"),
        skillName: data.skillName,
        amz_SkillId: 0,
        status: "In development",
        category: data.category,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        keywords: data.keywords,
        template: data.template,
        feeds: [
          {
            name: data.feedName,
            preamble: data.preamble,
            updateFrequency: data.updateFrequency,
            genre: data.genre,
            url: data.feedURL
          }
        ]
      },
      resp => {
        console.log("flash briefing skill submit response", resp);
      }
    );
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
          label={"Flash Briefing Form"}
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

export default FlashBriefing;
