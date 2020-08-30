import React, { Component } from "react";
import classes from "./login.module.css";
import ImageIcon from "../images/icon.png";
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
    if (this.validHandler(event.target.value)) {
      const name = event.target.name;
      const error = { ...this.state.error };
      error[name] = "must not be empty";
      this.setState({ error });
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  validHandler = (value) => {
    return value.trim() === "";
  };
  render() {
    const { errors, error } = this.state;

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
            <button type="submit" className={classes.Button}>
              Login
            </button>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

export default Login;
