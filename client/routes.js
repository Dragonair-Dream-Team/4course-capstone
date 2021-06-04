import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Login, Signup } from "./components/AuthForm";
import Emails from "./components/Emails";
import Invite from "./components/Invite";
import Home from "./components/home";
import Map from "./components/Map";
import BeginSearch from "./components/BeginSearch";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme.js";
import {
  withRouter,
  Redirect,
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import Datetime from "./components/Datetime";
import { me } from "./store";
import Wheel from "./components/Wheel";
import UpcomingEvents from "./components/UpcomingEvents";
import PastEvents from "./components/PastEvents";
import SingleEvent from "./components/SingleEvent";
import ThankYou from "./components/ThankYou";

class Routes extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <ThemeProvider theme={theme}>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/yelp" component={Map} />
            <Route path="/emails" component={Emails} />
            <Route path="/invite" component={Invite} />
            <Route exact path="/startchallenge" component={BeginSearch} />
            <Route path="/datetime" component={Datetime} />
            <Route exact path="/upcomingevents" component={UpcomingEvents} />
            <Route exact path="/pastevents" component={PastEvents} />
            <Route path="/wheel" component={Wheel} />
            <Route exact path="/events/:eventId" component={SingleEvent} />
            <Route exact path="/thankyou" component={ThankYou} />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </ThemeProvider>
    );
  }
}
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
