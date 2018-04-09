import React from "react";

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

export default Contact;
