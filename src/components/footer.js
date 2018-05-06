import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => (
  <footer>
    <div className="footerCol text-center leftCol">
      <div className="fmenuLabel">
        <span>MORE BLUE MARBLE</span>
      </div>
      <p className="fmenuListElement">
        <NavLink exact activeClassName="footer_current" to="/team">
          Meet Our Team
        </NavLink>
      </p>
      <p className="fmenuListElement">
        <NavLink exact activeClassName="footer_current" to="/contact">
          Contact Us
        </NavLink>
      </p>
    </div>
    <div className="footerCol text-center">
      <div className="fmenuLabel">
        <span>CONTACT US</span>
      </div>
      <p>
        <a
          href="mailto:info@bluemarble.com?Subject=Hello%20again"
          target="_top"
        >
          info@bluemarble.com
        </a>
      </p>
      <p>(123) 456-7890</p>
    </div>
    <div className="footerCol text-center rightCol">
      <div className="fmenuLabel">
        <span>SOCIAL MEDIA</span>
      </div>
      <p>insert social media icons here</p>
    </div>
  </footer>
);

export default Footer;
