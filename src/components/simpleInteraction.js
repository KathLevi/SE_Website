import React from "react";
import ResponseModal from "./modules/responseModal";
import Input from "./modules/input";
import { request } from "../helpers/requests.js";
import classNames from "classnames";

class SimpleInteraction extends React.Component {
  constructor() {
    super();
    this.state = {
      platform: "amazon",
      email: "",
      fName: "",
      lName: "",
      template: "Alexa Interaction",
      skillName: "",
      invocation: "",
      utterance1: "",
      utterance2: "",
      utterance3: "",
      utterance4: "",
      utterance5: "",
      response: "",
      category: "Business & Finance",
      skillDescShort: "",
      skillDescLong: "",
      keywords: "",
      showModal: false,
      modalMessage: ""
    };
  }

  handleInputChange = event => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  };

  handleInputBlur = event => {
    const target = event.target;
    this.setState({
      [target.name + "Error"]: this.state[target.name] === "" ? "EMPTY" : ""
    });
  };

  submitForm = e => {
    e.preventDefault();

    let data = {
      email: this.state.email,
      template: "Alexa Interaction",
      firstName: this.state.fName,
      lastName: this.state.lName,
      skillName: this.state.skillName,
      invocationName: this.state.invocation,
      intents: [
        {
          intent: "intent",
          utterances: {
            "1": this.state.utterance1,
            "2": this.state.utterance2,
            "3": this.state.utterance3,
            "4": this.state.utterance4,
            "5": this.state.utterance5,
            "6": ""
          },
          response: this.state.response
        }
      ],
      category: this.state.category,
      shortDescription: this.state.skillDescShort,
      longDescription: this.state.skillDescLong,
      keywords: this.state.keywords.split(",").map(k => {
        return k.trim();
      })
    };

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
      <div className="container form-container">
        <h1 className="page-header">Create Simple Interaction Skill</h1>
        <form onSubmit={this.submitForm}>
          <Input
            label="Email address"
            name="email"
            placeholder="Email address"
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.handleInputBlur}
            error={this.state.emailError}
            errorMessage={"Email is required"}
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
            label="First name"
            name="fName"
            placeholder="e.g. John"
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.handleInputBlur}
            error={this.state.fNameError}
            errorMessage={"First name is required"}
          />
          <Input
            label="Last name"
            name="lName"
            placeholder="e.g. Smith"
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.handleInputBlur}
            error={this.state.lNameError}
            errorMessage={"Last name is required"}
          />

          <Input
            label="What name do you want to appear in the Alexa skill store?"
            name="skillName"
            placeholder="e.g. MySkill"
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.handleInputBlur}
            error={this.state.skillNameError}
            errorMessage={"Skill name is required"}
          />

          <Input
            label="What phrases will trigger your skill?"
            name="invocation"
            placeholder="e.g. Start MySkill"
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.handleInputBlur}
            error={this.state.invocationError}
            errorMessage={"Invocation is required"}
          />

          <Input
            label="What phrases will trigger your skill?"
            name="invocation"
            placeholder="e.g. Start MySkill"
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.handleInputBlur}
            error={this.state.invocationError}
            errorMessage={"Invocation is required"}
          />

          <Input
            label="What should people say to your skill?"
            name="utterance1"
            placeholder="e.g. Say &quot;Hello world!&quot;"
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.handleInputBlur}
            error={this.state.utterance1Error}
            errorMessage={"Please provide at least one phrase"}
            classes={"negative-margin-btm"}
          />

          <Input
            label=""
            name="utterance2"
            placeholder="e.g. How do you greet the Earth each morning?"
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.handleInputBlur}
            error={""}
            errorMessage={""}
            classes={"negative-margin-btm"}
          />

          <Input
            label=""
            name="utterance3"
            placeholder="e.g. What did the moon say back to its planet?"
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.handleInputBlur}
            error={""}
            errorMessage={""}
            classes={"negative-margin-btm"}
          />

          <Input
            label=""
            name="utterance4"
            placeholder="e.g. Say &quot;Bonjour le monde!&quot; in English"
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.handleInputBlur}
            error={""}
            errorMessage={""}
            classes={"negative-margin-btm"}
          />

          <Input
            label=""
            name="utterance5"
            placeholder="What is &quot;dlrow olleh&quot; backwards?"
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.handleInputBlur}
            error={""}
            errorMessage={""}
          />

          <Input
            label="What will your skill say back?"
            name="response"
            placeholder="e.g. Hello world!"
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.handleInputBlur}
            error={this.state.responseError}
            errorMessage={"Response message is required"}
          />

          <div className={"form-group"}>
            <label className="lblBig">
              What category will your application show up as on the store?
            </label>
            <select
              className="form-control"
              name="category"
              onChange={this.handleInputChange}
            >
              <option value="Business & Finance">Business and Finance</option>
              <option value="Connected Car">Connected Car</option>
              <option value="Education and Refference">
                Education and Refference
              </option>
              <option value="Food & Drink">Food and Drink</option>
              <option value="Games, Trivia & Accessories">
                Games, Trivia, and Accessories
              </option>
              <option value="Health & Fitness">Health and Fitness</option>
              <option value="Kids">Kids</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Local">Local</option>
              <option value="Movies & TV">Movies and TV</option>
              <option value="Music & Audio">Music and Audio</option>
              <option value="News">News</option>
              <option value="Novelty & Humor">Novelty and Humor</option>
              <option value="Productivity">Productivity</option>
              <option value="Shopping">Shopping</option>
              <option value="Smart Home">Smart Home</option>
              <option value="Social">Social</option>
              <option value="Sports">Sports</option>
              <option value="Travel & Transportation">
                Travel and Transportation
              </option>
              <option value="Utilities">Utilities</option>
            </select>
          </div>

          <Input
            label="Give a few words describing your skill"
            name="skillDescShort"
            placeholder=""
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.handleInputBlur}
            error={this.state.skillDescShortError}
            errorMessage={"Please give a brief summary"}
          />

          <Input
            label="Give a brief description for your skill  (optional)"
            name="skillDescLong"
            placeholder=""
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.handleInputBlur}
            error={""}
            errorMessage={""}
          />

          <Input
            label="What keywords should your skill have? (optional)"
            name="keywords"
            placeholder=""
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.handleInputBlur}
            error={""}
            errorMessage={""}
          />

          <button className="btn btn-primary form-submit" type="submit">
            Submit
          </button>
        </form>
        {/* Server response modal */}

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
