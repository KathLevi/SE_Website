import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import Demo from "./demo";
import Profile from "./profile";
import Team from "./team";
import Contact from "./contact";
import SignIn from "./signIn";
import ViewSkills from "./viewSkills";
import CreateSkill from "./createSkill";
import SimpleInteraction from "./simpleInteraction";
import FlashBriefing from "./flashBriefing";
import Register from "./register";
import Context from "../context";

const Main = () => (
  <Context.Consumer>
    {state => (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/demo" component={Demo} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/team" component={Team} />
        <Route exact path="/contact" component={Contact} />

        <Route
          exact
          path="/signin"
          render={props => <SignIn {...state} {...props} />}
        />

        <Route
          exact
          path="/view-skills"
          render={props => <ViewSkills {...state} {...props} />}
        />

        <Route exact path="/create-skill" component={CreateSkill} />
        <Route
          exact
          path="/create-skill/simple-interaction"
          component={SimpleInteraction}
        />
        <Route
          exact
          path="/create-skill/flash-briefing"
          component={FlashBriefing}
        />
        <Route exact path="/register" component={Register} />
      </Switch>
    )}
  </Context.Consumer>
);

export default Main;
