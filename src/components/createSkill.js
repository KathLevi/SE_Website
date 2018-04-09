import React from "react";
import axios from "axios";

class CreateSkill extends React.Component {
  constructor() {
    super();
    this.state = {
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
      category: "",
      skillDescShort: "",
      skillDescLong: "",
      keywords: ""
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

    axios
      .post("http://127.0.0.1:5001/post", {
        ...data
      })
      .then(function(response) {
        alert("Request sent");
      })
      .catch(function(error) {
        alert("Error");
      });
  };

  render() {
    return (
      <div>
        <h1 className="pageHeader">Create Skill</h1>
        <div className="newSkillForm">
          <form onSubmit={this.submitForm}>
            <input
              type="radio"
              name="platform"
              value="amazon"
              checked="true"
              onChange={this.handleInputChange}
            />
            {" Amazon Alexa"}
            <br />
            <input
              type="radio"
              name="platform"
              value="google"
              onChange={this.handleInputChange}
            />
            {" Google Voice"}
            <br />

            <h3 className="lblBig">First Name</h3>
            <input
              type="text"
              name="fName"
              placeholder="e.g. John"
              onChange={this.handleInputChange}
            />
            <h3 className="lblBig">Last Name</h3>
            <input
              type="text"
              name="lName"
              placeholder="e.g. Smith"
              onChange={this.handleInputChange}
            />
            <h3 className="lblBig">Verification Email</h3>
            <input
              type="text"
              name="email"
              placeholder="e.g. you@example.com"
              onChange={this.handleInputChange}
            />

            <h3 className="lblBig">
              What is the name you want to appear in the Amazon or Google store?
            </h3>
            <input
              type="text"
              name="skillName"
              placeholder="e.g. Apple Color Finder"
              onChange={this.handleInputChange}
            />
            <h6 className="lblSmall">MetaVoice Application Name</h6>
            <h3 className="lblBig">
              What do you want people to say to invoke or start your MetaVoice
              application?
            </h3>
            <input
              type="text"
              name="invocation"
              placeholder="e.g. Apple Color Finder"
              onChange={this.handleInputChange}
            />
            <h6 className="lblSmall">Invocation Name</h6>
            <h3 className="lblBig">
              What should people ask or say to your voice application?
            </h3>
            <input
              type="text"
              name="utterance1"
              placeholder="e.g. What color are apples?"
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="utterance2"
              placeholder="e.g. Apples are what color?"
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="utterance3"
              placeholder="e.g. Apple colors"
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="utterance4"
              placeholder="e.g. Are apples red?"
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="utterance5"
              placeholder="e.g. Are apples green?"
              onChange={this.handleInputChange}
            />
            <h6 className="lblSmall">Utterances</h6>
            <h3 className="lblBig">
              What will your voice application say back?
            </h3>
            <input
              type="text"
              name="response"
              placeholder="e.g. Apples are red."
              onChange={this.handleInputChange}
            />
            <h6 className="lblSmall">Responses</h6>

            <h3 className="lblBig">
              What category will your MetaVoice application show up as on the
              store?
            </h3>
            <select name="category" onChange={this.handleInputChange}>
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
            <h3 className="lblBig">
              Enter descriptions of your MetaVoice application
            </h3>
            <input
              type="text"
              name="skillDescShort"
              placeholder="e.g. Enter a short description of your skill, the one liner"
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="skillDescLong"
              placeholder="e.g. Enter the full description of your skill"
              onChange={this.handleInputChange}
            />
            <h3 className="lblBig">
              What keywords do you want your MetaVoice application to have?
            </h3>
            <input
              type="text"
              name="keywords"
              placeholder="e.g. Enter keywords for your skill separated by commas"
              onChange={this.handleInputChange}
            />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateSkill;
