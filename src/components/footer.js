import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => (
  <footer>   
    <div className = "footerCol text-left leftCol">
      <span>MORE BLUE MARBLE</span>
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
    <div className = "footerCol text-center">
      <span>CONTACT US</span>
      <p>info@bluemarble.com</p>
      <p>(123) 456-7890</p>
    </div>
    <div className = "footerCol text-right rightCol">
      <span>SOCIAL MEDIA</span>
      <p>insert social media icons here</p>
    </div> 
  </footer>
);

export default Footer;
