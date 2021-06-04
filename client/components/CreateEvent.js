import React from "react";
import moment from "moment";
import { InputMoment } from "react-input-moment";

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moments: moment(),
      disabled: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleChange(m) {
    this.setState({ moments: m });
  }
  handleSave() {
    this.state.moments.format("llll");
  }

  render() {
    return (
      <div className="date-time-container">
        <div className="header-pick-time">Pick a Day and Time!</div>
        <input type="text" value={this.state.moments.format("llll")} readOnly />
        <div className="wrapper" style={{ width: 400, height: 300 }}>
          <form>
            <InputMoment
              moment={this.state.moments}
              onChange={(m) => this.handleChange(m)}
              minStep={5}
              onSave={this.handleSave}
              locale="en"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default CreateEvent;
