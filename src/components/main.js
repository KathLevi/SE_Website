import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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
import EditSkill from "./editSkill";
import ViewSkill from "./viewSkill";
import CreateSkillForm from "./createSkillForm";
import Context from "../context";

const Main = () => {
  let loggedIn = localStorage.getItem("userId");

  return (
    <Context.Consumer>
      {state => (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/demo" component={Demo} />
          <Route
            exact
            path="/profile"
            render={props =>
              !loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Profile {...state} {...props} />
              )
            }
          />
          <Route
            exact
            path="/edit-skill/:skillId"
            render={props =>
              !loggedIn ? (
                <Redirect to="/" />
              ) : (
                <EditSkill {...state} {...props} />
              )
            }
          />
          <Route exact path="/team" component={Team} />
          <Route exact path="/contact" component={Contact} />

          <Route
            exact
            path="/signin"
            render={props =>
              loggedIn ? <Redirect to="/" /> : <SignIn {...state} {...props} />
            }
          />

          <Route
            exact
            path="/view-skills"
            render={props =>
              !loggedIn ? (
                <Redirect to="/" />
              ) : (
                <ViewSkills {...state} {...props} />
              )
            }
          />

          <Route
            exact
            path="/view-skill/:skillId"
            render={props =>
              !loggedIn ? (
                <Redirect to="/" />
              ) : (
                <ViewSkill {...state} {...props} />
              )
            }
          />

          <Route
            exact
            path="/create-skill"
            render={props =>
              !loggedIn ? (
                <Redirect to="/" />
              ) : (
                <CreateSkill {...state} {...props} />
              )
            }
          />

          <Route
            exact
            path="/create-skill/:templateType"
            render={props =>
              !loggedIn ? (
                <Redirect to="/" />
              ) : (
                <CreateSkillForm {...state} {...props} />
              )
            }
          />

          <Route
            exact
            path="/register"
            render={props =>
              loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Register {...state} {...props} />
              )
            }
          />
        </Switch>
      )}
    </Context.Consumer>
  );
};

export default Main;
