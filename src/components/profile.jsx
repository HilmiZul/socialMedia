import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MyButton from "../util/myButton";
import dayjs from "dayjs";

// MUI stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import classes from "./profile.module.css";
import MuiLink from "@material-ui/core/Link";

// Icons

import EmailIcon from "@material-ui/icons/Email";
import EditIcon from "@material-ui/icons/Edit";
import CalendarToday from "@material-ui/icons/CalendarToday";

//redux
import { connect } from "react-redux";
import { apiImageBegan } from "../store/types";

class Profile extends Component {
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };

  render() {
    let paper;

    if (this.props.fetchedData) {
      const {
        email,
        handle,
        createdAt,
        imageUrl,
      } = this.props.fetchedData.credentials;
      paper = (
        <Paper className={classes.Paper}>
          <div className={classes.Profile}>
            <div className={classes.ImageWrapper}>
              <img src={imageUrl} alt="profile" className={classes.Image} />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <MyButton
                tip="Edit profile picture"
                onClick={this.handleEditPicture}
                btnClassName="button"
              >
                <EditIcon color="primary" />
              </MyButton>
            </div>
          </div>
          <hr />
          <div className="profile-details">
            <span style={{ display: "block" }}>
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h6"
              >
                @{handle}
              </MuiLink>
            </span>
            <hr />
            <span>
              {email && (
                <Fragment>
                  <EmailIcon color="primary" /> <span>{email}</span>
                  <hr />
                </Fragment>
              )}
            </span>
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
        </Paper>
      );
    } else {
      if (this.props.loading) {
        paper = <p>Loading...</p>;
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
    }

    return <div>{paper}</div>;
  }
}
//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  fetchedData: state.user.fetchedData,
  loading: state.user.fetch_loading,
});

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    uploadImage: (image) => dispatch(apiImageBegan({ image })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps, mapActionsToProps)(Profile);
