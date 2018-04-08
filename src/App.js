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
    <h1 class="pageHeader">Profile</h1>
  </div>
);

const Team = () => (
  <div>
    <h1 class="pageHeader">
      Meet our <span>Team</span>
    </h1>
    <h3 class="pageSubheader">
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
  <div class="signInBox">
    <form class="form-signin">
      <h2 class="form-signin-heading">Sign in</h2>
      <h5 class="lbl">Email</h5>
      <input
        type="text"
        class="form-control"
        name="username"
        required=""
        autofocus=""
      />
      <h5 class="lbl">
        Password <a href="#!forgotPass">Forgot Password</a>
      </h5>

      <input type="password" class="form-control" name="password" required="" />
      <button class="btn btn-lg btn-block mainBtn" type="submit">
        Sign in
      </button>

      <h5>
        By signing in you are agreeing to our{" "}
        <a href="#!TnC">Terms and Conditions</a>
      </h5>

      <hr />
      <a class="btn btn-lg btn-block newCustBtn" href="#!register">
        I am new to bluemarble
      </a>
    </form>
  </div>
);

const ViewSkills = () => (
  <div>
    <h1 class="pageHeader">View Skills</h1>
  </div>
);

const CreateSkill = () => (
  <div>
    <h1 class="pageHeader">Create Skill</h1>
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
