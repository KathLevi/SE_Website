import React from "react";

const CreateSkill = () => (
  <div>
    <h1 className="pageHeader">Create Skill</h1>
    <div className="newSkillForm">
      <form>
        <input type="radio" name="platform" value="amazon" />
        {" Amazon Alexa"}
        <br />
        <input type="radio" name="platform" value="google" />
        {" Google Voice"}
        <br />

        <h3 className="lblBig">First Name</h3>
        <input type="text" name="Fname" placeholder="e.g. John" />
        <h3 className="lblBig">Last Name</h3>
        <input type="text" name="Lname" placeholder="e.g. Smith" />
        <h3 className="lblBig">Verification Email</h3>
        <input type="text" name="email" placeholder="e.g. you@example.com" />

        <h3 className="lblBig">
          What is the name you want to appear in the Amazon or Google store?
        </h3>
        <input
          type="text"
          name="skillName"
          placeholder="e.g. Apple Color Finder"
        />
        <h6 className="lblSmall">MetaVoice Application Name</h6>
        <h3 className="lblBig">
          What do you want people to say to invoke or start your MetaVoice
          application?
        </h3>
        <input
          type="text"
          name="invokeSkill"
          placeholder="e.g. Apple Color Finder"
        />
        <h6 className="lblSmall">Invocation Name</h6>
        <h3 className="lblBig">
          What should people ask or say to your voice application?
        </h3>
        <input
          type="text"
          name="utterances"
          placeholder="e.g. What color are apples?"
        />
        <input
          type="text"
          name="utterances"
          placeholder="e.g. Apples are what color?"
        />
        <input type="text" name="utterances" placeholder="e.g. Apple colors" />
        <input
          type="text"
          name="utterances"
          placeholder="e.g. Are apples red?"
        />
        <input
          type="text"
          name="utterances"
          placeholder="e.g. Are apples green?"
        />
        <h6 className="lblSmall">Utterances</h6>
        <h3 className="lblBig">What will your voice application say back?</h3>
        <input
          type="text"
          name="responses"
          placeholder="e.g. Apples are red."
        />
        <h6 className="lblSmall">Responses</h6>

        <h3 className="lblBig">
          What category will your MetaVoice application show up as on the store?
        </h3>
        <select>
          <option value="business">Business and Finance</option>
          <option value="car">Connected Car</option>
          <option value="education">Education and Refference</option>
          <option value="food">Food and Drink</option>
          <option value="games">Games, Trivia, and Accessories</option>
          <option value="health">Health and Fitness</option>
          <option value="kids">Kids</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="local">Local</option>
          <option value="movies">Movies and TV</option>
          <option value="music">Music and Audio</option>
          <option value="news">News</option>
          <option value="novelty">Novelty and Humor</option>
          <option value="productivity">Productivity</option>
          <option value="shopping">Shopping</option>
          <option value="smart">Smart Home</option>
          <option value="social">Social</option>
          <option value="sports">Sports</option>
          <option value="TnT">Traven and Transportation</option>
          <option value="utilities">Utilities</option>
        </select>
        <h3 className="lblBig">
          Enter descriptions of your MetaVoice application
        </h3>
        <input
          type="text"
          name="skillDescShort"
          placeholder="e.g. Enter a short description of your skill, the one liner"
        />
        <input
          type="text"
          name="skillDescLong"
          placeholder="e.g. Enter the full description of your skill"
        />
        <h3 className="lblBig">
          What keywords do you want your MetaVoice application to have?
        </h3>
        <input
          type="text"
          name="skillKeys"
          placeholder="e.g. Enter keywords for your skill separated by commas"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
);

export default CreateSkill;
