import React from "react";
import { request } from "../helpers/requests.js";
import ResponseModal from "./modules/responseModal";
import FlashBriefing from "./flashBriefing";
import SimpleInteraction from "./simpleInteraction";

class CreateSkillForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { templateType: props.match.params.templateType };
  }

  updateStateFromChild = state => {
    this.setState({ ...state });
  };

  getForm() {
    if (this.state.templateType === "simple-interaction") {
      return <SimpleInteraction {...this.props} />;
    } else if (this.state.templateType === "flash-briefing") {
      return <FlashBriefing {...this.props} />;
    }
  }

  render() {
    return <div>{this.getForm()}</div>;
  }
}

export default CreateSkillForm;
