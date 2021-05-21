import React from "react";
import { connect } from "react-redux";
import { setEmailsThunk } from "../store/emails";
import { Link } from "react-router-dom";
import Anime2 from "./Anime2.js";

class Emails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email1: "",
      email2: "",
      email3: "",
      email4: "",
      message: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleEmails(e, this.props.eventId);
    this.props.history.push("/wheel")
  }

  render() {
    return (
      <div className="center shape">
        <form onSubmit={this.handleSubmit}>
          <h2 className="font">Add Friends</h2>
          <label>
            Email1:
            <input
              className="email"
              type="text"
              value={this.props.myEmail}
              name="email1"
              onChange={this.handleChange}
              readOnly
            />
          </label>
          <label>
            Email2:
            <input
              className="email"
              type="text"
              value={this.state.email2}
              name="email2"
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Email3:
            <input
              className="email"
              type="text"
              value={this.state.email3}
              name="email3"
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Email4:
            <input
              className="email"
              type="text"
              value={this.state.email4}
              name="email4"
              onChange={this.handleChange}
              required
            />
          </label>
          <p>{this.state.message}</p>
          <div style={{ padding: "5px" }}>
            <input className="button normal" type="submit" value="Submit" />
          </div>
        </form>
        <div>
          <Anime2 />
        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    eventId: state.events.event.id,
    myEmail: state.auth.email
  };
};
const mapDispatch = (dispatch) => {
  return {
    handleEmails(e, id) {
      const email1 = e.target.email1.value;
      const email2 = e.target.email2.value;
      const email3 = e.target.email3.value;
      const email4 = e.target.email4.value;
      let emails = [email1, email2, email3, email4];
      dispatch(setEmailsThunk(emails, id));
    },
  };
};

export default connect(mapState, mapDispatch)(Emails);
