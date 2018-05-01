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
    value: "",
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
    value: "",
    label: "First name",
    placeholder: "",
    errorMessage: "Enter first name",
    optional: false
  },
  {
    name: "lName",
    type: "text",
    value: "",
    label: "Last name",
    placeholder: "",
    errorMessage: "Enter last name",
    optional: false
  },
  {
    name: "skillName",
    type: "text",
    value: "",
    label: "Skill name",
    placeholder: "",
    errorMessage: "Provide a name for your skill",
    optional: false
  },
  {
    name: "invocation",
    type: "text",
    value: "",
    label: "Invocation phrase",
    placeholder: "",
    errorMessage: "Provide an invocation phrase",
    optional: false
  },
  {
    name: "utterance1",
    type: "text",
    value: "",
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
    value: "",
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
    value: "",
    label: "Short description",
    placeholder: "",
    errorMessage: "Provide a short description",
    optional: false
  },
  {
    name: "skillDescLong",
    type: "text",
    value: "",
    label: "Long description",
    placeholder: "",
    errorMessage: "Provide a long description",
    optional: true
  },
  {
    name: "keywords",
    type: "text",
    value: "",
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
      ...this.state,
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

    request("http://127.0.0.1:5001/post", data, resp => {
      this.setState({ modalMessage: String(resp) });
      this.showModal(resp);
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
      <div>
        <Form
          submitForm={this.submitForm}
          label={"Simple Interaction Form"}
          updateParentState={this.updateStateFromChild}
          inputs={inputs}
        >
          {/*}<Input
            {...this.state.email.props}
            label="Email address"
            placeholder="Email address"
            error={this.state.email.error}
            errorMessage="Email is required"
          />

          <div className="form-group">
            <div className="radio">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  name="platform"
                  value="amazon"
                  checked={this.state.platform === "amazon"}
                  onChange={this.handleInputChange}
                />
                Amazon Alexa
              </label>
            </div>
            <div className="radio">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  name="platform"
                  value="google"
                  checked={this.state.platform === "google"}
                  onChange={this.handleInputChange}
                />
                Google Voice
              </label>
            </div>
          </div>

          <Input
            {...this.state.fName.props}
            label="First name"
            placeholder="e.g. John"
            error={this.state.fName.error}
            errorMessage={"First name is required"}
          />

          <Input
            {...this.state.lName.props}
            label="Last name"
            placeholder="e.g. Smith"
            error={this.state.lName.error}
            errorMessage={"Last name is required"}
          />

          <Input
            {...this.state.skillName.props}
            label="What name do you want to appear in the Alexa skill store?"
            placeholder="e.g. MySkill"
            error={this.state.skillName.error}
            errorMessage={"Skill name is required"}
          />

          <Input
            {...this.state.invocation.props}
            label="What phrases will trigger your skill?"
            placeholder="e.g. Start MySkill"
            error={this.state.invocation.error}
            errorMessage={"Invocation is required"}
          />

          <Input
            {...this.state.utterance1.props}
            label="What should people say to your skill?"
            placeholder="e.g. Say &quot;Hello world!&quot;"
            error={this.state.utterance1.error}
            errorMessage={"Please provide at least one phrase"}
            classes={"negative-margin-btm"}
          />

          <Input
            {...this.state.utterance2.props}
            label=""
            placeholder="e.g. How do you greet the Earth each morning?"
            error={""}
            errorMessage={""}
            classes={"negative-margin-btm"}
          />

          <Input
            {...this.state.utterance3.props}
            label=""
            placeholder="e.g. What did the moon say back to its planet?"
            error={""}
            errorMessage={""}
            classes={"negative-margin-btm"}
          />

          <Input
            {...this.state.utterance4.props}
            label=""
            placeholder="e.g. Say &quot;Bonjour le monde!&quot; in English"
            error={""}
            errorMessage={""}
            classes={"negative-margin-btm"}
          />

          <Input
            {...this.state.utterance5.props}
            label=""
            placeholder="What is &quot;dlrow olleh&quot; backwards?"
            error={""}
            errorMessage={""}
          />

          <Input
            {...this.state.response.props}
            label="What will your skill say back?"
            placeholder="e.g. Hello world!"
            error={this.state.response.error}
            errorMessage={"Response message is required"}
          />

          <Select
            label="Select a category for your app"
            name="category"
            handleInputChange={this.handleInputChange}
            options={categoryOptions}
          />

          <Input
            {...this.state.skillDescShort.props}
            label="Give a few words describing your skill"
            placeholder=""
            error={this.state.skillDescShort.error}
            errorMessage={"Please give a brief summary"}
          />

          <Input
            {...this.state.skillDescLong.props}
            label="Give a brief description for your skill  (optional)"
            placeholder=""
            error={""}
            errorMessage={""}
          />

          <Input
            {...this.state.keywords.props}
            label="What keywords should your skill have? (optional)"
            placeholder=""
            error={""}
            errorMessage={""}
          />
          */}
        </Form>

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
