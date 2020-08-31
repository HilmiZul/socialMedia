import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// MUI stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import classes from "./profile.module.css";

//redux
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    let paper;

    if (this.props.fetchedData) {
      const {
        handle,
        createdAt,
        imageUrl,
      } = this.props.fetchedData.credentials;
      paper = (
        <Paper className={classes.Paper}>
          <div className={classes.Profile}>
            <div className={classes.ImageWrapper}>
              <img src={imageUrl} alt="profile" className={classes.Image} />
            </div>
          </div>
        </Paper>
      );
    } else {
      paper = (
        <Paper className={classes.Paper}>
          <Typography variant="body2" align="center">
            No profile found, please login again
          </Typography>
          <div className={classes.Buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Paper>
      );
    }

    return <div>{paper}</div>;
  }
}
//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  fetchedData: state.user.fetchedData,
});

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps)(Profile);
