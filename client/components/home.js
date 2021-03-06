import React from "react";
import { connect } from "react-redux";
import Datetime from "./Datetime";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  headers: {
    fontFamily: "Permanent Marker",
    color: "#DC143C",
    marginTop: 25,
  },
  upcomingTitle: {
    fontFamily: "Permanent Marker",
    color: "#DC143C",
  },
  pastTitle: {
    fontFamily: "Permanent Marker",
    color: "#DC143C",
  },
  newChallengeButton: {
    ...theme.typography.button,
    fontFamily: "Permanent Marker",
    color: "#fff100",
    marginTop: "1em",
    "&:hover": {
      color: "#DC143C",
      backgroundColor: "fff100",
    },
    fontSize: 30,
    borderRadius: 20,
  },
}));

export const Home = (props) => {
  const classes = useStyles();
  console.log("what are my props at home ", props);
  const { username } = props;

  return (
    <div>
      <Typography className={classes.headers} variant="h4" style={{marginTop: 30, marginLeft: 30}}>
        Welcome, {username}
      </Typography>
      <div className="shape">
        <div className="center">
          <form onSubmit={() => props.history.push(`/datetime`)}>
            <Button
              className={classes.newChallengeButton}
              type="submit"
              size="medium"
              color="secondary"
              variant="contained"
            >
              Start New Challenge
            </Button>
          </form>
          <div className="row">
            <div className="column">
              <Typography variant="h5" className={classes.upcomingTitle} style={{marginTop: 30, marginBottom: 15}}>
                <Link to="/upcomingevents" >Upcoming Events</Link>
              </Typography>
            </div>
            <div className="column">
              <Typography variant="h5" className={classes.pastTitle} style={{marginTop: 30, marginBottom: 15}}>
                <Link to="/pastevents">Past Events</Link>
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
