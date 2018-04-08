import React from "react";
import "./App.css";
import { NavLink, Switch, Route } from "react-router-dom";
import logo from "./assets/logo.png";

const App = () => (
  <div className="app">
    <Navigation />
    <Main />
    <Footer />
  </div>
);

const Navigation = () => (
  /*<nav>
    <ul>
      <li><NavLink exact activeClassName="current" to='/'>Home</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/about'>About</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/contact'>Contact</NavLink></li>
    </ul>
  </nav>*/
  <nav className="menu">
    <ul className="menuList text-right">
      <li className="menuListElement">
        <NavLink exact activeClassName="current" to="/">
          HOME
        </NavLink>
      </li>
      <li className="menuListElement">
        <NavLink exact activeClassName="current" to="/demo">
          DEMO
        </NavLink>
      </li>
      <li className="menuListElement dropdwn">
        <NavLink
          exact
          className="dropbtn text-center"
          activeClassName="current"
          to="/profile"
        >
          MY PROFILE
        </NavLink>
        <div className="dropdown-content text-left">
          <NavLink exact activeClassName="current" to="/viewSkills">
            VIEW MY SKILLS
          </NavLink>
          <NavLink exact activeClassName="current" to="/createSkill">
            CREATE NEW SKILL
          </NavLink>
        </div>
      </li>
      <li className="menuListElement">
        <NavLink exact activeClassName="current" to="/team">
          OUR TEAM
        </NavLink>
      </li>
      <li className="menuListElement">
        <NavLink exact activeClassName="current" to="/contact">
          CONTACT US
        </NavLink>
      </li>
      <li className="menuListElement">
        <NavLink exact activeClassName="current" to="/signin">
          SIGN IN
        </NavLink>
      </li>
    </ul>
  </nav>
);

const Footer = () => (
  <footer>
    <div className="text-center">@2018 - Blue Marble. All rights reserved.</div>
  </footer>
);

const Home = () => (
  <div className="logo">
    <img src={logo} />
  </div>
);

const Demo = () => (
  <div>
    <h1 className="pageHeader">Demo</h1>

    <div className="demoVid" align="center">
      <video width="800" height="500" controls poster={logo}>
        <source src="img/placeholder.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
);

const Profile = () => (
  <div>
    <h1 className="pageHeader">Profile</h1>
  </div>
);

const Team = () => (
  <div>
    <h1 className="pageHeader">
      Meet our <span>Team</span>
    </h1>
    <h3 className="pageSubheader">
      Click an image to learn more about one of our team members
    </h3>
    <div align="center" />
  </div>
);

const Contact = () => (
  <div id="contact">
    <div className="section-content">
      <h1 className="section-header">
        Get in{" "}
        <span
          className="content-header"
          data-wow-delay="0.2s"
          data-wow-duration="2s"
        >
          {" "}
          Touch with us
        </span>
      </h1>
      <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
    </div>
    <div className="contact-section">
      <div className="container">
        <form>
          <div className="col-md-6 form-line">
            <div className="form-group">
              <label>Your name</label>
              <input type="text" className="form-control" id="" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label> Message</label>
              <textarea className="form-control" id="description" rows="5" />
            </div>
            <div>
              <button type="button" className="btn btn-md submit mainBtn">
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
);

const SignIn = () => (
  <div className="signInBox">
    <form className="form-signin">
      <h2 className="form-signin-heading">Sign in</h2>
      <h5 className="lbl">Email</h5>
      <input
        type="text"
        className="form-control"
        name="username"
        required=""
        autofocus=""
      />
      <h5 className="lbl">
        Password <a href="#!forgotPass">Forgot Password</a>
      </h5>

      <input
        type="password"
        className="form-control"
        name="password"
        required=""
      />
      <button className="btn btn-lg btn-block mainBtn" type="submit">
        Sign in
      </button>

      <h5>
        By signing in you are agreeing to our{" "}
        <a href="#!TnC">Terms and Conditions</a>
      </h5>

      <hr />
      <a className="btn btn-lg btn-block newCustBtn" href="#!register">
        I am new to bluemarble
      </a>
    </form>
  </div>
);

const ViewSkills = () => (
  <div>
    <h1 className="pageHeader">View Skills</h1>
  </div>
);

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

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/demo" component={Demo} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/team" component={Team} />
    <Route exact path="/contact" component={Contact} />
    <Route exact path="/signin" component={SignIn} />
    <Route exact path="/viewSkills" component={ViewSkills} />
    <Route exact path="/createSkill" component={CreateSkill} />
  </Switch>
);

export default App;
