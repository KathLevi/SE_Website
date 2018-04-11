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
    <Route
      exact
      path="/createSkill/simpleInteraction"
      component={SimpleInteraction}
    />
    <Route exact path="/createSkill/flashBriefing" component={FlashBriefing} />
    <Route exact path="/register" component={Register} />
  </Switch>
);

export default Main;
