import React from "react";
import { request } from "../helpers/requests.js";
import ResponseModal from "./modules/responseModal";
import Input from "./modules/input";

class FlashBriefing extends React.Component {
  constructor() {
    super();
    this.state = {
      platform: "amazon",
      email: "",
      fName: "",
      lName: "",
      skillName: "",
      category: "Business & Finance",
      skillDescShort: "",
      skillDescLong: "",
      keywords: "",
      feedName: "",
      preamble: "",
      updateFrequency: "Hourly",
      contentGenre: "Headline News",
      feedURL: "",
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
      template: "Alexa Flash Briefing",
      firstName: this.state.fName,
      lastName: this.state.lName,
      skillName: this.state.skillName,
      category: this.state.category,
      shortDescription: this.state.skillDescShort,
      longDescription: this.state.skillDescLong,
      keywords: this.state.keywords.split(",").map(k => {
        return k.trim();
      }),
      feedName: this.state.feedName,
      preamble: this.state.preamble,
      updateFrequency: this.state.updateFrequency,
      contentGenre: this.state.contentGenre,
      feedURL: this.state.feedURL
    };

    request("http://127.0.0.1:5003/post", data, resp => {
      this.setState({ modalMessage: String(resp) });
      this.showModal();
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
        <h1 className="page-header">Create Flash Briefing Skill</h1>
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

          <h3 className="page-header">Feed 1</h3>

          <Input
            label="Feed name"
            name="feedName"
            placeholder="e.g. MyFeed"
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.handleInputBlur}
            error={this.state.feedNameError}
            errorMessage={"Feed name is required"}
          />

          <Input
            label="Feed preamble"
            name="preamble"
            placeholder=""
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.handleInputBlur}
            error={this.state.preambleError}
            errorMessage={"Preamble is required"}
          />

          <div className="form-group">
            <label>Update Frequency</label>
            <select
              className="form-control"
              name="updateFrequency"
              onChange={this.handleInputChange}
            >
              <option value="Hourly">Hourly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <div className="form-group">
            <label>Content Genre</label>
            <select
              className="form-control"
              name="contentGenre"
              onChange={this.handleInputChange}
            >
              <option value="Headline News">Headline News</option>
              <option value="Business">Business</option>
              <option value="Politics">Politics</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Technology">Technology</option>
              <option value="Humor">Humor</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Health and Fitness">Health and Fitness</option>
              <option value="Arts and Culture">Arts and Culture</option>
              <option value="Productivity and Utilities">
                Productivity and Utilities
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          <Input
            label="Feed URL"
            name="feedURL"
            placeholder=""
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.handleInputBlur}
            error={this.state.feedURLError}
            errorMessage={"Please provide the feed URL"}
          />

          <button className="btn btn-primary form-submit" type="submit">
            Submit
          </button>
        </form>
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
