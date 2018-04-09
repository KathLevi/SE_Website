import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => (
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

export default Navigation;
