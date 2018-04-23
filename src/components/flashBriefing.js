import React from "react";
import { request } from "../helpers/requests.js";
import ResponseModal from "./modules/responseModal";
import Input from "./modules/input";
import Form from "./form";

class FlashBriefing extends React.Component {
  constructor() {
    super();
    this.inputs = {
      platform: { value: "amazon", optional: false },
      email: { value: "", optional: false },
      fName: { value: "", optional: false },
      lName: { value: "", optional: false },
      skillName: { value: "", optional: false },
      category: { value: "Business & Finance", optional: false },
      skillDescShort: { value: "", optional: false },
      skillDescLong: { value: "", optional: true },
      keywords: { value: "", optional: true },
      feedName: { value: "", optional: false },
      preamble: { value: "", optional: false },
      updateFrequency: { value: "Hourly", optional: false },
      contentGenre: { value: "Headline News", optional: false },
      feedURL: { value: "", optional: false }
    };
    this.state = {
      ...this.inputs
    };
    for (let attr of Object.keys(this.inputs)) {
      this.state[attr].error = "";
      this.state[attr].ref = React.createRef();
      this.state[attr].props = {
        name: attr,
        handleInputChange: this.handleInputChange,
        handleInputBlur: this.handleInputBlur,
        setRef: this.state[attr].ref
      };
    }
    this.state = {
      ...this.state,
      showModal: false,
      modalMessage: ""
    };
  }

  componentDidMount = () => {
    this.state.email.ref.current.focus();
  };

  handleInputChange = event => {
    const target = event.target;
    this.setState(prevState => ({
      [target.name]: {
        ...prevState[target.name],
        value: target.value
      }
    }));
  };

  handleInputBlur = event => {
    const target = event.target;
    this.setState(prevState => ({
      [target.name]: {
        ...prevState[target.name],
        error: prevState[target.name].value === "" ? "EMPTY" : ""
      }
    }));
  };

  validate = () => {
    let isValid = true;
    for (let input of Object.keys(this.inputs).reverse()) {
      if (!this.state[input].optional && !this.state[input].value) {
        this.setState(prevState => ({
          [input]: {
            ...prevState[input],
            error: "EMPTY"
          }
        }));
        isValid = false;
        this.state[input].ref.current.focus();
      }
    }
    return isValid;
  };

  submitForm = e => {
    e.preventDefault();

    if (!this.validate()) return;

    let data = {
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
      <div>
        <Form submitForm={this.submitForm} label={"Flash Briefing Form"}>
          <Input
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

          <h3 className="page-header">Feed 1</h3>

          <Input
            {...this.state.feedName.props}
            label="Feed name"
            placeholder="e.g. MyFeed"
            error={this.state.feedNameError}
            errorMessage={"Feed name is required"}
          />

          <Input
            {...this.state.preamble.props}
            label="Feed preamble"
            placeholder=""
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
            {...this.state.feedURL.props}
            label="Feed URL"
            placeholder=""
            error={this.state.feedURLError}
            errorMessage={"Please provide the feed URL"}
          />
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

export default FlashBriefing;
