import React from "react";
import { PageHeader } from "react-bootstrap";

const Contact = () => (
  <div className="container page-container">
    <PageHeader>Contact Us</PageHeader>
    <div className="contact-section">
      <form>
        <div className="col-md-6">
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
          <div className="text-right">
            <button type="button" className="btn btn-md submit emptyBtn">
              Send Message
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default Contact;
