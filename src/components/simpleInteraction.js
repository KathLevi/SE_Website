import React from "react";
import axios from "axios";
import ResponseModal from "./modules/responseModal";
import { request } from "../helpers/requests.js";

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

  submitForm = e => {
    e.preventDefault();

    let data = {
      email: this.state.email,
      template: "Alexa Interaction",
      firstName: this.state.fName,
      lastName: this.state.lName,
      template: this.state.template,
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
      <div className="container">
        <h1 className="page-header">Create Simple Interaction Skill</h1>
        <form onSubmit={this.submitForm}>
          <div className="form-group">
            {" "}
            <label htmlFor="exampleInputEmail1">Email address</label>{" "}
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Email"
            />{" "}
          </div>
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
          <div className="form-group">
            <label>First Name</label>
            <input
              className="form-control"
              type="text"
              name="fName"
              placeholder="e.g. John"
              onChange={this.handleInputChange}
            />
            <label>Last Name</label>
            <input
              className="form-control"
              type="text"
              name="lName"
              placeholder="e.g. Smith"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="lblBig">Verification Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              placeholder="e.g. you@example.com"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="lblBig">
              What is the name you want to appear in the Amazon or Google store?
            </label>
            <input
              className="form-control"
              type="text"
              name="skillName"
              placeholder="e.g. Apple Color Finder"
              onChange={this.handleInputChange}
            />
          </div>
          <label className="lblBig">
            What do you want people to say to invoke or start your MetaVoice
            application?
          </label>
          <input
            className="form-control"
            type="text"
            name="invocation"
            placeholder="e.g. Apple Color Finder"
            onChange={this.handleInputChange}
          />
          <label className="lblBig">
            What should people ask or say to your voice application?
          </label>
          <input
            className="form-control"
            type="text"
            name="utterance1"
            placeholder="e.g. What color are apples?"
            onChange={this.handleInputChange}
          />
          <input
            className="form-control"
            type="text"
            name="utterance2"
            placeholder="e.g. Apples are what color?"
            onChange={this.handleInputChange}
          />
          <input
            className="form-control"
            type="text"
            name="utterance3"
            placeholder="e.g. Apple colors"
            onChange={this.handleInputChange}
          />
          <input
            className="form-control"
            type="text"
            name="utterance4"
            placeholder="e.g. Are apples red?"
            onChange={this.handleInputChange}
          />
          <input
            className="form-control"
            type="text"
            name="utterance5"
            placeholder="e.g. Are apples green?"
            onChange={this.handleInputChange}
          />
          <label className="lblBig">
            What will your voice application say back?
          </label>
          <input
            className="form-control"
            type="text"
            name="response"
            placeholder="e.g. Apples are red."
            onChange={this.handleInputChange}
          />

          <label className="lblBig">
            What category will your MetaVoice application show up as on the
            store?
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
          <label className="lblBig">
            Enter descriptions of your MetaVoice application
          </label>
          <input
            className="form-control"
            type="text"
            name="skillDescShort"
            placeholder="e.g. Enter a short description of your skill, the one liner"
            onChange={this.handleInputChange}
          />
          <input
            className="form-control"
            type="text"
            name="skillDescLong"
            placeholder="e.g. Enter the full description of your skill"
            onChange={this.handleInputChange}
          />
          <label className="lblBig">
            What keywords do you want your MetaVoice application to have?
          </label>
          <input
            className="form-control"
            type="text"
            name="keywords"
            placeholder="e.g. Enter keywords for your skill separated by commas"
            onChange={this.handleInputChange}
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
