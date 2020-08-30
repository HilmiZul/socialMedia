import React, { Component } from "react";
import classes from "./login.module.css";
import ImageIcon from "../images/icon.png";
import { Link } from "react-router-dom";
// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: "",
    disabled: false,
    loading: false,
    error: {
      email: "",
      password: "",
    },
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("/login", userData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("IdToken", `Bearer ${res.data.token}`);
        this.setState({ loading: false });
        this.props.history.push("/home");
      })
      .catch((err) => {
        this.setState({ errors: "invalid credentials" });
        this.setState({ loading: false });
        console.log(err);
      });

    console.log("submit");
  };

  handleChange = (event) => {
    const message = this.validHandler(event.target.value, event.target.name);
    const name = event.target.name;
    const error = { ...this.state.error };
    error[name] = message;
    if (!message) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }

    this.setState({ error });
    this.setState({ [event.target.name]: event.target.value });
  };

  validHandler = (value, name) => {
    if (name === "password") {
      return value.length >= 6 ? "" : "password should be longer than 6";
    } else if (name === "email") {
      return value.trim() === "" ? "must not be empty" : "";
    }
  };
  render() {
    const { errors, error, loading, disabled } = this.state;

    return (
      <Grid container className={classes.Form}>
        <Grid item sm />
        <Grid item sm>
          <img src={ImageIcon} alt="bulbasaur" className={classes.Image} />
          <Typography variant="h2" className={classes.PageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              helperText={error.email}
              error={error.email ? true : false}
              className={classes.TextField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              helperText={error.password}
              error={error.password ? true : false}
              className={classes.TextField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors && (
              <Typography variant="body2" className={classes.CustomError}>
                {errors}
              </Typography>
            )}
            <button
              type="submit"
              className={classes.Button}
              disabled={disabled}
            >
              Login
              {loading && (
                <CircularProgress size={10} className={classes.Progress} />
              )}
            </button>
          </form>
          <small>
            dont have an account ? sign up <Link to="/signup">here</Link>
          </small>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

export default Login;
